# Regexp validator
#
# Test regular expression

VanillaFormValidator.addRule 'regexp', (value, opts) ->

  re = opts['regexp']

  re.test(value)
