// all paths are relative to the location of index.html
startTimeOfApplicationLoading = Date.now();

System.defaultJSExtensions = true;

// Identical to writing System.basURL - ...
System.config({
  baseURL: '/js/modules/', //relative to index.html location

  // all paths are relative to baseURL
  paths: {
    'lodash'             : '../lib/lodash.js',
    'angular'            : '../lib/angular.js',
    'angular-animate'    : '../lib/angular-animate.js',
    'angular-messages'   : '../lib/angular-messages.js',
    'angular-aria'       : '../lib/angular-aria.js',
    'angular-resource'   : '../lib/angular-resource.js',
    'angular-cookies'    : '../lib/angular-cookies.js',
    'angular-storage'    : '../lib/angular-storage.js',
    'angular-material'   : '../lib/angular-material.js',
    'angular-mocks'      : '../lib/angular-mocks.js',
    'angular-ui-router'  : '../lib/angular-ui-router.js',
    'statehelper'        : '../lib/statehelper.js',

    'spin'               : '../lib/spin.js',
    'angular-spinner'    : '../lib/angular-spinner.js',

    'loading-bar'        : '../lib/loading-bar.js',
    'json'               : '../lib/json.js',
    'text'               : '../lib/text.js',
    'resources.json'     : '../../resources.json'
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
    'statehelper'        : {format: 'global', deps: ['angular','angular-ui-router']},
    'angular-storage'    : {format: 'global', deps: ['angular']},

    'spin'               : {format: 'global'},
    'angular-spinner'    : {format: 'global', deps: ['angular', 'spin']}
  },

  // create aliases
  // SystemJS Plugins, referenced with "moduleName!pluginName"
  map: {
    //'json': '../lib/json',
    //'text': '../lib/text'
  }
});
