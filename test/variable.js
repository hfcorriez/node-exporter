if (require.register) {
  var $ = require('exporter');
} else {
  var $ = require('../')
    , expect = require('expect.js');
}

require('./init');

describe('variables', function () {
  it('should support mixed variables', function () {
    expect($.string).to.eql('test');

    expect($.boolean).to.eql(true);

    expect($.config).to.eql({db: 'localhost'});

    expect($.array).to.eql(['array']);

    expect($.fn).to.be.an(Function);

    expect($.fn()).to.eql('fn');
  });
});