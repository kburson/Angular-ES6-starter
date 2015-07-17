// ####################################################
var styleFolder = DIR.build + '/css';
var imgFolder = DIR.build + '/img';
var fontFolder = DIR.build + '/fonts';
var languageFolder = DIR.build + '/l10n';
var libFolder = DIR.build + '/js/lib';
var mockDataFolder = DIR.build + '/mocks';

gulp.task('copy', ['copy-vendor', 'copy-assets', 'copy-config', 'copy-html'], function (done) {
  done();
});


gulp.task('copy-config', function () {
  return gulp.src([
    'system.config.js'
    , 'bootstrap.js'
  ], {cwd: 'client/src/app'})
    .pipe($.newer(DIR.build + '/js'))
    //.pipe($.print())
    .pipe(gulp.dest(DIR.build + '/js'));
});

gulp.task('copy-html', function() {
  var html = gulp.src([
    '*.html',
    '!index.html'
  ], {cwd: 'client/src/app/'})
    .pipe($.newer(DIR.build))
    //.pipe($.print())
    .pipe(gulp.dest(DIR.build));

  var tpl = gulp.src([
    '**/*.tpl'
  ], {cwd: 'client/src/app/'})
    .pipe($.newer(DIR.build))
    //.pipe($.print())
    .pipe(gulp.dest(DIR.build + '/js/'));

  return eventStream.concat(html, tpl);

});

/*
 VENDOR Assets:  img, fonts, favicon
 */

gulp.task('copy-assets', function () {
  var favicon = gulp.src('favicon.png', {cwd: 'client/assets/img/icons'})
    .pipe($.newer(DIR.build))
    //.pipe($.print())
    .pipe(gulp.dest(DIR.build));

  var apache = gulp.src('.htaccess', {cwd: 'client/assets'})
    .pipe($.newer(DIR.build))
    //.pipe($.print())
    .pipe(gulp.dest(DIR.build));

  var images = gulp.src(['**/*', '!**/*.md', '!**/favicon.png'], {cwd: 'client/assets/img'})
    .pipe($.newer(imgFolder))
    //.pipe($.print())
    .pipe(gulp.dest(imgFolder));

  var l10n = gulp.src('**/*.json', {cwd: 'client/assets/l10n'})
    .pipe($.newer(languageFolder))
    //.pipe($.print())
    .pipe(gulp.dest(languageFolder));

  var mockData = gulp.src('**/*.*', {cwd: 'client/assets/mocks'})
    .pipe($.newer(mockDataFolder))
    //.pipe($.print())
    .pipe(gulp.dest(mockDataFolder));

  return eventStream.concat(favicon, apache, images, l10n, mockData);

});

/*

 VENDOR Assets: fonts, css, svg, js

 */
