'use strict';
/*jshint esnext: true */

import angular from 'angular';

import 'angular-ui-router'; // '$state', '$urlRouterProvider'

import commonModule from './common/common.module';
import homeModule   from './home/home.module';

export default angular.module('app', [
    'ui.router',
    commonModule.name,
    homeModule.name
])
.config( $urlRouterProvider => {
  $urlRouterProvider.otherwise('/home');
})
.run(($window, $rootScope, $state, APP_INFO) => {

    // if state changes, check if we are logged in.
    $rootScope.$on('$STATE_CHANGE', (event, toState, toParams, fromState) => {

        // When we try to change state (go to a new page or view)
        if ((!$window || !$window.userInformation || !$window.userInformation.authToken) &&
            toState.name !== APP_INFO.states.benign[0]) {

            // The requested state requires an authorized login. Set an event handler to wait for it.
            $rootScope.$on('AUTHORIZED_TOKEN_RECEIVED', () => {
                $state.go(toState, toParams);
            });

            // in case no event received, then go to the benignState
            if ($state.is('') && toState.name !== 'redirect' && toState.name !== 'authCode') {
                $state.go(APP_INFO.states.benign[0]);
                event.preventDefault();
            }
        }
    });

    $window.clientVersion = $window.clientVersion || 'LOCAL';

    console.out('App has been initialized');

    let loadTime = Date.now() - startTimeOfApplicationLoading;
    console.out(`Total time to load application ${loadTime / 1000} seconds`);
});
