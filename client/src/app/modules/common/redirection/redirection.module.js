import 'angular';
import 'angular-ui-router';

import RedirectionController  from './RedirectionController';

export default angular.module('redirection', [ 'ui.router' ])

  .controller(RedirectionController.name, RedirectionController)

  .config( $stateProvider => {
    $stateProvider.state('redirect', {
      url: '/redirect',
      views: {
        main: {
          controller: RedirectionController.name
        }
      }
    })
  });
