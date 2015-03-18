/* eslint-env node, mocha, sinon, assert, moment */
'use strict';

/**
 * @module test.app
 * @name GreetingController
 * @description
 * Tests for GreetingController under Verifications
 * _Enter the test description._
 * */
import 'app.module';
import 'angular-mocks';

describe('Controller: app.home.GreetingController', function () {

    // load the controller's module
    beforeEach(angular.mock.module('home'));

    let ctrl, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller) {
        ctrl = $controller('GreetingController', {
            $scope: scope
        });
    }));

    it('should be defined', function () {
        expect(ctrl).toBeDefined();
    });
});
