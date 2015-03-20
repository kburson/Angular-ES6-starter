import 'angular';

import common            from 'common/common';

import template          from './welcome.tpl!text';
import WelcomeController from './WelcomeController';

export default angular.module('welcome', [ common.name ])
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
