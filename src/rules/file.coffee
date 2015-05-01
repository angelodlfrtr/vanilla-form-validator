# File validator
#
# Test validity of file

VanillaFormValidator.addRule 'file', (value, opts) ->

  element = opts['element']

  return false if element.files.length < 1

  file = element.files[0]

  if opts['exts']

    return false if file.name.split('.') < 1

    t   = file.name.split('.')
    ext = t[t.length - 1]

    return false unless opts['exts'].indexOf(ext) > -1

  true
