// all paths are relative to the location of index.html
startTimeOfApplicationLoading = Date.now();

// Identical to writing System.basURL - ...
System.config({
  baseURL: '/', //relative to index.html location
  paths: {
    'angular':          '/node_modules/angular/angular.min.js',
    'angular-ui-router':'/node_modules/angular-ui-router/release/angular-ui-router.min.js',
    'statehelper':      '/node_modules/angular-ui-router.statehelper/statehelper.min.js',
    'angular-animate':  '/node_modules/angular-animate/angular-animate.min.js',
    'angular-messages': '/node_modules/angular-messages/angular-messages.min.js',
    'angular-aria':     '/node_modules/angular-aria/angular-aria.min.js',
    'angular-resource': '/node_modules/angular-resource/angular-resource.min.js',
    'angular-cookies':  '/node_modules/angular-cookies/angular-cookies.min.js',
    'angular-storage':  '/node_modules/angular-storage/dist/angular-storage.min.js',
    'angular-material': '/node_modules/angular-material/angular-material.min.js',
    'loading-bar':      '/node_modules/angular-loading-bar/build/loading-bar.min.js',
    'angular-mocks':    '/node_modules/angular-mocks/angular-mocks.js',

    'json':             '/bower_components/plugin-json/json.js',

    'resources.json':   '/.build/resources.json'
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
