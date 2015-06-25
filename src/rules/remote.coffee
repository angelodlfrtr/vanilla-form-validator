# Remote validator
#
# Validate value via ajax request
#
# Ajax response must be : { valid: true } or { valid: false } in JSON format

VanillaFormValidator.addRule 'remote', (value, opts) ->

  xhr        = new XMLHttpRequest()
  url        = opts['url'] or '/'
  type       = opts['type'] or 'GET'
  async      = false
  field_name = opts['name'] or opts['element'].name
  xhr_args   = null

  if type is 'GET'

    c   = "?#{encodeURIComponent(field_name)}=#{encodeURIComponent(value)}"
    url += c

  else

    xhr_args = "?#{encodeURIComponent(field_name)}=#{encodeURIComponent(value)}"

  xhr.open(type, url, async)
  xhr.send(xhr_args)

  if xhr.status is 200
    json = JSON.parse(xhr.responseText)
    json['valid']
  else
    false
