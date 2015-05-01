# Not Empty validator
#
# Check the presence of value in field

VanillaFormValidator.addRule 'not_empty', (value, opts) ->

  value.trim().length > 0
