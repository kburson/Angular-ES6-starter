import angular from 'npm/angular/angular.min';

if (__TESTING__ || __MOCKED__) {
  require('npm/angular-mocks/angular-mocks.min');
}
if (__MOCKED__) {
  const mainModule = require('./modules/mock.app.module.es6');
} else {
  const mainModule = require('./modules/app.module.es6');
}

console.log("finished loading " + mainModule.name);

// Bootstrap the app -- TODO: Is this needed with WebPack ?
angular.element(document).ready(
  function () {
    angular.bootstrap(document, [mainModule.name]);
  }
);
