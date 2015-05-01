# Number validator
#
# Verify the numericability of string

VanillaFormValidator.addRule 'number', (value, opts) ->

  value - parseFloat(value) + 1 >= 0
