(function() {
  this.VanillaFormValidator = (function() {
    var ID_REGEXP;

    ID_REGEXP = /(\[|\]|\(|\))/g;

    VanillaFormValidator.rules = {};

    function VanillaFormValidator(form_element, opts) {
      if (opts == null) {
        opts = {};
      }
      this.form = form_element;
      this.opts = this.defaultOpts(opts);
      this.fields = {};
    }

    VanillaFormValidator.prototype.addField = function(field_name, opts) {
      this.fields[field_name] = opts;
    };

    VanillaFormValidator.prototype.addFields = function(fields) {
      var n, v;
      for (n in fields) {
        v = fields[n];
        this.addField(n, v);
      }
    };

    VanillaFormValidator.prototype.removeField = function(field_name) {
      delete this.fields[field_name];
    };

    VanillaFormValidator.prototype.reset = function() {
      var f, self;
      self = this;
      this.clearErrorMessages();
      f = this.form.cloneNode(true);
      this.form.parentNode.replaceChild(f, this.form);
      return this.form = f;
    };

    VanillaFormValidator.prototype.initLive = function(opts) {
      var event_type, i, input, inputs, j, len, len1, ref, self, submitted, validate;
      if (opts == null) {
        opts = {};
      }
      opts['submit_btn'] = opts['submit_btn'] || false;
      opts['direct_live'] = opts['direct_live'] || false;
      self = this;
      submitted = opts['direct_live'] ? true : false;
      validate = function() {
        var response;
        response = self.valid();
        if (!response) {
          self.validate();
        }
        return response;
      };
      if (opts['submit_btn']) {
        submit_btn.addEventListener('click', function(event) {
          submitted = true;
          if (!validate()) {
            return event.preventDefault();
          }
        });
      } else {
        this.form.addEventListener('submit', function(event) {
          submitted = true;
          if (!validate()) {
            return event.preventDefault();
          }
        });
      }
      inputs = this.form.querySelectorAll('input, textarea');
      ref = ['change', 'keyup', 'focus'];
      for (i = 0, len = ref.length; i < len; i++) {
        event_type = ref[i];
        for (j = 0, len1 = inputs.length; j < len1; j++) {
          input = inputs[j];
          input.addEventListener(event_type, function(event) {
            if (submitted) {
              return self.validate();
            }
          });
        }
      }
    };

    VanillaFormValidator.prototype.valid = function() {
      var a, field_name, field_opts, r, ref, self, validator_name, validator_response;
      self = this;
      r = true;
      ref = this.fields;
      for (field_name in ref) {
        field_opts = ref[field_name];
        a = this.getFieldValidity(field_name);
        for (validator_name in a) {
          validator_response = a[validator_name];
          if (!validator_response) {
            r = false;
            break;
          }
        }
      }
      return r;
    };

    VanillaFormValidator.prototype.getFieldValidity = function(field_name) {
      var element, field, func, response, validator_name, validator_opts, validators, value;
      field = this.fields[field_name];
      element = this.getDomField(field_name);
      if (!element) {
        return false;
      }
      value = element.value;
      validators = field['validators'] || {};
      response = {};
      for (validator_name in validators) {
        validator_opts = validators[validator_name];
        func = this.constructor.rules[validator_name];
        validator_opts['element'] = element;
        validator_opts['form'] = this.form;
        response[validator_name] = func(value, validator_opts);
      }
      return response;
    };

    VanillaFormValidator.prototype.errors = function() {
      var a, field_name, field_opts, message, ref, response, self, validator_name, validator_response;
      self = this;
      response = {};
      ref = this.fields;
      for (field_name in ref) {
        field_opts = ref[field_name];
        a = this.getFieldValidity(field_name);
        for (validator_name in a) {
          validator_response = a[validator_name];
          if (!validator_response) {
            if (!response[field_name]) {
              message = field_opts['validators'][validator_name]['message'] || field_opts['message'] || false;
              response[field_name] = message;
            }
          }
        }
      }
      return response;
    };

    VanillaFormValidator.prototype.validate = function() {
      var element, field_name, message, ref, self;
      self = this;
      this.clearErrorMessages();
      ref = this.errors();
      for (field_name in ref) {
        message = ref[field_name];
        element = self.getDomField(field_name);
        self.appendErrorMessageOn(element, message);
      }
    };

    VanillaFormValidator.prototype.appendErrorMessageOn = function(element, message) {
      var a, b, e, id, ref, tag;
      tag = this.opts['error_html_tag'];
      e = document.createElement(tag);
      id = ("vanilla_validator_error_" + element.name).replace(ID_REGEXP, '_');
      e.classList.add(this.opts['error_html_tag_class']);
      e.id = id;
      e.innerHTML = message;
      ref = this.opts['error_html_tag_styles'];
      for (a in ref) {
        b = ref[a];
        e.style[a] = b;
      }
      element.classList.add('vanilla-validator-error');
      element.parentNode.insertBefore(e, element.nextSibling);
      return element;
    };

    VanillaFormValidator.prototype.clearErrorMessages = function() {
      var e, element, error_tag_id, i, len, ref;
      ref = this.form.elements;
      for (i = 0, len = ref.length; i < len; i++) {
        e = ref[i];
        if (e.name && e.type && e.type !== 'submit') {
          error_tag_id = ("#vanilla_validator_error_" + e.name).replace(ID_REGEXP, '_');
          element = this.form.querySelector(error_tag_id);
          if (element) {
            e.classList.remove('vanilla-validator-error');
            element.parentNode.removeChild(element);
          }
        }
      }
    };

    VanillaFormValidator.prototype.getDomField = function(field_name) {
      return this.form[field_name];
    };

    VanillaFormValidator.addRule = function(rule_name, rule_function) {
      this.rules[rule_name] = rule_function;
    };

    VanillaFormValidator.prototype.defaultOpts = function(opts) {
      var d, n, v;
      d = {
        error_html_tag: 'small',
        error_html_tag_class: ['vanilla_validator_error'],
        error_html_tag_styles: {
          'color': 'red',
          'font-size': '0.8em',
          'display': 'block'
        }
      };
      for (n in opts) {
        v = opts[n];
        d[n] = v;
      }
      return d;
    };

    return VanillaFormValidator;

  })();

}).call(this);
