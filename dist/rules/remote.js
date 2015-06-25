(function() {
  VanillaFormValidator.addRule('remote', function(value, opts) {
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
