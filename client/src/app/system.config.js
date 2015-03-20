// all paths are relative to the location of index.html
startTimeOfApplicationLoading = Date.now();

System.config({
  baseURL: '/js/modules/', //relative to index.html location

  // all paths are relative to baseURL
  paths: {
    'lodash'             : '../lib/lodash.min.js',
    'angular'            : '../lib/angular.min.js',
    'angular-animate'    : '../lib/angular-animate.min.js',
    'angular-messages'   : '../lib/angular-messages.min.js',
    'angular-aria'       : '../lib/angular-aria.min.js',
    'angular-resource'   : '../lib/angular-resource.min.js',
    'angular-cookies'    : '../lib/angular-cookies.min.js',
    'angular-storage'    : '../lib/angular-storage.min.js',
    'angular-material'   : '../lib/angular-material.min.js',
    'angular-mocks'      : '../lib/angular-mocks.js',
    'angular-ui-router'  : '../lib/angular-ui-router.min.js',
    'loading-bar'        : '../lib/loading-bar.min.js',
    'json'               : '../lib/json',
    'text'               : '../lib/text'
  },
  // give hints for module dependencies
  meta: {
    'angular'            : {format: 'global', exports: 'angular'},
    'angular-ui-router'  : {format: 'global', deps: ['angular']},
    'angular-animate'    : {format: 'global', deps: ['angular']},
    'angular-aria'       : {format: 'global', deps: ['angular']},
    'angular-cookies'    : {format: 'global', deps: ['angular']},
    'angular-loading-bar': {format: 'global', deps: ['angular']},
    'angular-material'   : {format: 'global', deps: ['angular','angular-messages','angular-aria','angular-animate']},
    'angular-messages'   : {format: 'global', deps: ['angular']},
    'angular-mocks'      : {format: 'global', deps: ['angular']},
    'angular-resource'   : {format: 'global', deps: ['angular']},
    'angular-storage'    : {format: 'global', deps: ['angular']}
  },

  // create aliases
  // SystemJS Plugins, referenced with "moduleName!pluginName"
  map: {
    //'json': '../lib/json',
    //'text': '../lib/text'
  }
});
