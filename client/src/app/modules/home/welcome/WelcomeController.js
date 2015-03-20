/**
 * @ngdoc controller
 * @name WelcomeController
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires cosntants
 * */

import 'common/constants/constants'; // 'APP_INFO'
import './welcome.tpl';

export default class WelcomeController {

    /* @ngInject */
    constructor(APP_INFO) {
        this.info = APP_INFO;
    }

    get appName() {
        return this.info.name;
    }

};
WelcomeController.$inject = ['APP_INFO'];
