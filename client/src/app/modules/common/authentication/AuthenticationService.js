'use strict';
/*jshint esnext: true */
/**
 * @ngdoc service
 * @name app.common:AuthenticationService
 *
 * @description
 *
 * @requires
 * */

import 'angular'; // '$http'
import 'angular-resource'; // '$resource
import 'angular-storage';  // 'store'

import 'common/constants/constants'; //'EXTERNAL_SERVICES'

export default class AuthenticationService {

  /*@ngInject*/
  constructor($http, $resource, store, EXTERNAL_SERVICES) {
    this.$http = $http;
    this.store = store;
    this.authTokenService = $resource(`${EXTERNAL_SERVICES.hosts.api}${EXTERNAL_SERVICES.resources.api.createToken}`);
    //'https://apps.host/ver/api/jwt');

    this.user = {};
  }

  get authToken() {
    let token =this.$http.defaults.headers.common['Authorization'];
    if (!token) {
      token = this.store.get('authToken');
      if (token) {
        this.authToken = token;
      }
    }
    return token;
  }

  set authToken(token) {
    this.store.set('authToken', token);
    return this.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  deleteToken() {
    this.$http.defaults.headers.common['Authorization'] = null;
    delete this.$http.defaults.headers.common['Authorization'];
    this.store.remove('authToken');
  }

  deleteUser() {
    delete this.user;
    this.user = {};
  }

  requestAuthToken(pre_authentication_token) {
    // $http call to ver-api
    let token = new this.authTokenService();
    token.pat = pre_authentication_token;
    return token.$save();
  }

  isLoggedIn() {
    return !!this.authToken;
  }

  logout() {
    this.deleteToken();
    this.deleteUser();
  }
};

AuthenticationService.$inject = [
  '$http',
  '$resource',
  'store',
  'EXTERNAL_SERVICES'];

