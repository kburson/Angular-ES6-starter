'use strict';
/*jshint esnext: true */
/**
 * @ngdoc controller
 * @name app.common:AuthenticationController
 *
 * @description
 *
 * */

import 'angular'; // '$location'
import 'angular-ui-router'; // '$state', '$stateParams'
import './AuthenticationService';

let authenticationController = class AuthenticationController {

    /*@ngInject*/
    constructor($state, $stateParams, $location, AuthenticationService) {
        this.$state = $state;
        this.$location = $location;
        this.$stateParams = $stateParams;
        this.authenticationService = AuthenticationService;

        this.authenticate();
    }

    authenticate() {

        // send auth request with pre-auth-token to ver-api
        console.out('authenticate first');
        let promise = this.authenticationService.requestAuthToken(this.$stateParams.pat);
        let ctrl = this;
        promise.then( (data) => {
                // save the token in default headers
                this.authenticationService.authToken = data.jwt;

                console.out(`go to ${this.$stateParams.returnTo}`);

                // replace the path with the new path (state), and replace the remainder of the url with nothing.
                this.$location.replace()
                    .path(this.$stateParams.returnTo)
                    .search({});
            }
        );
    }
}

authenticationController.$inject = [
  '$state',
  '$stateParams',
  '$location',
  'AuthenticationService'
];


export default  authenticationController;