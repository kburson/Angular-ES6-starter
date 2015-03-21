module.exports = function (config) {
  config.set({
    basePath: '/',
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

    files : ['_build/js/lib/xcon-0.6.0.min.js'],

    systemjs: {

      // configPath = basePath + configFile
      // load this file into the karma watch matrix
      configFile: 'client/src/app/system.config.js',

      // load all test dependencies into memory
      // basePath + files[n]
      files: [
        'client/lib/lodash.min.js',

        'bower_components/plugin-json/json.js',
        'bower_components/plugin-text/text.js',

        'node_modules/angular/angular.js',
        'node_modules/angular-aria/angular-aria.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-messages/angular-messages.js',
        'node_modules/angular-resource/angular-resource.js',
        'node_modules/angular-cookies/angular-cookies.js',
        'node_modules/angular-material/angular-material.js',
        'node_modules/angular-mocks/angular-mocks.js',

        'node_modules/angular-storage/dist/angular-storage.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/angular-loading-bar/build/loading-bar.js',

        '_build/resources.json', // this is the one 'built' file.  Need to create a mock version that is not compiled!

        'client/src/app/modules/**/*.js',
        'client/src/app/modules/**/*.tpl'
      ],

      testFileSuffix: '.spec.js',

      config: {
        baseURL: '/client/src/app/modules/',
        transpiler: 'traceur',
        paths: {
          'lodash'            : '../lib/lodash.min.js',

          'json'              : '../../../../bower_components/plugin-json/json.js',
          'text'              : '../../../../bower_components/plugin-text/text.js',

          'angular'           : '../../../../node_modules/angular/angular.js',
          'angular-animate'   : '../../../../node_modules/angular-animate/angular-animate.js',
          'angular-messages'  : '../../../../node_modules/angular-messages/angular-messages.js',
          'angular-aria'      : '../../../../node_modules/angular-aria/angular-aria.js',
          'angular-resource'  : '../../../../node_modules/angular-resource/angular-resource.js',
          'angular-cookies'   : '../../../../node_modules/angular-cookies/angular-cookies.js',
          'angular-material'  : '../../../../node_modules/angular-material/angular-material.js',
          'angular-mocks'     : '../../../../node_modules/angular-mocks/angular-mocks.js',

          'angular-storage'   : '../../../../node_modules/angular-storage/dist/angular-storage.js',
          'angular-ui-router' : '../../../../node_modules/angular-ui-router/release/angular-ui-router.js',

          'loading-bar'       : '../../../../node_modules/angular-loading-bar/build/loading-bar.js',

          'resources.json'    : '../../../../_build/resources.json'
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
      outputFile: 'reports/unit-test-results.xml',
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
