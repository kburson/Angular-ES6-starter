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

import commonModule from 'common/common.module';

import greetingModule from './greeting/greeting.module';
import welcomeModule  from './welcome/welcome.module';

export default angular.module('home', [
  commonModule.name,
  greetingModule.name,
  welcomeModule.name
])
// .config()
// .run()
