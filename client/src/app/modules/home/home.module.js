'use strict';
/*jshint esnext: true */
/**
 * @ngdoc module
 * @name home
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires
 * */

import 'angular';

import greetingModule from './greeting/greeting.module.js';
import welcomeModule  from './welcome/welcome.module.js';

export default angular.module('home', [
  greetingModule.name,
  welcomeModule.name
])
// .config()
// .run()
