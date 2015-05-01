"use strict";

describe("File rule", function(){

  var validator;

  beforeEach(function(){

    var form_datas = [
      { type: 'file', name: "file" }
    ];

    var fields = {
      'file': {
        validators: {
          file: {
            message: 'Invalid file',
            exts: ['html', 'txt']
          }
        }
      }
    }

    validator = spec_helpers.construct_form(form_datas, fields);
  });

  it('should have valid file', function(){

    var element = validator.getDomField('file');

    // @todo: create file list

    //expect(validator.valid()).toBe(true);
  });
});
