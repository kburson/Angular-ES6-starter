'use strict';
/*jshint esnext: true */
/**
 * @ngdoc controller
 * @name GreetingController
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires GreetingService, $state
 * */

import 'angular-ui-router';
import './GreetingService';

export default class GreetingController {

    /* @ngInject */
    constructor($state, GreetingService) {

        this.$state = $state;
        this.greetingService = GreetingService;
        this.message = '...';
        this.user = {name: "Kendrick", title:"God"};
        this.getGreeting();
    }

    getGreeting() {
        this.greetingService.greetMe().then((response) => {
            this.message = response.greeting;
        });
    }

};
GreetingController.$inject = ['$state','GreetingService'];
