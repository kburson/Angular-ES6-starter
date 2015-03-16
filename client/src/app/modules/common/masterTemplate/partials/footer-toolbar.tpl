<md-toolbar class="md-toolbar-tools md-toolbar-tools-bottom toolbar"
            layout="row" layout-align="start center">
    <md-button ng-click="masterTemplate.showBottomSheet($event)">
        <i class="fa fa-search" style="padding-right:10px; font-size:1.3em;"></i>Search
    </md-button>
    <md-button><i class="fa fa-check" style="padding-right:10px; font-size:1.3em;"></i>Today</md-button>
    <md-button><i class="fa fa-circle" style="padding-right:10px; font-size:1.3em;"></i>Yesterday</md-button>
    <md-button><i class="fa fa-circle-o" style="padding-right:10px; font-size:1.3em;"></i>History</md-button>

  <div ng-if="masterTemplate.mocked" style="float:right; color:red">External Services are Mocked</div>


</md-toolbar>
