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

import constants  from './constants/constants';
import masterPage from './masterPage/masterPage';

import MainTheme from './MainTheme';
// TODO:  How do we register the MD Theme ??

import MasterPageController      from './masterPage/MasterPageController';

import AuthenticationService     from './authentication/AuthenticationService';
import AuthenticationInterceptor from './authentication/AuthenticationInterceptor';

import AuthenticationController  from './authentication/AuthenticationController';
import RedirectionController     from './redirection/RedirectionController';


export default angular.module('common', [
    constants.name,
    masterPage.name,
    'ui.router',
    'angular-storage',
    'ngCookies',
    'ngResource',
    'ngMessages',
    'ngAria',
    'ngAnimate',
    'ngMaterial',
    //'cfp.loadingBar'
])

.service(AuthenticationService.name,       AuthenticationService)
.service(AuthenticationInterceptor.name,   AuthenticationInterceptor)

.controller(AuthenticationController.name, AuthenticationController)
.controller(RedirectionController.name,    RedirectionController)
.controller(MasterPageController.name,     MasterPageController)

.config( $httpProvider =>  {
    console.out("Register http interceptor");
    $httpProvider.interceptors.push(AuthenticationInterceptor.name);
})

.run( (/*$http,*/) =>  {
    //console.out('configure the http header defaults');
    //$http.defaults.headers.common['x-tw-data'] = 'proof I can set default header';
})
.run(MainTheme);


