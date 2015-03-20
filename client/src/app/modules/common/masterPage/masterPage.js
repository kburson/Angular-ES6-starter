import 'angular';
import 'angular-ui-router';

import constantsModule      from './constants/constants.module';
import MasterPageController from './masterTemplate/MasterPageController';
import masterPageTemplate   from './masterPage.tpl!text';


export default angular.module('masterPage', [
    'ui.router'
  ])
  .config( ($stateProvider) => {
  $stateProvider.state('root', {
    abstract: true,
    views: {
      main: { // index.html defines 'ui-view='main''
        controller: MasterPageController.name,
        //templateUrl: 'common/masterTemplate/masterPage.tpl',
        template: masterPageTemplate,
        controllerAs: MasterPageController
      }
    }
  });
});
