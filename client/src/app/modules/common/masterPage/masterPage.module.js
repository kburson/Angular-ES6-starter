import 'angular';
import 'angular-ui-router';
import 'angular-material';

import constantsModule      from 'common/constants/constants.module.js';
import MasterPageController from './MasterPageController.js';
import masterPageTemplate   from './masterPage.tpl!text';


export default angular.module('masterPage', [
    'ui.router', 'ngMaterial', constantsModule.name
  ])
  .controller(MasterPageController.name,     MasterPageController)
  .config( $stateProvider => {
  $stateProvider.state('root', {
    abstract: true,
    views: {
      main: { // index.html defines 'ui-view='main''
        controllerAs: 'mp',
        controller: MasterPageController.name,
        template: masterPageTemplate
      }
    }
  });
});
