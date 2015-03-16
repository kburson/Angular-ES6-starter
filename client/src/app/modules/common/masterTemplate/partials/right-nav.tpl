<div class="md-whiteframe-z2 nav-control" layout="row" layout-align="center start"
     ng-click="masterTemplate.toggleSideNav('right')"
     ng-if="!masterTemplate.navState.right.open" >
    <i class="fa fa-bars" ng-click="masterTemplate.toggleSideNav('right')"></i>
</div>

<md-sidenav flex="25" class="md-sidenav-right  md-whiteframe-z2 right-nav"
            md-component-id="rightNav"
            md-is-locked-open="masterTemplate.navState.right.locked"
            md-is-open="masterTemplate.navState.right.open">
    <i style="float:right;" class="fa fa-bars" ng-click="masterTemplate.toggleSideNav('right')"></i>

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