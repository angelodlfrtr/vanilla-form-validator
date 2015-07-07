# Number validator
#
# Verify the number valuue of field

VanillaFormValidator.addRule 'number', (value, opts) ->

  return true if value is ''

  if (value - parseFloat(value) + 1) >= 0

    value = parseFloat(value)

    if opts['max'] && opts['min']

      if value <= opts['max'] && value >= opts['min']
        return true
      else
        return false

    if opts['max']
      if value <= opts['max']
        return true

    if opts['min']
      if value >= opts['min']
        return true

  else
    false
