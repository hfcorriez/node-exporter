# Node Exporter

Use modules exporter for global use.

We always need load modules with follow codes:

```js
var email = require('../../helpers/email')
```

if I create more directories, I will angry with use the absolute path. So exporter is global definetion for you

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

## Export Variables

In bootstrap file

```js
var $ = require('exporter');

$.debug = true;
$.env = process.ENV['NODE_ENV'];
```

In process file

```js
var $ = require('exporter');

if ($.debug && $.env == 'product') {
    // Some logic
}
```

## Export file

Export:

```js
var $ = require('exporter');

$.uploader = $(__dirname + '/helper/uploader');
```

Or

```js
var $ = require('exporter');

$('uploader', __dirname + '/helper/uploader.js');
```

Use exporter:

```js
var $ = require('exporter');

// Use uploader as module
$.uploader.upFile(tmp_file);
```


## Export directory

The project structure:

```
- app.js
- helpers/
  - uploader.js
  - image.js
  - email.js
```

Export:

```js
var $ = require('exporter');

$.helpers = $(__dirname + './helpers');
```

Or

```js
var $ = require('exporter');

$('helpers', __dirname + '/helpers');
```

Use exporter in your code:

```js
var $ = require('exporter');

// Use email helper
$.helpers.email('hfcorriez@gmail.com');
```

## Export directory recursive

The project structure:

```
- app.js
- helpers/
  - uploader.js
  - image.js
  - email.js
  - tools/
    - guid.js
```

Export:

```js
var $ = require('exporter');

$.helpers = $(__dirname + './helpers', true);
```

Or

```js
var $ = require('exporter');

$('helpers', __dirname + '/helpers', true);
```

Use exporter:

```js
var $ = require('exporter');

// Use email helper
$.helpers.email('hfcorriez@gmail.com');

// Use guid tool
var guid = $.helpers.tools.guid();
```