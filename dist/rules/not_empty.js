(function() {
  VanillaFormValidator.addRule('not_empty', function(value, opts) {
    return value.trim().length > 0;
  });

}).call(this);
