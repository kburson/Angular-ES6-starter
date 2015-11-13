import 'angular';
import 'angular-ui-router';

import template          from './welcome.tpl!text';
import WelcomeController from './WelcomeController.js';

import commonModule      from 'common/common.module.js';

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
