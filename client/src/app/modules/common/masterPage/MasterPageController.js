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

// only import to define as q dependency
import './masterPage.tpl!text';
import 'common/authentication/AuthenticationService';
import 'common/constants';

import bottomSheet from './bottom-sheet.tpl!text';


export default class MasterPageController {

    /* @ngInject */
    constructor($state, $mdSidenav, $mdBottomSheet, AuthenticationService, MOCKED_SERVICES) {
        this.$state = $state;
        this.$mdSidenav = $mdSidenav;
        this.$mdBottomSheet = $mdBottomSheet;
        this.mocked = window.services_are_mocked;
        this.authenticationService = AuthenticationService;
        this.navState = {
            left: {open: true, locked: true},
            right: {open: false, locked: false}
        };
    }

    toggleSideNav(edge="right") {
        let nav = this.navState[edge];
        nav.locked = false;
        this.$mdSidenav(`${edge}Nav`).toggle()
            .then( () => {
                nav.locked = nav.open;
                console.out(`${edge} side nav has been toggled`,{"color":"red"});
            });
    }

    openSideNav(edge="right") {
        this.$mdSidenav(`${edge}Nav`).open()
            .then( () => {
                console.out(`${edge} side nav has been opened`,{"color":"red"});
            });
    }
    closeSideNav(edge="right") {
        this.$mdSidenav(`${edge}Nav`).close()
            .then( () => {
                console.out(`${edge} side nav has been closed`,{"color":"red"});
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
};
MasterPageController.$inject = ['$state', '$mdSidenav', '$mdBottomSheet', 'AuthenticationService', 'MOCKED_SERVICES'];