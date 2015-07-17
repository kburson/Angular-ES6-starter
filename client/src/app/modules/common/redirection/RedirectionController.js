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

let redirectionController = class RedirectionController {

    /* @ngInject */
    constructor($state, $location, $window)
    {
        if ($location.search().pat && $location.search().returnTo) {
            let params = { pat: $location.search().pat, returnTo: $location.search().returnTo };
            console.log( `redirect to state: ${$location.search().returnTo}, params: ${JSON.stringify(params)}`);

            $state.go('authenticate', params);
        }
    }
}

redirectionController.$inject = ['$state','$location', '$window'];
export default redirectionController;