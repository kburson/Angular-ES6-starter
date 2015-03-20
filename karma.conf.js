module.exports = function (config) {
  config.set({
    basePath: './',
    //urlRoot: '',
    //hostname: 'localhost',
    frameworks: [ 'systemjs','mocha','chai','chai-as-promised','sinon-chai'],
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-chai-plugins',
      'karma-systemjs',
      //'karma-traceur-preprocessor',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-spec-reporter',
      'karma-junit-reporter',
      'karma-failed-reporter'
    ],

    //files : [],

    systemjs: {

      // configPath = basePath + configFile
      // load this file into the karma watch matrix
      configFile: 'client/src/app/system.config.js',

      // load all test dependencies into memory
      // basePath + files[n]
      files: [
        '_build/js/lib/*.js',
        'client/src/app/modules/**/*.js'
      ],

      testFileSuffix: '.spec.js',

      config: {
        baseURL: '/client/src/app/modules/',
        transpiler: 'traceur',
        paths: {
          'angular'           : '../../../../_build/js/lib/angular.min.js',
          'angular-animate'   : '../../../../_build/js/lib/angular-animate.min.js',
          'angular-messages'  : '../../../../_build/js/lib/angular-messages.min.js',
          'angular-aria'      : '../../../../_build/js/lib/angular-aria.min.js',
          'angular-resource'  : '../../../../_build/js/lib/angular-resource.min.js',
          'angular-cookies'   : '../../../../_build/js/lib/angular-cookies.min.js',
          'angular-storage'   : '../../../../_build/js/lib/angular-storage.min.js',
          'angular-material'  : '../../../../_build/js/lib/angular-material.min.js',
          'angular-mocks'     : '../../../../_build/js/lib/angular-mocks.js',
          'angular-ui-router' : '../../../../_build/js/lib/angular-ui-router.min.js',
          'statehelper'       : '../../../../_build/js/lib/statehelper.min.js',
          'lodash'            : '../../../../_build/js/lib/lodash.min.js',
          'loading-bar'       : '../../../../_build/js/lib/loading-bar.min.js',
          'json'              : '../../../../_build/js/lib/json.js',
          'text'              : '../../../../_build/js/lib/text.js',
          'resources.json'    : '../../../../_build/resources.json',
          "*.es6": "*.es6"
        }
      }
    },


    client: {
      mocha: {
        reporter: 'html',
        ui: 'bdd'
      }
    },
    reporters: ['junit', 'spec', 'failed'],
    reportSlowerThan: 1000,
    junitReporter: {
      outputFile: '../../../../reports/unit-test-results.xml',
      suite: ''
    },
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: [
      'Chrome'
    ],
    captureTimeout: 10000,
    port: 9876,
    runnerPort: 9100,

    autoWatch: false,
    singleRun: true,
    background: false
  });
};
