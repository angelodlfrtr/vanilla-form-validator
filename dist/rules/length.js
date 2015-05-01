(function() {
  VanillaFormValidator.addRule('length', function(value, opts) {
    if (opts['length']) {
      return value.length === opts['length'];
    }
    if (opts['min'] && opts['max']) {
      return value.length >= opts['min'] && value.length <= opts['max'];
    }
    if (opts['min']) {
      return value.length >= opts['min'];
    }
    if (opts['max']) {
      return value.length <= opts['max'];
    }
  });

}).call(this);
