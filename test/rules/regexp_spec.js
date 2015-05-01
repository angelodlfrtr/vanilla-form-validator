"use strict";

describe("Regexp rule", function(){

  var validator;

  beforeEach(function(){

    var form_datas = [
      { type: 'text', name: "lala" }
    ];

    var fields = {
      'lala': {
        validators: {
          regexp: {
            message: 'Invalid',
            regexp: /^g$/
          }
        }
      }
    }

    validator = spec_helpers.construct_form(form_datas, fields);
  });

  it('Should have true regexp response', function(){

    var element   = validator.getDomField('lala');
    element.value = 'g';

    expect(validator.valid()).toBe(true);
  });

  it('Should have false regexp response', function(){

    var element   = validator.getDomField('lala');
    element.value = 'gg';

    expect(validator.valid()).toBe(false);
  });

});
