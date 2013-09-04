# Node Exporter

Use modules exporter for global use.

We always need load modules with follow codes:

```js
var email = require('../../helpers/email')
```

if I create more directories, I will angry with using the absolute path. So exporter is global definition for you.

Load modules:

```js
var $ = require('exporter');

$('email', __dirname + '/email.js');
```

Use  it

```js
var $ = require('exporter');

// Use it
$.email('hfcorriez@gmail.com');
```


# Install

```
npm install exporter
```

# Usage

## Export

In bootstrap file, such as `app.js` in Express.

### Export variables

```js
var $ = require('exporter');

// Load with variables
$.debug = true;
$.env = process.ENV['NODE_ENV'];
```

### Export file or directory

Project structure such as:

```
- app.js
- helpers/
  - uploader.js
  - image.js
  - email.js
  - tools/
    - guid.js
```

Export

```js
// Set module directly
$.uploader = require('./helpers/uploader');

// Or use exporter
$.email = $(__dirname + '/helpers/email.js');

// Export modules in directory
$.helpers = $(__dirname + './helpers');

// Export modules recursive in directory
$('allHelpers', __dirname + '/helpers', true);
```

## Use exporter

In your process file or Express controller

```js
var $ = require('exporter');

if ($.debug && $.env == 'product') {
    // Some logic
}

var guid = $.allHelpers.tools.guid();
var sendEmail = $.helpers.email;
var uploader = $.uploader;
```

## More

In `Express` application. You can use to export all routes.

```js
var $ = require('exporter');

$.routes = $(__dirname + '/routes', true);
```

If you have the structure such as:

```
- routes/
  - register.js
  - api/
    - users.js
```

And you can use it simply

```js
var $ = require('exporter');

app.get('/register', $.routes.register);
app.get('/api/users', $.routes.api.users);
```