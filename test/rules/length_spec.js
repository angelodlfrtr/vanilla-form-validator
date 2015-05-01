"use strict";

describe("Lenght rule", function(){

  var validator;

  beforeEach(function(){

    var form_datas = [
      { type: 'text', name: "lala" }
    ];

    validator = spec_helpers.construct_form(form_datas, {});
  });

  // Identical only =================================================================

  it('should have valid identical length', function(){

    var element = validator.getDomField('lala');

    validator.addField('lala', {
      validators: {
        length: {
          message: 'Invalid',
          length: 5
        }
      }
    });

    element.value = 'lalal';

    expect(validator.valid()).toBe(true);
  });

  it('should have invalid identical length', function(){

    var element = validator.getDomField('lala');

    validator.addField('lala', {
      validators: {
        length: {
          message: 'Invalid',
          length: 5
        }
      }
    });

    element.value = 'lall';

    expect(validator.valid()).toBe(false);
  });


  // Max only =======================================================================

  it('should have valid max length', function(){

    var element = validator.getDomField('lala');

    validator.addField('lala', {
      validators: {
        length: {
          message: 'Invalid',
          max: 5
        }
      }
    });

    element.value = 'lall';

    expect(validator.valid()).toBe(true);
  });

  it('should have invalid max length', function(){

    var element = validator.getDomField('lala');

    validator.addField('lala', {
      validators: {
        length: {
          message: 'Invalid',
          max: 5
        }
      }
    });

    element.value = 'alalalala';

    expect(validator.valid()).toBe(false);
  });

  // Min only =======================================================================

  it('should have valid min length', function(){

    var element = validator.getDomField('lala');

    validator.addField('lala', {
      validators: {
        length: {
          message: 'Invalid',
          min: 5
        }
      }
    });

    element.value = 'lalalalala';

    expect(validator.valid()).toBe(true);
  });

  it('should have invalid min length', function(){

    var element = validator.getDomField('lala');

    validator.addField('lala', {
      validators: {
        length: {
          message: 'Invalid',
          min: 5
        }
      }
    });

    element.value = 'ala';

    expect(validator.valid()).toBe(false);
  });

  // Max and min ====================================================================

  it('should have valid min length', function(){

    var element = validator.getDomField('lala');

    validator.addField('lala', {
      validators: {
        length: {
          message: 'Invalid',
          min: 5,
          max: 10
        }
      }
    });

    element.value = 'lalalala';

    expect(validator.valid()).toBe(true);
  });

  it('should have invalid min length', function(){

    var element = validator.getDomField('lala');

    validator.addField('lala', {
      validators: {
        length: {
          message: 'Invalid',
          min: 5,
          max: 10
        }
      }
    });

    element.value = 'alalalalalalala';

    expect(validator.valid()).toBe(false);
  });

});
