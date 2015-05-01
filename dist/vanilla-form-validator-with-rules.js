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

(function() {
  VanillaFormValidator.addRule('color', function(value, opts) {
    var format, keywords, re, re_int, re_per;
    if (value === '') {
      return false;
    }
    format = opts['format'] || 'hex';
    switch (format) {
      case 'hex':
        re = /^#[0-9A-F]{6}$/i;
        return re.test(value);
      case 'hsl':
        re = /^hsl\((\s*(-?\d+)\s*,)(\s*(\b(0?\d{1,2}|100)\b%)\s*,)(\s*(\b(0?\d{1,2}|100)\b%)\s*)\)$/;
        return re.test(value);
      case 'hsla':
        re = /^hsla\((\s*(-?\d+)\s*,)(\s*(\b(0?\d{1,2}|100)\b%)\s*,){2}(\s*(0?(\.\d+)?|1(\.0+)?)\s*)\)$/;
        return re.test(value);
      case 'keyword':
        keywords = ['aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'grey', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'transparent', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen'];
        return keywords.indexOf(value.trim()) > -1;
      case 'rgb':
        re_int = /^rgb\((\s*(\b([01]?\d{1,2}|2[0-4]\d|25[0-5])\b)\s*,){2}(\s*(\b([01]?\d{1,2}|2[0-4]\d|25[0-5])\b)\s*)\)$/;
        re_per = /^rgb\((\s*(\b(0?\d{1,2}|100)\b%)\s*,){2}(\s*(\b(0?\d{1,2}|100)\b%)\s*)\)$/;
        return re_int.test(value) || re_per.test(value);
      case 'rgba':
        re_int = /^rgba\((\s*(\b([01]?\d{1,2}|2[0-4]\d|25[0-5])\b)\s*,){3}(\s*(0?(\.\d+)?|1(\.0+)?)\s*)\)$/;
        re_per = /^rgba\((\s*(\b(0?\d{1,2}|100)\b%)\s*,){3}(\s*(0?(\.\d+)?|1(\.0+)?)\s*)\)$/;
        return re_int.test(value) || re_per.test(value);
    }
  });

}).call(this);

(function() {
  VanillaFormValidator.addRule('email', function(value, opts) {
    var re;
    re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(value);
  });

}).call(this);

(function() {
  VanillaFormValidator.addRule('equal', function(value, opts) {
    var element, form, val;
    form = opts['form'];
    element = form.elements[opts['field']];
    val = element.value;
    return value === val;
  });

}).call(this);

(function() {
  VanillaFormValidator.addRule('file', function(value, opts) {
    var element, ext, file, t;
    element = opts['element'];
    if (element.files.length < 1) {
      return false;
    }
    file = element.files[0];
    if (opts['exts']) {
      if (file.name.split('.') < 1) {
        return false;
      }
      t = file.name.split('.');
      ext = t[t.length - 1];
      if (!(opts['exts'].indexOf(ext) > -1)) {
        return false;
      }
    }
    return true;
  });

}).call(this);

(function() {
  VanillaFormValidator.addRule('length', function(value, opts) {
    if (opts['length']) {
      return value.length === opts['length'];
    }
    if (opts['min'] && opts['max']) {
      return value.length >= opts['min'] && value.length <= opts['max'];
    }
    if (opts['min']) {
      return value.length >= opts['min'];
    }
    if (opts['max']) {
      return value.length <= opts['max'];
    }
  });

}).call(this);

(function() {
  VanillaFormValidator.addRule('not_empty', function(value, opts) {
    return value.trim().length > 0;
  });

}).call(this);

(function() {
  VanillaFormValidator.addRule('number', function(value, opts) {
    return value - parseFloat(value) + 1 >= 0;
  });

}).call(this);

(function() {
  VanillaFormValidator.addRule('regexp', function(value, opts) {
    var re;
    re = opts['regexp'];
    return re.test(value);
  });

}).call(this);

(function() {
  VanillaFormValidator.addRule('remote', function(opts) {
    var async, c, field_name, json, type, url, xhr, xhr_args;
    xhr = new XMLHttpRequest();
    url = opts['url'] || '/';
    type = opts['type'] || 'GET';
    async = false;
    field_name = opts['name'] || opts['element'].name;
    xhr_args = null;
    if (type === 'GET') {
      c = "?" + (encodeURIComponent(field_name)) + "=" + (encodeURIComponent(value));
      url += c;
    } else {
      xhr_args = "?" + (encodeURIComponent(field_name)) + "=" + (encodeURIComponent(value));
    }
    xhr.open(type, url, async);
    xhr.send(xhr_args);
    if (xhr.status === 200) {
      json = JSON.parse(xhr.responseText);
      return json['valid'];
    } else {
      return false;
    }
  });

}).call(this);

(function() {
  VanillaFormValidator.addRule('url', function(value, opts) {
    var re;
    if (value === '') {
      return false;
    }
    re = new RegExp('^(https?:\\/\\/)?' + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + '((\\d{1,3}\\.){3}\\d{1,3}))' + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + '(\\?[;&a-z\\d%_.~+=-]*)?' + '(\\#[-a-z\\d_]*)?$', 'i');
    return re.test(value);
  });

}).call(this);
