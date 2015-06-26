# Email validator
#
# Validate email

VanillaFormValidator.addRule 'email', (value, opts) ->

  return true if value is ''

  re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

  re.test(value)
