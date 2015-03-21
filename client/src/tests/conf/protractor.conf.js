// protractor.conf doc:  https://github.com/angular/protractor/blob/master/docs/referenceConf.js

exports.config = {
  // The timeout in milliseconds for each script run on the browser. This should
  // be longer than the maximum time your application needs to stabilize between
  // tasks.
  allScriptsTimeout: 11000,

  // How long to wait for a page to load.
  getPageTimeout: 10000,

  specs: [
    '../e2e/scenarios/**/*.js'
  ],

  suites: {
    smoke: '../e2e/scenarios/smoke/**/*.js',
    full:  '../e2e/scenarios/**/*.js'
  },

  capabilities: {
    'browserName': 'chrome',
    // disable the banner on chrome about unsupported command-line flag
    'chromeOptions': {
      args: ['--test-type']
    }
  },

  baseUrl: 'http://localhost:8000/',

  //  jasmine, jasmine2, cucumber, mocha or custom.
  framework: 'mocha',

  // Options to be passed to jasmine2.
  //
  // See https://github.com/jasmine/jasmine-npm/blob/master/lib/jasmine.js
  // for the exact options available.
  //jasmineNodeOpts: {
  //
  //  // If true, print colors to the terminal.
  //  showColors: true,
  //
  //  // Function called to print jasmine results.
  //  //print: function() {},
  //
  //  // If set, only execute specs whose names match the pattern, which is
  //  // internally compiled to a RegExp.
  //  //grep: 'pattern',
  //
  //  // Inverts 'grep' matches
  //  //invertGrep: false,
  //
  //  // Default time to wait in ms before a test fails.
  //  defaultTimeoutInterval: 30000
  //},

  // Options to be passed to Mocha.
  //
  // See the full list at http://mochajs.org/
  // reporters: 'list', 'spec', 'min', 'xunit', 'tap', 'dot', 'progress'
  mochaOpts: {
    ui: 'bdd',
    reporter: 'spec',
    require: 'should',
    timeout: 5000,
    slow: 3000        // Mocha will report the spec as slow if it goes over this time in ms.
  },


  // A callback function called once configs are read but before any environment
  // setup. This will only run once, and before onPrepare.
  // You can specify a file containing code to run by setting beforeLaunch to
  // the filename string.
  beforeLaunch: function() {
    // At this point, global variable 'protractor' object will NOT be set up,
    // and globals from the test framework will NOT be available. The main
    // purpose of this function should be to bring up test dependencies.
  },

  // A callback function called once protractor is ready and available, and
  // before the specs are executed.
  // If multiple capabilities are being run, this will run once per
  // capability.
  // You can specify a file containing code to run by setting onPrepare to
  // the filename string.
  onPrepare: function() {
    console.log("==== preparing protractor ---");
    global.chai = require('chai')
    .use(require('chai-string'))
    .use(require("chai-as-promised"));

    global.assert = chai.assert;
    global.expect = chai.expect;
    global.should = chai.should();

    // TODO: Do we still need this fix for chai assertions silently passing when property is undefined ?
    //chai.use(require('chai-missing-assertions'));

    // Custom locators
    //protractor.By.addLocator("sizzleSelector", clientSideScripts.getBySizzleSelectorUsingJquery);
    //console.log("==== Chai assertions are enabled");
  },

  // A callback function called once tests are finished.
  onComplete: function() {
    // At this point, tests will be done but global objects will still be
    // available.
  },

  // A callback function called once the tests have finished running and
  // the WebDriver instance has been shut down. It is passed the exit code
  // (0 if the tests passed). This is called once per capability.
  onCleanUp: function(exitCode) {},

  // A callback function called once all tests have finished running and
  // the WebDriver instance has been shut down. It is passed the exit code
  // (0 if the tests passed). This is called only once before the program
  // exits (after onCleanUp).
  afterLaunch: function() {}

};
