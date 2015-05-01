(function() {
  VanillaFormValidator.addRule('regexp', function(value, opts) {
    var re;
    re = opts['regexp'];
    return re.test(value);
  });

}).call(this);
