// Karma configuration
var path=require('path');
var appRoot =  path.resolve( __dirname + '/../../../..');

console.log("=== projectRoot = ", appRoot);

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: appRoot,
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

      'karma-mocha-reporter',
      //'karma-nested-reporter',
      'karma-story-reporter',
      'karma-nyan-reporter',
      'karma-html-reporter',
      //'karma-growl-reporter',
      //'karma-doc-reporter',
      //'karma-tap-reporter',
      'karma-spec-reporter',
      'karma-junit-reporter',
      //'karma-benchmark-reporter',
      'karma-failed-reporter'
    ],

    systemjs: {
      // Path to your SystemJS configuration file
      configFile: 'client/src/app/system.config.js',

      // File patterns for application code, dependencies, and test suites
      // all file paths are relative to basePath
      files: [
        '_build/resources.json',
        '_build/js/lib/**/*.js',
        'client/src/app/**/*.es6',
        'client/src/app/bootstrap.js'
      ],

      // SystemJS configuration specifically for tests, added after your config file.
      // Good for adding test libraries and mock modules
      config: {
        baseUrl     : '/client/src/app/',
        transpiler  : 'traceur',
        paths: {
          'angular'            : 'node_modules/angular/angular.min.js',
          'angular-animate'    : 'node_modules/angular-animate/angular-animate.min.js',
          'angular-aria'       : 'node_modules/angular-aria/angular-aria.min.js',
          'angular-cookies'    : 'node_modules/angular-cookies/angular-cookies.min.js',
          'loading-bar'        : 'node_modules/angular-loading-bar/build/loading-bar.min.js',
          'angular-material'   : 'node_modules/angular-material/angular-material.min.js',
          'angular-messages'   : 'node_modules/angular-messages/angular-messages.min.js',
          'angular-mocks'      : 'node_modules/angular-mocks/angular-mocks.js',
          'angular-resource'   : 'node_modules/angular-resource/angular-resource.min.js',
          'angular-storage'    : 'node_modules/angular-storage/dist/angular-storage.min.js',
          'angular-ui-router'  : 'node_modules/angular-ui-router/release/angular-ui-router.min.js',
          'statehelper'        : 'node_modules/angular-uit-router.statehelper/statehelper.min.js',
          'lodash'             : 'client/lib/lodash.min.js',
          'json'               : 'bower_components/plugin-json/json.js',
          '*.es6'              : '*.es6'
        }
      },
      // Specify the suffix used for test suite file names.
      // Defaults to .test.js, .spec.js, _test.js, and _spec.js
      testFileSuffix: '.spec.js'
    },

    client: {
      mocha: {
        reporter: 'html', // change Karma's debug.html to the mocha web reporter
        ui: 'bdd'
      }
    },

    reporters: ['junit', 'spec', /*'coverage',*/ 'failed'],
    reportSlowerThan: 1000,
    junitReporter: {
      outputFile: 'reports/unit-test-results.xml',
      suite: ''
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
    singleRun: false,
    background: false
  });
};
