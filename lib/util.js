exports.ext = function (filename) {
  var i = filename.lastIndexOf('.');
  return (i < 0) ? '' : filename.substr(i + 1);
};

exports.name = function (filename) {
  var last = filename.split('/').pop()
    , pos = last.indexOf('.');

  return pos < 0 ? last : last.substr(0, pos - 1);
};

exports.isObject = function (x) {
  return typeof x === "object" && x !== null
};