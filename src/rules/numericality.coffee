# Numericality validator
#
# Verify the numericability of string

VanillaFormValidator.addRule 'numericality', (value, opts) ->

  return true if value is ''

  value - parseFloat(value) + 1 >= 0
