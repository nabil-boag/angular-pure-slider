/* global module */

module.exports.config = {
  framework: 'cucumber',

  specs: ['app/src/features/*.feature'],

  keepAlive: false,
  debug: false,

  cucumberOpts: {
    require: [
      'app/src/features/step_definitions/*.js'
    ],
    format: 'pretty'
  },

  multiCapabilities: [{
    browserName: 'firefox'
  }]
};
