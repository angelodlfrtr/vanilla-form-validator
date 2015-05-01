(function() {
  VanillaFormValidator.addRule('file', function(value, opts) {
    var element, ext, file, t;
    element = opts['element'];
    if (element.files.length < 1) {
      return false;
    }
    file = element.files[0];
    if (opts['exts']) {
      if (file.name.split('.') < 1) {
        return false;
      }
      t = file.name.split('.');
      ext = t[t.length - 1];
      if (!(opts['exts'].indexOf(ext) > -1)) {
        return false;
      }
    }
    return true;
  });

}).call(this);
