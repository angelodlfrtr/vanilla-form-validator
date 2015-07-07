"use strict";

describe("Numericality rule", function(){

  var validator;

  beforeEach(function(){

    var form_datas = [
      { type: 'text', name: "lala" }
    ];

    var fields = {
      'lala': {
        validators: {
          numericality: {
            message: 'Invalid'
          }
        }
      }
    }

    validator = spec_helpers.construct_form(form_datas, fields);
  });

  it('Should have valid number', function(){

    var element   = validator.getDomField('lala');
    element.value = '0899';

    expect(validator.valid()).toBe(true);
  });

  it('Should have invalid number', function(){

    var element   = validator.getDomField('lala');
    element.value = 'h499';

    expect(validator.valid()).toBe(false);
  });

});
