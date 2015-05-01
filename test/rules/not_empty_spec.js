"use strict";

describe("Not empty rule", function(){

  var validator;

  beforeEach(function(){

    var form_datas = [
      { type: 'text', name: "lala" }
    ];

    var fields = {
      'lala': {
        validators: {
          not_empty: {
            message: 'Invalid'
          }
        }
      }
    }

    validator = spec_helpers.construct_form(form_datas, fields);
  });

  it('Should not be empty', function(){

    var element   = validator.getDomField('lala');
    element.value = 'lalala';

    expect(validator.valid()).toBe(true);
  });

  it('Should be empty and be false', function(){

    var element   = validator.getDomField('lala');
    element.value = ' ';

    expect(validator.valid()).toBe(false);
  });

});
