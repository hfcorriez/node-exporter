var fs = require('fs')
  , util = require('./util');

/**
 * Read directory recursive
 *
 * @param {String}    dir
 * @param {Boolean}   r
 * @param {Function}  fn
 * @returns {Object}
 */
var readDirSync = function (dir, r, fn) {
  var obj = {};
  var files = fs.readdirSync(dir);
  files.forEach(function (file) {
    var stat = fs.statSync(dir + '/' + file);
    if (stat.isFile()) {
      var kv = fn(dir, file);
      if (kv) obj[kv[0]] = kv[1];
    } else if (stat.isDirectory() && r) {
      obj[file] = readDirSync(dir + '/' + file, r, fn);
    }
  });
  return obj;
};

/**
 *
 * @param name
 * @param source
 * @param cb
 * @examples
 *
 *  exporter('helpers', './helpers/');
 *
 *  exporter('helpers', require('./helpers');
 *
 *  var helpers = exporter('./helpers');
 *
 */
module.exports = exporter = function (name, source, r) {
  var obj;

  if (source === undefined) {
    source = name;
    name = null;
  }

  if (typeof source === 'string') {
    var stats = fs.statSync(source);

    if (stats.isFile()) {
      obj = require(source);
    } else if (stats.isDirectory()) {
      obj = readDirSync(source, r, function (dir, file) {
        var ext = util.ext(file);
        if (ext == 'js') {
          return [file.replace('.js', ''), require(dir + '/' + file)]
        }
        return false;
      });
    } else {
      throw new Error("Unknown path: " + source);
    }
    if (name) exporter[name] = obj;
    return obj;
  } else {
    if (name) exporter[name] = source;
    return source;
  }
};

