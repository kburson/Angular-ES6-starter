<div layout="column" flex layout-fill>

    <section id="header-toolbar"
        ng-include="'common/masterTemplate/partials/header-toolbar.tpl'">
    </section>

    <section id="main-content"
             layout="row" flex layout-fill layout-align="start start">

        <div ng-include="'common/masterTemplate/partials/left-nav.tpl'"></div>

        <md-content flex class="md-padding">
            <div ui-view="content"></div>
        </md-content>

        <div ng-include="'common/masterTemplate/partials/right-nav.tpl'"></div>
    </section>

    <section id="footer-toolbar"
        ng-include="'common/masterTemplate/partials/footer-toolbar.tpl'">
    </section>

</div>
