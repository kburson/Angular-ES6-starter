// all paths are relative to the location of index.html
startTimeOfApplicationLoading = Date.now();

// Identical to writing System.basURL - ...
System.config({
  baseURL: './', //relative to index.html location
  paths: {
    'lodash'             : 'js/lib/lodash.min.js',
    'angular'            : 'js/lib/angular.min.js',
    'angular-animate'    : 'js/lib/angular-animate.min.js',
    'angular-messages'   : 'js/lib/angular-messages.min.js',
    'angular-aria'       : 'js/lib/angular-aria.min.js',
    'angular-resource'   : 'js/lib/angular-resource.min.js',
    'angular-cookies'    : 'js/lib/angular-cookies.min.js',
    'angular-storage'    : 'js/lib/angular-storage.min.js',
    'angular-material'   : 'js/lib/angular-material.min.js',
    'angular-mocks'      : 'js/lib/angular-mocks.js',
    'angular-ui-router'  : 'js/lib/angular-ui-router.min.js',
    'statehelper'        : 'js/lib/statehelper.min.js',
    'loading-bar'        : 'js/lib/loading-bar.min.js'
  },
  // give hints for module dependencies
  meta: {
    'angular': {format: 'global', exports: 'angular'},
    'angular-ui-router': {format: 'global', deps: ['angular']},
    'statehelper': {format: 'global', deps: ['angular', 'angular-ui-router']},
    'angular-animate': {format: 'global', deps: ['angular']},
    'angular-aria': {format: 'global', deps: ['angular']},
    'angular-cookies': {format: 'global', deps: ['angular']},
    'angular-loading-bar': {format: 'global', deps: ['angular']},
    'angular-material': {format: 'global', deps: ['angular','angular-messages','angular-aria','angular-animate']},
    'angular-messages': {format: 'global', deps: ['angular']},
    'angular-mocks': {format: 'global', deps: ['angular']},
    'angular-resource': {format: 'global', deps: ['angular']},
    'angular-storage': {format: 'global', deps: ['angular']}
  },

  // create aliases
  // SystemJS Plugins, referenced with "moduleName!pluginName"
  map: {
    'json': 'js/lib/json',
    'text': 'js/lib/text'
  }
});
