# Remote validator
#
# Validate value via ajax request
#
# Ajax response must be : { valid: true } or { valid: false } in JSON format

VanillaFormValidator.addRule 'remote', (value, opts) ->

  return true if value is ''

  xhr        = new XMLHttpRequest()
  url        = opts['url'] or '/'
  type       = opts['type'] or 'GET'
  async      = false
  field_name = opts['name'] or opts['element'].name
  xhr_args   = null

  params = {}
  params[field_name] = value

  if opts['params']
    for k, v of opts['params']
      params[k] = v

  paramsToStr = (params) ->

    str = []

    for k, v of params
      str.push "#{encodeURIComponent(k)}=#{encodeURIComponent(v)}"

    str.join('&')

  if type is 'GET'

    c   = "?#{paramsToStr(params)}"
    url += c

  else

    xhr_args = "#{paramsToStr(params)}"

  xhr.open(type, url, async)
  xhr.send(xhr_args)

  if xhr.status is 200
    json = JSON.parse(xhr.responseText)
    json['valid']
  else
    false
