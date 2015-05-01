# Equal validator
#
# Validate equality

VanillaFormValidator.addRule 'equal', (value, opts) ->

  form = opts['form']

  element = form.elements[opts['field']]
  val     = element.value

  value is val
