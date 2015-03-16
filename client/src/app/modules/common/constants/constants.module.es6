'use strict';
/*jshint esnext: true */

import angular from 'angular';

let constantsModule = angular.module('constants',[]);

constantsModule.constant('APP_INFO', {
    name: 'Angular-ES6-Starter',
    version: window.clientVersion,
    states: {
        benign: ['home']
    }
});

constantsModule.constant('EXTERNAL_SERVICES', window.resources);
constantsModule.constant('MOCKED_SERVICES', window.services_are_mocked === 'undefined' ? false : window.services_are_mocked);

export default constantsModule;
