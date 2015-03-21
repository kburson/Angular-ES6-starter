
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var LessPluginCleanCSS = require('less-plugin-clean-css');
var cleancss = new LessPluginCleanCSS({advanced: true});

var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix = new LessPluginAutoPrefix({browsers: ['last 2 versions']});

function processStylesheets(liveReload) {
    var files = FILES.less;
    //files.add('node_modules/angular-material/angular-material.css');

    return gulp.src([
            'client/src/app/**/*.less'//,
            //'node_modules/font-awesome/less/font-awesome.less',
            //'node_modules/material-design-icons/sprites/svg-sprite/*.css'
        ])
        //.pipe($.print())
        .pipe($.recess({
            //includePath: [],           // additional paths to look for `@import`'ed LESS files.
            strictPropertyOrder: false,  // if true, complains if not strict property order
            noIDs: false,                // if true, complain about using IDs in your stylesheets
            noJSPrefix: true,            // if true, complain about styling .js- prefixed classnames
            noOverqualifying: false,     // if true, complain about overqualified selectors (ie: div#foo.bar)
            noUnderscores: false,        // if true, complain about using underscores in your class names
            noUniversalSelectors: true,  // if true, complain about using the universal * selector
            zeroUnits: false             // if true, complain if you add units to values of 0
        }))
        .pipe($.recess.reporter({
            fail: true,                  // If true, it writes error event on failure
            minimal: false               // If true, it only lists failure filenames omitting details
        }))
        .pipe($.less({
            plugins: [autoprefix /*, cleancss*/]
        }))
        //.pipe($.addSrc(['node_modules/font-awesome/css/font-awesome.css',
        //    'node_modules/material-design-icons/sprites/svg-sprite/*.css']))
        //.pipe($.flatten())
        .pipe($.concat('app.css'))
        .pipe(gulp.dest(DIR.build + '/css'))
        .pipe($.if(liveReload === true, reload({stream: true})));

}

gulp.task('less:reload', ['clean:build'], function() {
    return processStylesheets(true);
});

gulp.task('less:build', function() {
    return processStylesheets(false);
});

gulp.task('less-files', function() {
    return gulp.src(FILES.less)
        .pipe($.print());
});
