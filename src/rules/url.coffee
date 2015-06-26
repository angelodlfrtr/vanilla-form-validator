# URL validator
#
# Validate url

VanillaFormValidator.addRule 'url', (value, opts) ->

  return true if value is ''

  re = new RegExp('^(https?:\\/\\/)?' +
                  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
                  '((\\d{1,3}\\.){3}\\d{1,3}))' +
                  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
                  '(\\?[;&a-z\\d%_.~+=-]*)?' +
                  '(\\#[-a-z\\d_]*)?$', 'i')

  re.test(value)
