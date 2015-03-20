import 'angular';

import common             from 'common/common';

import AuthenticationController  from './AuthenticationController';
import AuthenticationService     from './AuthenticationService';
import AuthenticationInterceptor from './AuthenticationInterceptor';

export default angular.module('authentication', [ 'ui.router', common.name ])

  .service(AuthenticationService.name, AuthenticationService)

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
