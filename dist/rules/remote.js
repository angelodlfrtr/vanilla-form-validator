(function() {
  VanillaFormValidator.addRule('remote', function(value, opts) {
    var async, c, field_name, json, k, params, paramsToStr, ref, type, url, v, xhr, xhr_args;
    if (value === '') {
      return true;
    }
    xhr = new XMLHttpRequest();
    url = opts['url'] || '/';
    type = opts['type'] || 'GET';
    async = false;
    field_name = opts['name'] || opts['element'].name;
    xhr_args = null;
    params = {};
    params[field_name] = value;
    if (opts['params']) {
      ref = opts['params'];
      for (k in ref) {
        v = ref[k];
        params[k] = v;
      }
    }
    paramsToStr = function(params) {
      var str;
      str = [];
      for (k in params) {
        v = params[k];
        str.push((encodeURIComponent(k)) + "=" + (encodeURIComponent(v)));
      }
      return str.join('&');
    };
    if (type === 'GET') {
      c = "?" + (paramsToStr(params));
      url += c;
    } else {
      xhr_args = "" + (paramsToStr(params));
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
