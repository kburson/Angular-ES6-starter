<div layout="column" flex layout-fill>

    <section id="header-toolbar">
      <md-toolbar class="md-toolbar-tools md-toolbar-tools-top toolbar"
                  layout="row" layout-fill-horizontal layout-align="start center">

        <img src="img/angular.jpg" style="height:32px; width:32px; margin-right:10px;"/>

        <md-button class="md-raised menu-button" aria-label="Home" ng-disabled="mp.isState('home')"
                   ng-click="mp.goToState('home')">
          <i class="fa fa-home">
            <md-tooltip>Go Home</md-tooltip>
          </i> Home
        </md-button>

        <md-button class="md-raised menu-button" ng-disabled="false" aria-label="File">File</md-button>
        <md-button class="md-raised menu-button" ng-disabled="false" aria-label="Edit">Edit</md-button>
        <md-button class="md-raised menu-button" ng-disabled="false" aria-label="View">View</md-button>

        <md-button class="md-raised menu-button" aria-label="greeting" ng-disabled="mp.isState('greeting')"
                   ng-click="mp.goToState('greeting')" >
          <i class="fa fa-comment-o">
            <md-tooltip md-delay="600" md-direction="top">Get Greeting</md-tooltip>
          </i>
        </md-button>

        <md-button class="md-raised menu-button" aria-label="logout"  style="float:right;"
                   ng-if="mp.isLoggedIn()"
                   ng-click="mp.logout()" >
          <i class="fa fa-lock">
            <md-tooltip>Logout</md-tooltip>
          </i> Logout
        </md-button>
      </md-toolbar>
    </section>

    <section id="main-content"
             layout="row" flex layout-fill layout-align="start start">

        <div>

          <div class="md-whiteframe-z2 nav-control"
               layout="row" layout-align="center start"
               ng-if="!mp.navState.left.open"
               ng-click="mp.toggleSideNav('left')"
            >
            <i class="fa fa-bars" ng-click="mp.toggleSideNav('left')"></i>
          </div>

          <md-sidenav class="md-sidenav-left md-whiteframe-z2 left-nav "
                      md-component-id="leftNav"
                      md-is-open="mp.navState.left.open"
                      md-is-locked-open="mp.navState.left.locked"
                      style="padding: 5px 5px 5px 5px;">
            <div hide-md show-gt-md layout="column" style="padding: 5px 5px 5px 5px;">

              <div class="nav-item">Menu
                <i class="fa fa-bars nav-detail-icon" ng-click="mp.toggleSideNav('left')"></i>
              </div>

              <md-divider style="margin:0 0 1em 0;"></md-divider>

              <div style="color:blue">
                <div class="nav-item">
                  <i class="fa fa-file-text-o nav-icon"></i>
                  Notes
                  <i class="fa fa-chevron-circle-right nav-detail-icon"></i>
                </div>
                <div class="nav-item">
                  <i class="fa fa-file-excel-o nav-icon"></i>
                  Additional Info
                  <i class="fa fa-chevron-circle-right nav-detail-icon" ></i>
                </div>
                <div class="nav-item">
                  <i class="fa fa-floppy-o nav-icon"></i>
                  Attached Files
                </div>
                <div class="nav-item">
                  <i class="fa fa-book nav-icon"></i>
                  System Log
                </div>
                <div class="nav-item">
                  <i class="fa fa-folder-o nav-icon"></i>
                  App Log
                </div>
              </div>

              <md-divider style="margin:0 0 1em 0;"></md-divider>

            </div>
          </md-sidenav>

        </div>

        <md-content flex class="md-padding">
            <div ui-view="content"></div>
        </md-content>

        <div>
          <div class="md-whiteframe-z2 nav-control" layout="row" layout-align="center start"
               ng-click="mp.toggleSideNav('right')"
               ng-if="!mp.navState.right.open" >
            <i class="fa fa-bars" ng-click="mp.toggleSideNav('right')"></i>
          </div>

          <md-sidenav flex="25" class="md-sidenav-right  md-whiteframe-z2 right-nav"
                      md-component-id="rightNav"
                      md-is-locked-open="mp.navState.right.locked"
                      md-is-open="mp.navState.right.open">
            <i style="float:right;" class="fa fa-bars" ng-click="mp.toggleSideNav('right')"></i>

            <div style="color:black; margin-left:10px;">
              <p>
                <span style="font-size:1.1em; font-weight: 400">Contact Information:</span>
              </p>

              <p style=" height:60px;">
                <span style="font-size:1.1em; font-weight: 400;">Talentwise</span>
              </p>

              <p>
                <span style="font-size:1.4em; font-weight: 700">Actions</span>
              </p>
            </div>
            <md-divider></md-divider>
            <div style="color: blue;">
              <div layout="row" style="padding-left: 10px; padding-top:15px"><i  flex="5" class="fa fa-arrow-up" style="margin-right:10px;"></i>Verification</div>
              <div layout="row" style="padding-left: 10px; padding-top:15px;"><i flex="5" class="fa fa-envelope-o" style="margin-right:10px;"></i>Email Candidate</div>
              <div layout="row" style="padding-left: 10px; padding-top:15px;"><i flex="5" class="fa fa-caret-down" style="margin-right:10px; font-size:1.5em;"></i>Email Client</div>
              <div layout="row" style="padding-left: 10px; padding-top:12px;"><i flex="5" class="fa fa-fax" style="margin-right:10px;"></i>Fax</div>
              <div layout="row" style="padding-left: 10px; padding-top:15px;"><i flex="5" class="fa fa-folder-open" style="margin-right:10px;"></i>Request Docs</div>
            </div>

          </md-sidenav>
        </div>
    </section>

    <section id="footer-toolbar">
      <md-toolbar class="md-toolbar-tools md-toolbar-tools-bottom toolbar"
                  layout="row" layout-align="start center">
        <md-button ng-click="mp.showBottomSheet($event)">
          <i class="fa fa-search" style="padding-right:10px; font-size:1.3em;"></i>Search
        </md-button>
        <md-button><i class="fa fa-check" style="padding-right:10px; font-size:1.3em;"></i>Today</md-button>
        <md-button><i class="fa fa-circle" style="padding-right:10px; font-size:1.3em;"></i>Yesterday</md-button>
        <md-button><i class="fa fa-circle-o" style="padding-right:10px; font-size:1.3em;"></i>History</md-button>

        <div ng-if="mp.mocked" style="float:right; color:red">External Services are Mocked</div>

      </md-toolbar>
    </section>

</div>
