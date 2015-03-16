'use strict';
/*jshint esnext: true */

import './GreetingService';

let controller = class GreetingController {

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

// I cannot 'export default class GreetingController = {...}' because I need to assure angular DI here.
controller.$inject = ['$state','GreetingService'];

export default controller;
