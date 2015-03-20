'use strict';
/*jshint esnext: true */
/**
 * @ngdoc controller
 * @name app.common:RedirectionController
 *
 * @description
 *
 * */

import 'angular';            // '$location', '$window'
import 'angular-ui-router';  // '$state'

export default class RedirectionController {

    /* @ngInject */
    constructor($state, $location, $window)
    {
        if ($location.search().pat && $location.search().returnTo) {
            let params = { pat: $location.search().pat, returnTo: $location.search().returnTo };
            console.out( `redirect to state: ${$location.search().returnTo}, params: ${JSON.stringify(params)}`);

            $state.go('authenticate', params);
        }
    }
};

RedirectionController.$inject = ['$state','$location', '$window'];
