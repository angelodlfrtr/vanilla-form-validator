# Email validator
#
# Validate email

VanillaFormValidator.addRule 'email', (value, opts) ->

  re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

  re.test(value)
