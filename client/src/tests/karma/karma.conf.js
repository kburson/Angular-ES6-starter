// Karma configuration

console.log("=== projectRoot = ", projectRoot);

module.exports = function (config) {
  config.set({


    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: projectRoot,
    urlRoot: '',

    hostname: 'localhost',

    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [ 'systemjs','mocha','chai','chai-as-promised','sinon-chai'],

    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-chai-plugins',

      //'karma-coverage',
      'karma-systemjs',

      //'karma-ng-html2js-preprocessor',
      'karma-traceur-preprocessor',
      'karma-complexity-preprocessor',
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

    files: [],

    systemjs: {
      // Path to your SystemJS configuration file
      configFile: '_build/js/system.config.js',

      // File patterns for application code, dependencies, and test suites
      // all file paths are relative to basePath
      files: [
        '_build/js/lib/*.js',
        '_build/js/modules/**/*.js',
        'client/src/app/**/*.spec.es6'   // tests
      ],

      // SystemJS configuration specifically for tests, added after your config file.
      // Good for adding test libraries and mock modules
      config: {
        transpiler: 'traceur',
        baseUrl: '/',
        paths: {
          'lodash':            '_build/js/lib/lodash.min.js',
          'angular':           '_build/js/lib/angular.min.js',
          'angular-animate':   '_build/js/lib/angular-animate.min.js',
          'angular-messages':  '_build/js/lib/angular-messages.min.js',
          'angular-aria':      '_build/js/lib/angular-aria.min.js',
          'angular-resource':  '_build/js/lib/angular-resource.min.js',
          'angular-cookies':   '_build/js/lib/angular-cookies.min.js',
          'angular-storage':   '_build/js/lib/angular-storage.min.js',
          'angular-material':  '_build/js/lib/angular-material.min.js',
          'angular-mocks':     '_build/js/lib/angular-mocks.js',
          'angular-ui-router': '_build/js/lib/angular-ui-router.min.js',
          'statehelper':       '_build/js/lib/statehelper.min.js',
          'loading-bar':       '_build/js/lib/loading-bar.min.js',
          'json':              '_build/js/lib/json.js',
          'resources.json':    '_build/resources.json'
        }
      }
      // Specify the suffix used for test suite file names.
      // Defaults to .test.js, .spec.js, _test.js, and _spec.js
      //testFileSuffix: '.spec.js'
    },


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'client/src/app/**/*.es6': ['traceur']  // pre-compile tests
    },

    traceurPreprocessor: {
      // options passed to the traceur-compiler
      // see traceur --longhelp for list of options
      options: {
        sourceMaps: false,
        modules: 'amd',
        annotations: false,
        types: false
      }//,
      // custom filename transformation function
      //transformPath: function(path) {
      //  console.log("--> " + path);
      //  var newPath = path.replace(/\.es6$/, '.js');
      //  console.log("<-- " + newPath);
      //  return newPath;
      //}
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
    singleRun: true,
    background: false
  });
};
