'use strict';
/*jshint esnext: true */
import json from 'resources.json!';
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
.constant('EXTERNAL_SERVICES', json)
.constant('EXTERNAL_SERVICES_ARE_MOCKED', window.services_are_mocked === 'undefined' ? false : window.services_are_mocked);
