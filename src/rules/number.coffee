# Number validator
#
# Verify the numericability of string

VanillaFormValidator.addRule 'number', (value, opts) ->

  return true if value is ''

  value - parseFloat(value) + 1 >= 0
