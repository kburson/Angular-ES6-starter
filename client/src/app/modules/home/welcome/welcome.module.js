import 'angular';
import 'angular-ui-router';

import template          from './welcome.tpl!text';
import WelcomeController from './WelcomeController';

import commonModule      from 'common/common.module';

export default angular.module('welcome', [ 'ui.router', commonModule.name ])
.controller(WelcomeController.name,  WelcomeController)
.config( ($stateProvider) => {
  $stateProvider.state('root.home', {
    url: '/home',
    views: {
      content: {
        template: template,
        controller: WelcomeController.name,
        controllerAs: 'vm'
      }
    }
  });
});
