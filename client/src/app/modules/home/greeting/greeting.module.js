import 'angular';
import 'angular-ui-router';

import commonModule             from 'common/common.module.js';

import template           from './greeting.tpl!text';
import GreetingController from './GreetingController.js';
import GreetingService    from './GreetingService.js';

export default angular.module('greeting', [ 'ui.router', commonModule.name ])

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
