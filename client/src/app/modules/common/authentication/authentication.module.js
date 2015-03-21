import 'angular';
import 'angular-ui-router';
import 'angular-resource';
import 'angular-storage';

import constantsModule             from 'common/constants/constants.module';

import AuthenticationService     from './AuthenticationService';
import AuthenticationInterceptor from './AuthenticationInterceptor';
import AuthenticationController  from './AuthenticationController';

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