gulp.task('copy-vendor', function () {

  var iconStyleFolder = styleFolder + '/icons';
  var iconFolder = imgFolder + '/icons';

  var mockData = gulp.src(['client/src/app/components/mock.data.json'])
    .pipe(gulp.dest(DIR.build + '/js/components/'));

  var vendorFonts = gulp.src([
    'font-awesome/fonts/*.?(otf)?(eot)?(ttf)?(woff)?(woff2)?(svg)'
    //,'angular-ui-grid/*.?(ttf)?(woff)?(eot)'
  ], {cwd: 'bower_components'})
    //.pipe($.print())
    .pipe($.newer(fontFolder))
    //.pipe($.print())
    .pipe(gulp.dest(fontFolder));


  var vendorCss = gulp.src([
    'bower_components/angular-dropdowns/dist/angular-dropdowns.css',
    'bower_components/font-awesome/css/font-awesome.min.css?(.map)',
    'bower_components/angular-busy/dist/angular-busy.min.css',
    'bower_components/angular-material/angular-material.min.css',
    'bower_components/angular-toastr/dist/angular-toastr.min.css',
    'bower_components/normalize.css/normalize.css',  // TODO: use modernizr instead ?
    'bower_components/angular-pickadate/dist/angular-pickadate.css',
    //'ng-popup/dist/ngPopupStyle.css',
    'node_modules/animate.css/animate.css'
  ])
    //.pipe($.print(function(path) {return "<---- copy: " + path;}))
    .pipe($.flatten())
    .pipe($.newer(styleFolder))
    .pipe($.cssUrlAdjuster({replace: ['ui-grid.', '../fonts/ui-grid.']}))
    .pipe(gulp.dest(styleFolder));


  // TODO: Use svg icons instead of font-awesome

  //// ./css/icons
  //var vendorIconCss = gulp.src([
  //  'material-design-icons/sprites/svg-sprite/*.?(css)?(svg)'
  //], {cwd: 'bower_components'})
  //  .pipe($.flatten())
  //  .pipe($.newer(iconStyleFolder))
  //  .pipe(gulp.dest(iconStyleFolder));


  //// ./img/icons/
  //var vendorIcons = gulp.src([
  //  'angular-ui-grid/*.svg'
  //], {cwd: 'bower_components'})
  //  .pipe($.newer(iconFolder))
  //  //.pipe($.print())
  //  .pipe(gulp.dest(iconFolder));


  // ./js/lib/
  var vendorLibs = $.merge(
    gulp.src([
        , 'angular-post-message/dist/angular-post-message?(.min).js'
        , 'ng-onload/release/ng-onload.min.js'
        , 'sprintf/lib/sprintf.js'
        , 'traceur/bin/traceur-runtime.js'
        , 'systemjs/dist/system.?(src.)js?(.map)'
        , 'es6-module-loader/dist/es6-module-loader.?(src.)js?(.map)'
        , 'ng-file-upload/dist/*.js'
        , 'spin.js/spin?(.min).js'
        , 'angular-spinner/angular-spinner?(.min).js?(.map)'
        , 'angular-ui-router.statehelper/statehelper?(.min).js'
        // , 'angular-loading-spinner/angular-loading-spinner.js'
        , 'jquery/dist/jquery?(.min).js'
      ]
      , {cwd: 'node_modules'}),

    gulp.src([

      // ### without minified version  ###
      //,'angular/angular.js?(.map)'
      //,'angular-ui-router/release/angular-ui-router.js?(.map)'
      //,'angular-mocks/angular-mocks.js?(.map)'
      //,'angular-animate/angular-animate.js?(.map)'
      //,'angular-messages/angular-messages.js?(.map)'
      //,'angular-aria/angular-aria.js?(.map)'
      //,'angular-resource/angular-resource.js?(.map)'
      //,'angular-cookies/angular-cookies.js?(.map)'
      // ,'angular-storage/dist/angular-storage.js?(.map)'
      //,'angular-material/angular-material.js?(.map)'
      //,'angular-loading-bar/build/loading-bar.js?(.map)'
      //,'angular-busy/dist/angular-busy.js?(.map)'
      //,'angular-dropdowns/dist/angular-dropdowns.js'
      //,'angular-translate/angular-translate.js'
      //,'ngdatepicker/dist/ng-quick-date.js'

      , 'lodash/lodash?(.min).js?(.map)'
      , 'angular/angular?(.min).js?(.map)'
      , 'angular-mocks/angular-mocks?(.min).js?(.map)'
      , 'angular-animate/angular-animate?(.min).js?(.map)'
      , 'angular-messages/angular-messages?(.min).js?(.map)'
      , 'angular-aria/angular-aria?(.min).js?(.map)'
      , 'angular-resource/angular-resource?(.min).js?(.map)'
      , 'angular-sanitize/angular-sanitize?(.min).js?(.map)'
      , 'angular-cookies/angular-cookies?(.min).js?(.map)'
      , 'angular-material/angular-material?(.min).js?(.map)'
      , 'a0-angular-storage/dist/angular-storage?(.min).js?(.map)'
      , 'angular-loading-bar/build/loading-bar?(.min).js?(.map)'
      , 'angular-busy/dist/angular-busy?(.min).js?(.map)'
      , 'angular-dropdowns/dist/angular-dropdowns?(.min).js'
      , 'angular-toastr/dist/angular-toastr?(.tpls)?(.min).js'
      , 'angular-ui-router/release/angular-ui-router?(.min).js?(.map)'
      //,'angular-ui-grid/ui-grid?(.min).js?(.map)'
      //,'ngdatepicker/dist/ng-quick-date?(.min).js'
      //,'ng-popup/dist/ngPopup?(.min).js'
      , 'angular-translate/angular-translate?(.min).js'
      , 'angular-translate-loader-static-files/angular-translate-loader-static-files?(.min).js'

      , 'fast-json-patch/dist/json-patch-duplex.min.js'
      , 'moment/min/moment-with-locales.min.js'

      //, 'flow.js/dist/flow.(min.)?js'
      //, 'ng-flow/dist/ng-flow.(min.)?js'
      //, 'ng-flow/dist/ng-flow-standalone?(.min).js'
      , 'angular-pickadate/dist/angular-pickadate?(.min).js'

      , 'plugin-json/json.js'
      , 'plugin-text/text.js'
      //,'svg-morpheus/svg-morpheus.js'
      //,'extended-javascript-console/dist/xcon-*.min.js'
    ], {cwd: 'bower_components'})
  )
    //.pipe($.print(function(path) {return "<---- copy: " + path;}))
    .pipe($.flatten())
    .pipe($.newer(libFolder))
    //.pipe($.concat('vendor.js'))
    .pipe(gulp.dest(libFolder));

  return eventStream.concat(mockData, vendorCss, /*vendorIconCss, vendorIcons,*/ vendorFonts, vendorLibs);

});
