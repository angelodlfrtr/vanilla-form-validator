"use strict";

describe("Email rule", function(){

  var validator;

  beforeEach(function(){

    var form_datas = [
      { type: 'text', name: "email" },
    ];

    var fields = {
      'email': {
        validators: {
          email: {
            message: 'Invalid email'
          }
        }
      }
    }

    validator = spec_helpers.construct_form(form_datas, fields);
  });


  it('should have valid email', function(){

    validator.getDomField('email').value = 'john.do@lala.com';

    expect(validator.valid()).toBe(true);
  });

  it('should have invalid email', function(){

    validator.getDomField('email').value = 'john.dolala.com';

    expect(validator.valid()).toBe(false);
  });
});
