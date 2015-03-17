// Karma configuration
var path=require('path');
var appRoot =  path.resolve( __dirname + '/../../../..');
//var appRoot = path.resolve( '/../../../../');

console.log("=== projectRoot = ", appRoot);

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../../../../',  // ~ /client/src/test/karma/karma.conf.js
    urlRoot: '',
    hostname: 'localhost',
    frameworks: [ 'systemjs','mocha','chai','chai-as-promised','sinon-chai'],
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter

    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-chai-plugins',

      //'karma-coverage',
      'karma-systemjs',

      //'karma-ng-html2js-preprocessor',
      //'karma-traceur-preprocessor',
      //'karma-complexity-preprocessor',
      //'karma-amdwrap-preprocessor',
      //'karma-autoprefixer-preprocessor',

      //'karma-amd-config',
      //'karma-coverage-es6',
      //'karma-coverage-blamer',

      'karma-chrome-launcher',
      'karma-firefox-launcher',
      //'karma-safari-launcher',
      //'karma-phantomjs-launcher',

      //'karma-mocha-reporter',
      //'karma-nested-reporter',
      //'karma-story-reporter',
      //'karma-nyan-reporter',
      //'karma-html-reporter',
      //'karma-growl-reporter',
      //'karma-doc-reporter',
      //'karma-tap-reporter',
      'karma-spec-reporter',
      'karma-junit-reporter',
      //'karma-benchmark-reporter',
      'karma-failed-reporter'
    ],

    systemjs: {
      configFile: '_build/js/system.config.js',
      files: [
        '_build/js/lib/*.js',           // dependent libraries
        //'client/src/app/**/*.es6',    // app src (with tests)
        //'client/src/app/bootstrap.js, // angular bootstrap from systemjs
        '_build/js/modules/**/*.js',
        'client/src/app/**/*.spec.es6'
      ],
      config: {
        transpiler: 'traceur',
        paths: {
          '*.es6': '*.es6'
        },
        baseURL: '/'
      },
      testFileSuffix: '.spec.es6'
    },

    client: {
      mocha: {
        reporter: 'html', // change Karma's debug.html to the mocha web reporter
        ui: 'bdd'
      }
    },

    reporters: ['junit', 'spec', 'failed'],
    reportSlowerThan: 1000,
    junitReporter: {
      outputFile: 'reports/unit-test-results.xml',
      suite: 'unit-tests'
    },

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      //'Firefox'
       'Chrome'
      //, 'PhantomJS'
      //, 'Safari'
    ],

    captureTimeout: 10000,

    // web server port
    port: 9876,
    runnerPort: 9100,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
    background: false
  });
};
