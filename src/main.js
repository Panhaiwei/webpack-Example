let moduleExports = {};

const files = require.context("./", true, /^\.\/.+\/.+\.js$/);
files.keys().forEach((key) => {
  let attr = key.substring(key.lastIndexOf("/") + 1, key.lastIndexOf("."));
  moduleExports[attr] = files(key);
});

module.exports = moduleExports;
