(function() {
  VanillaFormValidator.addRule('email', function(value, opts) {
    var re;
    if (value === '') {
      return true;
    }
    re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(value);
  });

}).call(this);
