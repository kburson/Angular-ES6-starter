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

import common from 'common/common';

import greeting from './greeting/greeting';
import welcome  from './welcome/welcome';

export default angular.module('home', [
  common.name,
  greeting.name,
  welcome.name
])
// .config()
// .run()
