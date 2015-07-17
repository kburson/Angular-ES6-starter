'use strict';
/*jshint esnext: true */

import 'angular'; // '$q', '$window', '$location'
import 'common/constants/constants.module'; // 'EXTERNAL_SERVICES'

// this variable is defined in the global scope,
// but it will be wrapped in an AMD requirejs define statement
// creating a file local scope, making 'self' global only in this file.
let self;

let authenticationInterceptor = class AuthenticationInterceptor {

    /*@ngInject*/
    constructor($q, $window, $location, EXTERNAL_SERVICES) {
        self = this;
        self.$q = $q;
        self.$window = $window;
        self.$location = $location;
        self.EXTERNAL_SERVICES = EXTERNAL_SERVICES;
    }

    login(rejection) {
        let redirect_uri_template;
        for(let i=0,len = rejection.data.errors.length; i < len && !redirect_uri_template; i++) {
            let error = rejection.data.errors[i];
            if (error.data && error.data.authenticationUrl) {
                redirect_uri_template = error.data.authenticationUrl;
            }
        }

        let [baseUrl, view] = self.$location.absUrl().split('#');

        // now inject the {{redir}}_path back to us and the current state into the template
        let redirect_uri = self.EXTERNAL_SERVICES.resources.admin.authentication_params
            .replace('{client-host}',baseUrl)
            .replace('{view}', view);

        let authentication_url = redirect_uri_template.replace('{{redir}}', encodeURIComponent(redirect_uri));

        // TODO: When I am mocking, how do I not redirect
        console.log("--> redirect to: ", authentication_url);
        self.$window.location.replace(authentication_url);

        return self.$q.defer(rejection);
    }

    request(config) {
        if (config.url.indexOf('.tpl') < 0 ) {
            console.log(
            `request sent: [METHOD:"${config.method}", url:"${config.url}", headers:"${JSON.stringify(config.headers)}"]`
        );
        }
         return config;
    }

    responseError(rejection) {

        console.log(`request denied: [ status:${rejection.status}, errors:${JSON.stringify(rejection.data.errors)}]` );

        switch(rejection.status) {
            case 401:
                if (!rejection.headers.Authentication &&
                    rejection.data.errors &&
                    rejection.data.errors.length > 0) {
                    return self.login(rejection);
                }
                break;

            case 503:
                console.log(JSON.stringify(rejection));
                break;

            default:
                return self.$q.reject(rejection);
                break;
        }

        return self.$q.reject(rejection);
    }

}

authenticationInterceptor.$inject = [
  '$q',
  '$window',
  '$location',
  'EXTERNAL_SERVICES'
];

export default authenticationInterceptor;