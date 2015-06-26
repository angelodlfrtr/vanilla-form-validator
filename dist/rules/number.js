(function() {
  VanillaFormValidator.addRule('number', function(value, opts) {
    if (value === '') {
      return true;
    }
    return value - parseFloat(value) + 1 >= 0;
  });

}).call(this);
