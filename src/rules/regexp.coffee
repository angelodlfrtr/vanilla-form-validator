# Regexp validator
#
# Test regular expression

VanillaFormValidator.addRule 'regexp', (value, opts) ->

  return true if value is ''

  re = opts['regexp']

  re.test(value)
