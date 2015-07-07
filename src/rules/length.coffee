# Length validator
#
# Validate value length

VanillaFormValidator.addRule 'length', (value, opts) ->

  # Return true if value is empty
  return true if value is ''

  # Exact length
  return value.length is opts['length'] if opts['length']

  # Max and min
  if opts['min'] && opts['max']
    return value.length >= opts['min'] and value.length <= opts['max']

  # Min
  return value.length >= opts['min'] if opts['min']

  # Max
  return value.length <= opts['max'] if opts['max']
