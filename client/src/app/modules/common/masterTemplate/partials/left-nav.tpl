
<div class="md-whiteframe-z2 nav-control"
     layout="row" layout-align="center start"
     ng-if="!masterTemplate.navState.left.open"
     ng-click="masterTemplate.toggleSideNav('left')"
    >
    <i class="fa fa-bars" ng-click="masterTemplate.toggleSideNav('left')"></i>
</div>

<md-sidenav class="md-sidenav-left md-whiteframe-z2 left-nav "
            md-component-id="leftNav"
            md-is-open="masterTemplate.navState.left.open"
            md-is-locked-open="masterTemplate.navState.left.locked"
            style="padding: 5px 5px 5px 5px;">
    <div hide-md show-gt-md layout="column" style="padding: 5px 5px 5px 5px;">

        <div class="nav-item">Menu
            <i class="fa fa-bars nav-detail-icon" ng-click="masterTemplate.toggleSideNav('left')"></i>
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
