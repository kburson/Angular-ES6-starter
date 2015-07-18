'use strict';
/*jshint esnext: true */

// importing class dependencies assure that they will be loaded before this class is constructed.
// even if angular.module handles all the dependency injection.

import 'angular-ui-router';
import 'statehelper';

import MasterTemplateController from './common/masterTemplate/MasterTemplateController';
import AuthenticationController from './common/authentication/AuthenticationController';
import RedirectionController    from './common/redirection/RedirectionController';
import WelcomeController        from './home/welcome/WelcomeController';
import GreetingController       from './home/greeting/GreetingController';

//import * as greeting from './home/greeting/GreetingController';

//import welcomeTemplate from './home/welcome/welcome.tpl!text';
//import masterTemplate from './common/masterTemplate/masterTemplate.tpl!text'


let appRouter = class AppRouter {
    /* ngInject */
    constructor($urlRouterProvider, $stateProvider, stateHelperProvider) {
        // setup router default state
        $urlRouterProvider.otherwise('/home');

        // This is a nested state that cannot be declared locally as each child state needs to be known up front.
        stateHelperProvider.state(
          {
            name: 'root',
            abstract: true,
            views: {
              main: { // index.html defines 'ui-view='main''
                controller: MasterTemplateController.name,
                templateUrl: 'common/masterTemplate/masterTemplate.tpl',
                //template: masterTemplate,
                controllerAs: 'masterTemplate'
              }
            },
            children: [
              {
                name: 'home',
                url: '/home',
                views: {
                  content: {
                    controller: WelcomeController.name,
                    templateUrl: 'home/welcome/welcome.tpl',
                    //template: welcomeTemplate,
                    controllerAs: 'vm'
                  }
                }
              },
              {
                name: 'greeting',
                url: '/greeting',
                views: {
                  content: {
                    controller: GreetingController.name,
                    templateUrl: 'home/greeting/greeting.tpl',
                    controllerAs: 'vm'
                    //template: greeting.template
                  }
                }
              }]
          }
        );


        $stateProvider
         .state('authenticate', {
             views: {
                 main: {
                     controller: AuthenticationController.name
                 }
             },
             params: {returnTo:{}, pat: {}}
         })
         .state('redirect', {
             url: '/redirect',
             views: {
                 main: {
                     controller: RedirectionController.name
                 }
             }
         });
    //    .state('load', {
    //        views: {
    //            main: {
    //                controller: 'LoadingBannerController',
    //                templateUrl: ''
    //            }
    //        },
    //        params: ['targetState']
    //    })
    //    .state('error', {
    //        views: {
    //            main: {
    //                controller: 'ErrorController',
    //                templateUrl: ''
    //            }
    //        },
    //        params: ['error']
    //    })
        console.log('routes have been configured');
    }
}

appRouter.$inject = ['$urlRouterProvider', '$stateProvider', 'stateHelperProvider'];

export default appRouter;
