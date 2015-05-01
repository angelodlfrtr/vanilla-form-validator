"use strict";

describe("Color rule", function(){

  var validator;

  beforeEach(function(){

    var form_datas = [
      { type: 'text', name: "color" },
    ];

    validator = spec_helpers.construct_form(form_datas, {});
  });

  // ================================================================================
  // Hex color ======================================================================
  // ================================================================================

  it('should have valid hex color', function(){

    validator.addField('color', {
      validators: {
        color: {
          message: '',
          format: 'hex'
        }
      }
    });

    validator.getDomField('color').value = '#ffffff';

    expect(validator.valid()).toBe(true);
  });

  it('should have invalid hex color', function(){

    validator.addField('color', {
      validators: {
        color: {
          message: '',
          format: 'hex'
        }
      }
    });

    validator.getDomField('color').value = '#ffff%';

    expect(validator.valid()).toBe(false);
  });

  // ================================================================================
  // hsl color ======================================================================
  // ================================================================================

  it('should have valid hsl color', function(){

    validator.addField('color', {
      validators: {
        color: {
          message: '',
          format: 'hsl'
        }
      }
    });

    validator.getDomField('color').value = 'hsl(120, 100%, 50%)';

    expect(validator.valid()).toBe(true);
  });

  it('should have invalid hsl color', function(){

    validator.addField('color', {
      validators: {
        color: {
          message: '',
          format: 'hsl'
        }
      }
    });

    validator.getDomField('color').value = 'hsl(120%, 100%, 50%)';

    expect(validator.valid()).toBe(false);
  });

  // ================================================================================
  // hsla color =====================================================================
  // ================================================================================

  it('should have valid hsla color', function(){

    validator.addField('color', {
      validators: {
        color: {
          message: '',
          format: 'hsla'
        }
      }
    });

    validator.getDomField('color').value = 'hsla(120, 100%, 50%, 0.3)';

    expect(validator.valid()).toBe(true);
  });

  it('should have invalid hsla color', function(){

    validator.addField('color', {
      validators: {
        color: {
          message: '',
          format: 'hsla'
        }
      }
    });

    validator.getDomField('color').value = 'hsla(120%, 100%, 50%)';

    expect(validator.valid()).toBe(false);
  });

  // ================================================================================
  // keyword color ==================================================================
  // ================================================================================

  it('should have valid keyword color', function(){

    validator.addField('color', {
      validators: {
        color: {
          message: '',
          format: 'keyword'
        }
      }
    });

    validator.getDomField('color').value = 'red';

    expect(validator.valid()).toBe(true);
  });

  it('should have invalid keyword color', function(){

    validator.addField('color', {
      validators: {
        color: {
          message: '',
          format: 'keyword'
        }
      }
    });

    validator.getDomField('color').value = 'wine';

    expect(validator.valid()).toBe(false);
  });

  // ================================================================================
  // rgb color ======================================================================
  // ================================================================================

  it('should have valid rgb color', function(){

    validator.addField('color', {
      validators: {
        color: {
          message: '',
          format: 'rgb'
        }
      }
    });

    validator.getDomField('color').value = 'rgb(255, 0, 0)';

    expect(validator.valid()).toBe(true);
  });

  it('should have invalid rgb color', function(){

    validator.addField('color', {
      validators: {
        color: {
          message: '',
          format: 'rgb'
        }
      }
    });

    validator.getDomField('color').value = 'rgb(255, 0, 988)';

    expect(validator.valid()).toBe(false);
  });

  // ================================================================================
  // rgba color =====================================================================
  // ================================================================================

  it('should have valid rgba color', function(){

    validator.addField('color', {
      validators: {
        color: {
          message: '',
          format: 'rgba'
        }
      }
    });

    validator.getDomField('color').value = 'rgba(255, 0, 0, 0.3)';

    expect(validator.valid()).toBe(true);
  });

  it('should have invalid rgba color', function(){

    validator.addField('color', {
      validators: {
        color: {
          message: '',
          format: 'rgba'
        }
      }
    });

    validator.getDomField('color').value = 'rgba(255, 0, 0, 9)';

    expect(validator.valid()).toBe(false);
  });

});
