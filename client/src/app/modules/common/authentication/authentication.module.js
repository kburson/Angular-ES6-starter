import 'angular';
import 'angular-ui-router';
import 'angular-resource';
import 'angular-storage';

import constantsModule             from 'common/constants/constants.module.js';

import AuthenticationService     from './AuthenticationService.js';
import AuthenticationInterceptor from './AuthenticationInterceptor.js';
import AuthenticationController  from './AuthenticationController.js';

export default angular.module('authentication', [ 'ui.router', 'ngResource', 'angular-storage', constantsModule.name ])

  .service(AuthenticationService.name,       AuthenticationService)
  .service(AuthenticationInterceptor.name,   AuthenticationInterceptor)

  .controller(AuthenticationController.name, AuthenticationController)

  .config( $stateProvider => {
    $stateProvider.state('authenticate', {
      views: {
        main: {
          controller: AuthenticationController.name
        }
      },
      params: {returnTo:{}, pat: {}}
    })
  });
