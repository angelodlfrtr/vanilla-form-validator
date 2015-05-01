"use strict";

describe("Equal rule", function(){

  var validator;

  beforeEach(function(){

    var form_datas = [
      { type: 'text', name: "ok" },
      { type: 'text', name: "okok", value: 'lala' },
    ];

    var fields = {
      'ok': {
        validators: {
          equal: {
            message: 'Invalid value',
            field: 'okok'
          }
        }
      }
    }

    validator = spec_helpers.construct_form(form_datas, fields);
  });

  it('should have the same values', function(){

    validator.getDomField('ok').value = 'lala';

    expect(validator.valid()).toBe(true);
  });

  it('should have the same values', function(){

    validator.getDomField('ok').value = 'lili';

    expect(validator.valid()).toBe(false);
  });

});
