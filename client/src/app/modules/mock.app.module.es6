'use strict';
/*jshint esnext: true  */

import angular from 'angular';
import 'angular-mocks';

import appModule from './app.module';

let mockModule = angular.module('app.mock', [ appModule.name, 'ngMockE2E']);

mockModule.run(/*@ngInject*/ ($http, $httpBackend, $window, EXTERNAL_SERVICES) => {

        $window.services_are_mocked = true;

        let greetings = [
            {greeting: 'The sun is shining, go out and play!'},
            {greeting: 'One fine day for skipping through water puddles.'},
            {greeting: 'Boo!  Ha, gotcha!.'},
            {greeting: 'Whazzup?'},
            {greeting: 'Dude!'},
            {greeting: 'Yowza! Time to eat!'},
            {greeting: 'How\'s it hangin?'}
        ];

        let jwt = {
            valid: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsIm5iZiI6MTQyNDM5NzA0NSwiZXhwIjoxNDI0NDAwNjQ1LCJyb2xlcyI6WyJhZG1pbiJdfQ.O0ht/6QjMVqK68RzNCDYyDVEDZRSOFvougdJtlDVqQk",
            invalid: "eyJhbzI1NiJ9.eyJzdWA0NSwiZXhwIjoxNDI0NDAwNjQ1LCJybdfQ.O0ht/6QjMVqK68Rk"
        };

        let apiHost = `${EXTERNAL_SERVICES.hosts.api}/ver/api`;

        // 1)
        // un-authenticated request ask for greeting
        $httpBackend.whenGET(/\/api\/greeting/).respond( () => {
            // TODO: how to set the header: "Content-Type": "application/json"
            if (!$http.defaults.headers.common.Authorization) {
                let responseCode = 401;
                let responseData = {
                    'errors': [{
                        'message': 'Unauthorized',
                        'data': {'authenticationUrl': `${$window.location.origin}/#/redirect?returnTo=/greeting&pat=MockedOutPreAuthenticationToken&cruft={{redir}}`}
                    }]
                };
                return [ responseCode, responseData ];
            }
            let randomIndex = Math.floor(Math.random() * greetings.length);
            return [200, greetings[randomIndex]];
        });

        // 3) send pat to api to create jwt
        $httpBackend.whenPOST(/\/api\/jwt/).respond( () => {
            // headers: "Accept: application/json", "Content-Type: application/json"
            // data: {"pat": "badcab"}
            return [200, {jwt: jwt.valid}];
        });


        // cheat to see that we can view greetings.
        // authenticated request for greeting // TODO: Must include Authorization header
        $httpBackend.whenGET(/\/api\/greeting2/).respond( () => {
            let randomIndex = Math.floor(Math.random() * greetings.length);
            return [200, greetings[randomIndex]];
        });

    }
);
