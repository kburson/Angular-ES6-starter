'use strict';
/*jshint esnext: true */

import angular from 'angular';

import commonModule from 'modules/common/common.module';

import GreetingService    from './greeting/GreetingService';

import GreetingController from './greeting/GreetingController';
import WelcomeController  from './welcome/WelcomeController';


let homeModule = angular.module('home', [commonModule.name]);

homeModule.service(GreetingService.name, GreetingService);

homeModule.controller(GreetingController.name, GreetingController);
homeModule.controller(WelcomeController.name,  WelcomeController);


// .config()
// .run()

export default homeModule;
