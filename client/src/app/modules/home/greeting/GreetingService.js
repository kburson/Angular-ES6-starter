'use strict';
/*jshint esnext: true */
/**
 * @ngdoc service
 * @name app.common:GreetingService
 *
 * @description
 *
 * @requires
 * */

import 'angular-mocks';
import 'angular-resource';

let greetingService = class GreetingService {

    /* @ngInject */
    constructor($resource, EXTERNAL_SERVICES) {
        this.resource = $resource(`${EXTERNAL_SERVICES.hosts.api}${EXTERNAL_SERVICES.resources.api.greeting}`);
        //'https://apps.host/ver/api/greeting');
    }

    greetMe() {
        return this.resource.get({}).$promise;
    }
}

greetingService.$inject = ['$resource','EXTERNAL_SERVICES'];
export default greetingService;
