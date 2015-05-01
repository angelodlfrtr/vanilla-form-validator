"use strict";

describe("Url rule", function(){

  var validator;

  beforeEach(function(){

    var form_datas = [
      { type: 'text', name: "lala" }
    ];

    var fields = {
      'lala': {
        validators: {
          url: {
            message: 'Invalid'
          }
        }
      }
    }

    validator = spec_helpers.construct_form(form_datas, fields);
  });

  it('Should have valid url', function(){

    var element   = validator.getDomField('lala');
    element.value = 'http://lala.fr';

    expect(validator.valid()).toBe(true);
  });

  it('Should have invalid url', function(){

    var element   = validator.getDomField('lala');
    element.value = 'http://lalar';

    expect(validator.valid()).toBe(false);

  });

});
