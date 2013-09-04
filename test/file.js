if (require.register) {
  var $ = require('exporter');
} else {
  var $ = require('../')
    , expect = require('expect.js');
}

describe('file load', function () {
  it('should support load file', function () {
    var file = require('./helpers/file.js');

    expect($(__dirname + '/helpers/file.js'))
      .to.eql(file);

    $('file', $(__dirname + '/helpers/file.js'));

    expect($.file)
      .to.eql(file);
  });

  it('load non-exists file should throw error', function () {
    expect(function(){$(__dirname + '/helpers/files.js')})
      .to.throwException(Error);
  });
});