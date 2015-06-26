(function() {
  VanillaFormValidator.addRule('regexp', function(value, opts) {
    var re;
    if (value === '') {
      return true;
    }
    re = opts['regexp'];
    return re.test(value);
  });

}).call(this);
