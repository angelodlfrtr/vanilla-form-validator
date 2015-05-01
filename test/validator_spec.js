"use strict";

describe("Vanilla Form Validator Spec", function(){

  var validator;

  // Create validator
  beforeEach(function(){

    var form_datas = [
      { type: 'text', name: "email" }
    ];

    var form = document.createElement('form');

    for (var i = 0, l = form_datas.length; i < l; i ++) {
      var input = form_datas[i];
      var e     = document.createElement('input');

      e.type = input.type;
      e.name = input.name;

      form.appendChild(e);
    }

    validator = new VanillaFormValidator(form);

    validator.addField('email', {
      validators: {
        not_empty: {
          message: "This field cannot be empty"
        },
        length: {
          message: "length is not valid, hijo de tu madre",
          max: 10,
          min: 1
        }
      }
    });
  });

  it('Must be a function', function(){

    var t = typeof(VanillaFormValidator);

    expect(t).toEqual('function');

  });

  it('Should be instancied', function(){

    expect(typeof(validator)).toEqual('object');

  });

  it('must have field', function(){

    expect(validator.fields['email']).not.toBe(undefined);

  });

  it('can remove field', function(){

    validator.removeField('email');

    expect(validator.fields['email']).toBe(undefined);

  });

  it('field must have validator(s)', function(){

    var e = validator.fields['email'];

    expect(Object.keys(e['validators']).length).toBeGreaterThan(0);

  });

  it('Must have rules', function(){

    expect(Object.keys(VanillaFormValidator.rules).length).toBeGreaterThan(0);

  });
});
