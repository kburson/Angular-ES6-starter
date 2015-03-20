/**
 * @ngdoc controller
 * @name WelcomeController
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires cosntants
 * */

import 'common/constants/constants.module'; // 'APP_INFO'
import './welcome.tpl!text';

let welcomeController = class WelcomeController {

    /* @ngInject */
    constructor(APP_INFO) {
        this.info = APP_INFO;
    }

    get appName() {
        return this.info.name;
    }

}
welcomeController.$inject = ['APP_INFO'];
export default welcomeController;