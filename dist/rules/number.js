(function() {
  VanillaFormValidator.addRule('number', function(value, opts) {
    return value - parseFloat(value) + 1 >= 0;
  });

}).call(this);
