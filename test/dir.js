if (require.register) {
  var $ = require('exporter');
} else {
  var $ = require('../')
    , expect = require('expect.js');
}

describe('dir load', function () {
  it('should support load dir', function () {
    var helpers = $(__dirname + '/helpers');

    expect(helpers)
      .to.be.an(Object);

    expect(helpers.file)
      .to.be.an(Function);

    expect(helpers.file())
      .to.eql(__dirname + '/helpers/file.js');

    expect(helpers.recursive)
      .to.be(undefined);
  });

  it('should support load dir recursive', function () {
    var helpers = $(__dirname + '/helpers', true);

    expect(helpers)
      .to.be.an(Object);

    expect(helpers.recursive)
      .to.be.an(Object);

    expect(helpers.recursive.file)
      .to.be.an(Function);

    expect(helpers.recursive.file())
      .to.eql(__dirname + '/helpers/recursive/file.js');
  });

  it('load non-exists dir should throw error', function () {
    expect(function () {
      $(__dirname + '/helpers/dir')
    })
      .to.throwException(Error);
  });
});