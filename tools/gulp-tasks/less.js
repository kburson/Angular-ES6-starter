
//var browserSync = require('browser-sync');
//var reload      = browserSync.reload;

var LessPluginCleanCSS = require('less-plugin-clean-css'),
  cleancss = new LessPluginCleanCSS({advanced: true});

var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
  autoprefix = new LessPluginAutoPrefix({browsers: ['last 2 versions']});

var LessPluginFlexboxgrid = require('less-plugin-flexboxgrid'),
  flexboxgrid = new LessPluginFlexboxgrid();

var LessPluginLists = require('less-plugin-lists'),
  lists = new LessPluginLists();

function processStylesheets(liveReload) {
  //files.add('node_modules/angular-material/angular-material.css');

  return gulp.src('vertex.less', {cwd: 'client/src/app/modules'})
    .pipe($.plumber()) // make sure a fail does not kill the watch
    .pipe($.print())
    .pipe($.inject(gulp.src(['**/*.less','!vertex.less'], {cwd: 'client/src/app/components/', read:false}), {
      starttag: '/* inject:less */',
      endtag: '/* endinject */',
      transform: function(filepath) {
        return "@import '." + filepath + "';\n";
      }
    }))
    .pipe($.less({ // cleancss will minify the css
      plugins: [autoprefix, flexboxgrid, lists /*, cleancss*/]
    }))
    //.pipe($.addSrc(['node_modules/font-awesome/css/font-awesome.css',
    //    'node_modules/material-design-icons/sprites/svg-sprite/*.css']))
    //.pipe($.flatten())
    .pipe($.concat('vertex.css'))
    .pipe(gulp.dest(DIR.build + '/css'))
  //.pipe($.if(liveReload === true, reload({stream: true})));

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
