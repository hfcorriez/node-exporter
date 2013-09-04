if (require.register) {
  var $ = require('exporter');
} else {
  var $ = require('../')
}

$.string = 'test';
$.boolean = true;
$.config = {
  db: 'localhost'
};
$.fn = function () {
  return 'fn';
};
$.array = ['array'];