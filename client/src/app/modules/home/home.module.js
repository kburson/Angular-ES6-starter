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

import greetingModule from './greeting/greeting.module';
import welcomeModule  from './welcome/welcome.module';

export default angular.module('home', [
  greetingModule.name,
  welcomeModule.name
])
// .config()
// .run()
