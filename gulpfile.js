/*global require __dirname __filename */
'use strict'; // only needed for ES5 scripts

global.projectRoot = __dirname;

global.gulp = require('gulp');

global.del = require('del');
global.notifier = require('node-notifier');
global.runSequence = require('run-sequence');
global.eventStream = require('event-stream');
global.minimist = require('minimist');
global.merge = require('merge-stream');
global.glob = require('glob');
global.sprintf = require('sprintf');

global.$ = require('gulp-load-plugins')({
  pattern: 'gulp-*',
  scope: 'devDependencies',
  camelized: true,
  lazy: true
});

global.pkg = require('./package.json');
global.config = require('./gulp.config.json');
global.DIR = config.directories;
global.FILES = config.files;

global.isMocked = false;

require('require-dir')('./tools/gulp-tasks', {recurse: true});

// #######################################################

gulp.task('default', function (cb) {
  var startTime =  Date.now();
  $.util.log($.util.colors.blue(['','',
    '#####################################################################',
    '#                                                                   #',
    '#   One moment please while I test, compile and test again...       #',
    '#                                                                   #',
    '#####################################################################'
  ].join('\n')));
  // notifier sends growl message not console message
  //notifier.notify({title: 'default task', message: 'build and test application'});
  runSequence('test','unmock', function(cb) {
    $.util.log($.util.colors.blue(['',
      '######################################################################',
      '                                                                     #',
      '   Your application has been tested, compiled and is ready to go.    #',
      '   Use "gulp express" to host the application externally accessible  #',
      '   Or "npm start" to host app in local dev mode only.                #',
      '                                                                     #',
      '######################################################################'
    ].join('\n#')));
    $.util.log($.util.colors.green('Total Build Time: ' + (Date.now() - startTime) + ' ms.\n'));
    //cb();
  });
});

// #######################################################

gulp.task('update', ['npm', 'bower']);

gulp.task('note', function() {
    notifier.notify({title: 'THIS IS A NOTE', message: 'Just notifying you that you have received a note from gulp.'});
});

gulp.task('start', function(cb){
    runSequence('build', 'test', 'express', cb);
    $.util.log($.util.colors.green("Open a browser and connect to this computer (either ip address or local name) at port 5000\ni.e.  http://localhost:5000"));
});

gulp.task('start.mocked', function(cb){
    runSequence('build',' mock', 'express', cb);
    $.util.log($.util.colors.red('The app has been compiled with mocked external services - for testing purposes only!'));
    $.util.log($.util.colors.green("Open a browser and connect to this computer (either ip address or local name) at port 5000\ni.e.  http://localhost:5000"));
});


gulp.task('dev', function(cb) {
    //$.util.log($.util.colors.blue('dev = build, watch, serve'));
    runSequence('build', ['watch', 'serve'], cb);
});

gulp.task('build', function(cb) {
  runSequence('clean:build', 'less:build', ['config.resources', 'traceur', 'copy'], 'index:build', cb);
});

gulp.task('build.mocked', function(cb) {
  runSequence('build','mock', cb);
});

gulp.task('test', function(cb) {
  runSequence('unit','build', 'mock', 'e2e', cb);
  // TODO: If tests fail then stop all gulp tasks!
});

gulp.task('unit', function(cb) {
  $.util.log($.util.colors.green(['',
    '############################################################',
    '',
    '         Starting unit tests with Karma and Mocha.',
    '',
    '############################################################'
  ].join('\n#')));
  runSequence('karma', cb);
});


//gulp.task('package', function() {
//    $.util.log($.util.colors.blue('minify, obfuscate and concatenate all resources and save to distribution folder'));
//
//    // ngAnnotate, uglify/minify
//    // copy assets to dist folder
//
//});

gulp.task('e2e', function(cb) {
    $.util.log($.util.colors.green(['','',
        'Starting functional Tests using Protractor and WebDriver',
        'Starting web server to host files from distribution folder, then',
        'I will start selenium server to act as a test proxy to the browser',
        'then I will run all functional e2e-tests against hosted app'
    ].join('\n### ')));

    runSequence('protractor', cb);

    $.util.log('\n------------------------------------\n   Done   \n\n');
});
