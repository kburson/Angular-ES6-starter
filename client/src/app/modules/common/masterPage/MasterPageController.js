'use strict';
/*jshint esnext: true */
/**
 * @ngdoc controller
 * @name app.common:MasterTemplateController
 *
 * @description
 * _Please update the description and dependencies._
 *
 * */
import 'angular-aria';
import 'angular-animate';
import 'angular-material';
import 'spin';
import 'angular-spinner';

// only import to define as a dependency
import 'common/constants/constants.module';
import 'common/authentication/AuthenticationService';
import './masterPage.tpl!text';

import bottomSheet from './bottom-sheet.tpl!text';


let masterPageController = class MasterPageController {

    /* @ngInject */
    constructor($state, $mdSidenav, $mdBottomSheet, $timeout, usSpinnerService, AuthenticationService, EXTERNAL_SERVICES_ARE_MOCKED) {
        this.$state = $state;
        this.$mdSidenav = $mdSidenav;
        this.$mdBottomSheet = $mdBottomSheet;
        this.mocked = window.services_are_mocked;
        this.authenticationService = AuthenticationService;
        this.navState = {
            left: {open: true, locked: true},
            right: {open: false, locked: false}
        };

      this.spinnerOptions = {
        radius: 30,
        width: 8,
        length: 16,
        corners: 0.7,
        shadow: true,
        zIndex: 1000,
        trail: 100,
        speed: 1.0,
        opacity: 0.2,
        color: "#CCDDEE",
        scale: 3.75
      };

      usSpinnerService.spin('master-spinner');
      $timeout( () => {
        usSpinnerService.stop('master-spinner');
      },10000);

    }

    toggleSideNav(edge="right") {
        let nav = this.navState[edge];
        nav.locked = false;
        this.$mdSidenav(`${edge}Nav`).toggle()
            .then( () => {
                nav.locked = nav.open;
                console.log(`${edge} side nav has been toggled`,{"color":"red"});
            });
    }

    openSideNav(edge="right") {
        this.$mdSidenav(`${edge}Nav`).open()
            .then( () => {
                console.log(`${edge} side nav has been opened`,{"color":"red"});
            });
    }
    closeSideNav(edge="right") {
        this.$mdSidenav(`${edge}Nav`).close()
            .then( () => {
                console.log(`${edge} side nav has been closed`,{"color":"red"});
            });
    }
    showBottomSheet($event) {
        this.$mdBottomSheet.show({
           template: bottomSheet
        });
    }

    isState(value) {
        return this.$state.is(`root.${value}`);
    }

    goToState(value) {
        this.$state.go(`root.${value}`);
    }

    isLoggedIn() {
        return this.authenticationService.isLoggedIn();
    }

    logout() {
        this.authenticationService.logout();
        this.$state.go('root.home');
    }
}
masterPageController.$inject = ['$state', '$mdSidenav', '$mdBottomSheet', '$timeout', 'usSpinnerService', 'AuthenticationService', 'EXTERNAL_SERVICES_ARE_MOCKED'];

export default masterPageController;