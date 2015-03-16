// all paths are relative to the location of index.html
startTimeOfApplicationLoading = Date.now();

// Identical to writing System.basURL - ...
System.config({
  baseURL: '/js/', //relative to index.html location
  paths: {
    'lodash'             : 'lib/lodash.min.js',
    'angular'            : 'lib/angular.min.js',
    'angular-animate'    : 'lib/angular-animate.min.js',
    'angular-messages'   : 'lib/angular-messages.min.js',
    'angular-aria'       : 'lib/angular-aria.min.js',
    'angular-resource'   : 'lib/angular-resource.min.js',
    'angular-cookies'    : 'lib/angular-cookies.min.js',
    'angular-storage'    : 'lib/angular-storage.min.js',
    'angular-material'   : 'lib/angular-material.min.js',
    'angular-mocks'      : 'lib/angular-mocks.js',
    'angular-ui-router'  : 'lib/angular-ui-router.min.js',
    'statehelper'        : 'lib/statehelper.min.js',
    'loading-bar'        : 'lib/loading-bar.min.js',
    'json'               : 'lib/json.js',
    'resources.json'     : '../resources.json'
  },
  // give hints for module dependencies
  meta: {
    'angular': {format: 'global', exports: 'angular'},
    'angular-ui-router': {format: 'global', deps: ['angular']},
    'statehelper': {format: 'global', deps: ['angular', 'angular-ui-router']}
  },

  // create aliases
  map: {
    //'json': 'json.js'
  }
});
