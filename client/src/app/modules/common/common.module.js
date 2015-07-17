'use strict';
/*jshint esnext: true */

import angular from 'angular';

import constantsModule  from './constants/constants.module';

import authenticationModule from './authentication/authentication.module';
import AuthenticationInterceptor from './authentication/AuthenticationInterceptor';
import redirectionModule from './redirection/redirection.module';

import masterPageModule from './masterPage/masterPage.module';

import MainTheme from './MainTheme';
// TODO:  How do we register the MD Theme ??


export default angular.module('common', [
    constantsModule.name,
    authenticationModule.name,
    redirectionModule.name,
    masterPageModule.name
])
.config( $httpProvider =>  {
    console.log("Register http interceptor");
    $httpProvider.interceptors.push(AuthenticationInterceptor.name);
})
.run( (/*$http,*/) =>  {
    //console.log('configure the http header defaults');
    //$http.defaults.headers.common['x-tw-data'] = 'proof I can set default header';
})
.run(MainTheme);


