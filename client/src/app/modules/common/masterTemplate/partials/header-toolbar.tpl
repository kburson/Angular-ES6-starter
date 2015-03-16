<md-toolbar class="md-toolbar-tools md-toolbar-tools-top toolbar"
            layout="row" layout-fill-horizontal layout-align="start center">

    <img src="/favicon.png" style="height:32px; width:32px; margin-right:10px;"/>

    <md-button class="md-raised menu-button" aria-label="Home" ng-disabled="masterTemplate.isState('home')"
               ng-click="masterTemplate.goToState('home')">
        <i class="fa fa-home">
            <md-tooltip>Go Home</md-tooltip>
        </i> Home
    </md-button>

    <md-button class="md-raised menu-button" ng-disabled="false" aria-label="File">File</md-button>
    <md-button class="md-raised menu-button" ng-disabled="false" aria-label="Edit">Edit</md-button>
    <md-button class="md-raised menu-button" ng-disabled="false" aria-label="View">View</md-button>

    <md-button class="md-raised menu-button" aria-label="greeting" ng-disabled="masterTemplate.isState('greeting')"
               ng-click="masterTemplate.goToState('greeting')" >
        <i class="fa fa-comment-o">
            <md-tooltip md-delay="600" md-direction="top">Get Greeting</md-tooltip>
        </i>
    </md-button>

    <md-button class="md-raised menu-button" aria-label="logout"  style="float:right;"
               ng-if="masterTemplate.isLoggedIn()"
               ng-click="masterTemplate.logout()" >
        <i class="fa fa-lock">
            <md-tooltip>Logout</md-tooltip>
        </i> Logout
    </md-button>


</md-toolbar>
