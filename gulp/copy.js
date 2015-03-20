
// ####################################################
var styleFolder = DIR.build + '/css';
var imgFolder = DIR.build + '/img';
var fontFolder = DIR.build + '/fonts';
var libFolder = DIR.build + '/js/lib';

gulp.task('copy', ['copy-vendor', 'copy-assets', 'copy-config', 'copy-html'], function(done) {
  done();
});


gulp.task('copy-config', function() {
  return gulp.src([
    'system.config.js',
    'bootstrap.js'
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
    //.pipe($.newer(DIR.build))
    .pipe($.print())
    .pipe(gulp.dest(DIR.build));

  var tpl = gulp.src([
    '**/*.tpl'
  ], {cwd: 'client/src/app/'})
    //.pipe($.newer(DIR.build))
    .pipe($.print())
    .pipe(gulp.dest(DIR.build + '/js/'));

  return eventStream.concat(html, tpl);

});

gulp.task('copy-assets', function() {
    var images = gulp.src(['**/*', '!**/*.md', '!**/favicon.png'], {cwd: 'client/assets/img'})
        .pipe($.newer(imgFolder))
        //.pipe($.print())
        .pipe(gulp.dest(imgFolder));

    var favicon = gulp.src('favicon.png',{cwd: 'client/assets/img'})
      .pipe($.newer(DIR.build))
      //.pipe($.print())
      .pipe(gulp.dest(DIR.build));

    var fonts =  gulp.src(['font-awesome/fonts/*.*'], {cwd: 'node_modules'})
        .pipe($.newer(fontFolder))
        //.pipe($.print())
        .pipe(gulp.dest(fontFolder));

  return eventStream.concat( images, favicon, fonts);

});

gulp.task('copy-vendor', function() {

    var iconStyleFolder = styleFolder + '/icons';
    var iconFolder = imgFolder + '/icons';

    var vendorCss= gulp.src([
        'angular-material/angular-material.css',
        'font-awesome/css/font-awesome.css'
    ], {cwd: 'node_modules'})
        .pipe($.flatten())
        .pipe($.newer(styleFolder))
        .pipe(gulp.dest(styleFolder));

    var vendorIconCss = gulp.src([
        'material-design-icons/sprites/svg-sprite/*.css'
    ], {cwd: 'node_modules'})
        .pipe($.flatten())
        .pipe($.newer(iconStyleFolder))
        .pipe(gulp.dest(iconStyleFolder));


    var vendorIcons = gulp.src('svg-sprite/*.svg', {cwd: 'node_modules/material-design-icons/sprites'})
        .pipe($.newer(iconFolder))
        //.pipe($.print())
        .pipe(gulp.dest(iconFolder));

    var vendorLibs =  $.merge(

        gulp.src('lodash.min.js', {cwd: 'client/lib'}),

        gulp.src([
            'plugin-json/json.js',
            'plugin-text/text.js',
            'svg-morpheus/svg-morpheus.js',
            'extended-javascript-console/dist/xcon-*.min.js'
        ], {cwd: 'bower_components'}),

        gulp.src([
            'traceur/bin/traceur-runtime.js',
            //'rtts-assert/ist/amd/assert.js',
            'systemjs/dist/system?(.src).js?(.map)',
            'es6-module-loader/dist/es6-module-loader?(.src).?s?(.map)',
            'almond/almond.js'
        ], {cwd: 'node_modules'}),

        gulp.src([
            'angular/angular.min.js?(.map)',
            'angular-ui-router/release/angular-ui-router.min.js?(.map)',
            'angular-ui-router.statehelper/statehelper.min.js?(.map)',
            'angular-mocks/angular-mocks.js?(.map)',
            'angular-animate/angular-animate.min.js?(.map)',
            'angular-messages/angular-messages.min.js?(.map)',
            'angular-aria/angular-aria.min.js?(.map)',
            'angular-resource/angular-resource.min.js?(.map)',
            'angular-cookies/angular-cookies.min.js?(.map)',
            'angular-storage/dist/angular-storage.min.js?(.map)',
            'angular-material/angular-material.min.js?(.map)',
            'angular-loading-bar/build/loading-bar.min.js?(.map)'
        ], {cwd: 'node_modules'}))
    //.pipe($.print(function(path) {return "<---- copy: " + path;}))
    .pipe($.flatten())
    .pipe($.newer(libFolder))
        //.pipe($.concat('vendor.js'))
    .pipe(gulp.dest(libFolder));

    return eventStream.concat(vendorCss, vendorIconCss, vendorIcons, vendorLibs);

});
