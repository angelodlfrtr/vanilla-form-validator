(function() {
  VanillaFormValidator.addRule('number', function(value, opts) {
    if (value === '') {
      return true;
    }
    if ((value - parseFloat(value) + 1) >= 0) {
      value = parseFloat(value);
      if (opts['max'] && opts['min']) {
        if (value <= opts['max'] && value >= opts['min']) {
          return true;
        } else {
          return false;
        }
      }
      if (opts['max']) {
        if (value <= opts['max']) {
          return true;
        }
      }
      if (opts['min']) {
        if (value >= opts['min']) {
          return true;
        }
      }
    } else {
      return false;
    }
  });

}).call(this);
