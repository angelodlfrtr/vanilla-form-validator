# Vanilla Form Validator

Validate your forms in vanilla js.

## Installation

## Usage

**Create validator :**

```javascript

// Get form dom element
var form = document.getElementsByTagName('form')[0];

// Create validator
var validator = new VanillaFormValidator(form);

```

**Add a field to validator :**

```javascript

validator.addField('field_name', {
  validators: {
    not_empty: {
      message: 'This field is required'
    }
  }
});

```

**Or add mutiple fields :**

```javascript

var fields = {
  "field_name": {
    "validators": {
      not_empty: {
        message: 'This field is ...'
      }
    }
  },
  "field_name": {
    "validators": {
      not_empty: {
        message: 'This field is ...'
      }
    }
  }
}

validator.addFields(fields);

```

**Check validity of form :**

```javascript

// Return true or false
validator.valid();

```

**Get form errors :**

```javascript

// Return hash of errors
validator.errors();

```

**Display error messages :**

```javascript

// Append small html tag to input with message
validator.validate();

```

**Live validations :**

```javascript

// Listen on click, change and keyup events on form inputs
// Use preventDefault() on submit event if form is not valid
validator.initLive();

```

**Reset validations :**

```javascript

// Remove values, events and messages
validator.reset();

```

**Remove error messages :**

```javascript

validator.clearErrorMessages();

```

## Rules

### Add Rule

You can simply add rule :

```javascript

// Function must return boolean
// True if field id valid, else false
VanillaFormValidator.addRule('rule_name', function(value, opts){

  // dom element is stored in opts['element']

});

```

Then you can call your rule when you declare your fields

## Contributing

1. Fork it ( https://github.com/angelodlfrtr/vanilla-form-validator/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
