"use strict";

describe("Number rule", function(){

  var validator;

  beforeEach(function(){

    var form_datas = [
      { type: 'text', name: "lala" }
    ];

    validator = spec_helpers.construct_form(form_datas, {});
  });

  // Max and Min ====================================================================

  it('should have valid number with max and min', function(){

    var element = validator.getDomField('lala');

    validator.addField('lala', {
      validators: {
        number: {
          message: 'Invalid',
          max: 10,
          min: 9
        }
      }
    });

    element.value = '9';

    expect(validator.valid()).toBe(true);
  });

  it('should have invalid number with max and min', function(){

    var element = validator.getDomField('lala');

    validator.addField('lala', {
      validators: {
        number: {
          message: 'Invalid',
          max: 10,
          min: 9
        }
      }
    });

    element.value = '3';

    expect(validator.valid()).toBe(false);
  });

  // Max ============================================================================

  it('should have valid number with max', function(){

    var element = validator.getDomField('lala');

    validator.addField('lala', {
      validators: {
        number: {
          message: 'Invalid',
          max: 10
        }
      }
    });

    element.value = '9';

    expect(validator.valid()).toBe(true);
  });

  it('should have invalid number with max', function(){

    var element = validator.getDomField('lala');

    validator.addField('lala', {
      validators: {
        number: {
          message: 'Invalid',
          max: 10
        }
      }
    });

    element.value = '11';

    expect(validator.valid()).toBe(false);
  });

  // Min ============================================================================

  it('should have valid number with min', function(){

    var element = validator.getDomField('lala');

    validator.addField('lala', {
      validators: {
        number: {
          message: 'Invalid',
          min: 10
        }
      }
    });

    element.value = '11';

    expect(validator.valid()).toBe(true);
  });

  it('should have invalid number with min', function(){

    var element = validator.getDomField('lala');

    validator.addField('lala', {
      validators: {
        number: {
          message: 'Invalid',
          min: 10
        }
      }
    });

    element.value = '9';

    expect(validator.valid()).toBe(false);
  });

});
