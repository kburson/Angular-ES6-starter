import 'angular';
import 'angular-ui-router';

import constantsModule      from 'common/constants/constants.module';
import MasterPageController from './MasterPageController';
import masterPageTemplate   from './masterPage.tpl!text';


export default angular.module('masterPage', [
    'ui.router', constantsModule.name
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
