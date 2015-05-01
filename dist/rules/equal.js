(function() {
  VanillaFormValidator.addRule('equal', function(value, opts) {
    var element, form, val;
    form = opts['form'];
    element = form.elements[opts['field']];
    val = element.value;
    return value === val;
  });

}).call(this);
