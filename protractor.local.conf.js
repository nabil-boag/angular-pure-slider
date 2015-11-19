/* global module, require */

module.exports = (function () {

  var protractorConf = require('./protractor.conf');

  // override for running tests locally
  protractorConf.config.multiCapabilities = [];

  return protractorConf;
})();