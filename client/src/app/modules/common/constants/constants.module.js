'use strict';
/*jshint esnext: true */
/**
 * @ngdoc module
 * @name constants
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires
 * */

 import angular from 'angular';

export default angular.module('constants',[])

.constant('APP_INFO', {
    name: 'Angular-ES6-Starter',
    version: window.clientVersion,
    states: {
        benign: ['home']
    }
})
.constant('EXTERNAL_SERVICES', window.resources)
.constant('MOCKED_SERVICES', window.services_are_mocked === 'undefined' ? false : window.services_are_mocked);
