class @VanillaFormValidator

  # Rgexp for transform input names to valid html ids attr value
  ID_REGEXP = /(\[|\]|\(|\))/g

  # Object for store rules
  @rules    = {}

  # Construct new validator
  #
  # @param [Element] form_element the form dom element
  # @param [Object] opts Options for validator
  constructor: (form_element, opts = {}) ->

    @form   = form_element
    @opts   = @defaultOpts(opts)
    @fields = {}

  # Permit to add field to validator
  #
  # @param [String] field_name The field name html attr
  # @param [Object] opts Options for field, contain rules
  #
  # @return void
  addField: (field_name, opts) ->

    @fields[field_name] = opts

    return

  # Permit to add multiple fields
  #
  # @param [Object] fields Hash containing fields
  #
  # @return void
  addFields: (fields) ->

    @addField(n, v) for n, v of fields

    return

  # Permit to remove field from validator
  #
  # @param [String] field_name The field name
  #
  # @return void
  removeField: (field_name) ->

    delete @fields[field_name]

    return

  # Permit to reset values, events and error messages on validator
  #
  # @return [Element] The new form element
  reset: ->

    self = @

    @clearErrorMessages()

    # Clone form => remove listeners
    f = @form.cloneNode(true)

    @form.parentNode.replaceChild(f, @form)

    @form = f

  # Permit to start lisening on events on form, and validate form in real time
  #
  # @param [Object] opts Options to start live listening
  #
  # @return void
  initLive: (opts = {}) ->

    opts['submit_btn']  = opts['submit_btn'] or false
    opts['direct_live'] = opts['direct_live'] or false

    self                = @
    submitted           = if opts['direct_live'] then true else false

    validate = ->
      response = self.valid()
      self.validate() unless response
      response

    if opts['submit_btn']

      submit_btn.addEventListener 'click', (event) ->

        submitted = true

        event.preventDefault() unless validate()

    else

      @form.addEventListener 'submit', (event) ->

        submitted = true

        event.preventDefault() unless validate()

    inputs = @form.querySelectorAll('input, textarea')

    for event_type in ['change', 'keyup', 'focus']
      for input in inputs
        input.addEventListener event_type, (event) ->
          self.validate() if submitted

    return

  # Permit to get validity of form
  #
  # @return [Boolean] Return true if all rules passes, else false
  valid: ->

    self = @
    r    = true

    for field_name, field_opts of @fields

      a = @getFieldValidity(field_name)

      for validator_name, validator_response of a

        unless validator_response

          r = false

          break

    r

  # Permit to get validity of field
  #
  # @param [String] field_name The field name to test
  #
  # @return [Object] Errors or empty object
  getFieldValidity: (field_name) ->

    field      = @fields[field_name]
    element    = @getDomField(field_name)

    return false unless element

    value      = element.value
    validators = field['validators'] or {}

    response = {}

    for validator_name, validator_opts of validators

      func                      = @constructor.rules[validator_name]

      validator_opts['element'] = element
      validator_opts['form']    = @form

      response[validator_name]  = func(value, validator_opts)

    response

  # Permit to get list of errors of validator
  #
  # @return [Object] The errors list or empty object
  errors: ->

    self     = @
    response = {}

    for field_name, field_opts of @fields

      a = @getFieldValidity(field_name)

      for validator_name, validator_response of a

        unless validator_response

          unless response[field_name]

            message = field_opts['validators'][validator_name]['message'] or field_opts['message'] or false

            response[field_name] = message

    response

  # Permit to append error messages in form
  #
  # @return void
  validate: ->

    self = @

    @clearErrorMessages()

    for field_name, message of @errors()

      element = self.getDomField(field_name)

      self.appendErrorMessageOn(element, message)

    return

  # Create html dom element and append it after field
  #
  # @param [Element] element The input dom element
  # @param [String] message The message to appendZ
  #
  # @return [Element] The html tag error element
  appendErrorMessageOn: (element, message) ->

    tag  = @opts['error_html_tag']
    e    = document.createElement(tag)
    id   = "vanilla_validator_error_#{element.name}".replace(ID_REGEXP, '_')

    e.classList.add(@opts['error_html_tag_class'])

    e.id        = id
    e.innerHTML = message
    e.style[a]  = b for a, b of @opts['error_html_tag_styles']

    # @todo: maybe to remove
    element.classList.add('vanilla-validator-error')

    element.parentNode.insertBefore(e, element.nextSibling)

    return element

  # Permit to remove all errors html dom elements
  #
  # @return void
  clearErrorMessages: ->

    for e in @form.elements
      if e.name and e.type and e.type isnt 'submit'

        error_tag_id = "#vanilla_validator_error_#{e.name}".replace(ID_REGEXP, '_')
        element      = @form.querySelector(error_tag_id)

        if element

          e.classList.remove('vanilla-validator-error')

          element.parentNode.removeChild(element)

    return

  # Get dom field element
  #
  # @param [Strign] field_name the field name to get
  #
  # @return [Element] The input html dom element
  getDomField: (field_name) -> @form[field_name]

  # Permit to add new rule in all rules
  #
  # @param [String] rule_name The new rule name
  # @param [Function] rule_function The function for test value
  #
  # @return void
  @addRule: (rule_name, rule_function) ->

    @rules[rule_name] = rule_function

    return

  # Parse constructor opts
  #
  # @param [Object] opts The constructor opts
  #
  # @return [Object] The parsed options
  defaultOpts: (opts) ->

    d =
      error_html_tag: 'small'
      error_html_tag_class: ['vanilla_validator_error']
      error_html_tag_styles:
        'color': 'red'
        'font-size': '0.8em'
        'display': 'block'

    d[n] = v for n, v of opts

    d
