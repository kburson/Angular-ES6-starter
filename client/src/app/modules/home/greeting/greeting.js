import 'angular';

import common             from 'common/common';

import template           from './greeting.tpl!text';
import GreetingController from './GreetingController';
import GreetingService    from './GreetingService';

export default angular.module('welcome', [ common.name ])

  .service(GreetingService.name, GreetingService)

  .controller(GreetingController.name, GreetingController)

  .config( $stateProvider => {
    $stateProvider.state('root.greeting', {
      url: '/greeting',
      views: {
        content: {
          template: template,
          controller: GreetingController.name,
          controllerAs: 'vm'
        }
      }
    });
  });
