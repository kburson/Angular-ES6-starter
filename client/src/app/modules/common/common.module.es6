'use strict';
/*jshint esnext: true */

import angular from 'angular';

import 'angular-resource';
import 'angular-messages';
import 'angular-aria';
import 'angular-animate';
import 'angular-material';
//import 'loading-bar';
import 'angular-storage';
import 'angular-cookies';

import templatesModule from './templates/templates.module';
import constantsModule from './constants/constants.module';


let commonModule = angular.module('common', [
    'ngCookies',
    'angular-storage',
    //'cfp.loadingBar',
    constantsModule.name,
    templatesModule.name,
    'ngResource',
    'ngMessages',
    'ngAria',
    'ngAnimate',
    'ngMaterial'
]);

// We import and register the common module objects here so they are registered as dependencies
// in the common.module definition, thus they will be assured to be loaded during the declaration phase
// for the common.module, therefore we only need to reference the app.common.module from the app.module
// the rest of the dependencies come along for the ride.


import MainTheme from './MainTheme';
// TODO:  How do we register the MD Theme ??

import AuthenticationService from './authentication/AuthenticationService';
import AuthenticationInterceptor from './authentication/AuthenticationInterceptor';

import MasterTemplateController from './masterTemplate/MasterTemplateController';
import AuthenticationController from './authentication/AuthenticationController';
import RedirectionController from './redirection/RedirectionController';

// This value is editable (we will change if we are mocking.

commonModule.service(AuthenticationService.name, AuthenticationService);
commonModule.service(AuthenticationInterceptor.name, AuthenticationInterceptor);

commonModule.controller(MasterTemplateController.name, MasterTemplateController);
commonModule.controller(AuthenticationController.name, AuthenticationController);
commonModule.controller(RedirectionController.name, RedirectionController);


commonModule.config( $httpProvider =>  {
    console.out("Register http interceptor");
    $httpProvider.interceptors.push(AuthenticationInterceptor.name);
});

commonModule.run( (/*$http,*/) =>  {
    //console.out('configure the http header defaults');
    //$http.defaults.headers.common['x-tw-data'] = 'proof I can set default header';
});

commonModule.run(MainTheme);

export default commonModule;

