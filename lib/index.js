var fs = require('fs')
  , util = require('./util');

/**
 *
 * @param name
 * @param source
 * @examples
 *
 *  exporter('operator/');
 *
 */
module.exports = exporter = function (name, source, cb) {
  var obj;

  if (source === undefined) {
    source = name;
    name = null;
  } else if (typeof source == 'function') {
    cb = source;
    source = name;
    name = null;
  }

  if (typeof source === 'string') {
    if (cb) {
      var error;
      fs.stat(source, function (err, stats) {
        if (err) return cb(err);

        if (stats.isFile()) {
          obj = require(source);
        } else if (stats.isDirectory()) {
          obj = {};
          fs.readdir(source, function (err, files) {
            if (err) return cb(err);

            files.forEach(function (file) {
              var ext = util.ext(file);
              if (ext == 'js') {
                obj[file.replace('.js')] = require(source + '/' + file);
              }
            });
          });
        } else {
          error = new Error("Unknown path: " + source);
        }
        if (name) exporter[name] = obj;
        cb(error, obj);
      })
    } else {
      var stats = fs.statSync(source);

      if (stats.isFile()) {
        obj = require(source);
      } else if (stats.isDirectory()) {
        var files = fs.readdirSync(source);

        obj = {};
        files.forEach(function (file) {
          var ext = util.ext(file);
          if (ext == 'js') {
            obj[file.replace('.js', '')] = require(source + '/' + file);
          }
        });
      } else {
        throw new Error("Unknown path: " + source);
      }
      if (name) exporter[name] = obj;
      return obj;
    }
  } else {
    if (name) exporter[name] = source;
    return source;
  }
};