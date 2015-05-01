"use strict";

var spec_helpers = {

  construct_form: function(dom_fields, fields){

    var form = document.createElement('form');

    for (var i = 0, l = dom_fields.length; i < l; i ++) {
      var input = dom_fields[i];
      var e     = document.createElement('input');

      e.type = input.type;
      e.name = input.name;

      if(input.value){
        e.value = input.value;
      }

      form.appendChild(e);
    }

    var validator = new VanillaFormValidator(form);

    validator.addFields(fields);

    return validator;
  }

}
