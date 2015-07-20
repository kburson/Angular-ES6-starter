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
var bannerDone = false;
// #######################################################

gulp.task('banner', function (done) {
  if (!bannerDone) {
    bannerDone = true;
    $.util.log('\n',
      $.util.colors.bgWhite.black.bold(['',
        '#####################################################################',
        '#                                                                   #',
        '#                   Starting Gulp Task Sequence...                  #',
        '#                                                                   #',
        '#####################################################################'
      ].join('\n')),
      '\n');
  }
  done();
});

function formatTime(ms) {
  var minutes = ms / 60000;
  var seconds = (ms % 60000) / 1000;
  var milli = (ms % 1000);
  return sprintf("%02d:%02d.%02d", minutes, seconds, milli);
}

gulp.task('default', ['banner'], /*'test','unmock' */ function (done) {
  var startTime = Date.now();
  $.util.log($.util.colors.blue.bold(['',
    '#####################################################',
    '#                                                   #',
    '#   Default Task:  One moment please while I        #',
    '#                                                   #',
    '#   1) execute all unit tests,                      #',
    '#   2) compile and package the application,         #',
    '#   3) start a web server to hose the application   #',
    '#   4) run functional tests against a live browser  #',
    '#       (to validate the compiled app), then        #',
    '#   5) shut down the server                         #',
    '#                                                   #',
    '#####################################################'
  ].join('\n')));
  // notifier sends growl message not console message
  //notifier.notify({title: 'default task', message: 'build and test application'});
  runSequence('build', 'mock', 'test', 'unmock', function (cb) {
    $.util.log($.util.colors.blue.bold(['',
      '######################################################################',
      '#                                                                    #',
      '#  Your application has been tested, compiled and is ready to go.    #',
      '#  Use "gulp express" to host the application externally accessible  #',
      '#  Or "npm start" to host app in local dev mode only.                #',
      '#                                                                    #',
      '######################################################################'
    ].join('\n')));

    var duration = (Date.now() - startTime);
    $.util.log($.util.colors.bgGreen.black.bold('Total Build Time: ' + formatTime(duration)));
    //cb();
    runSequence('server.stop');
  });
  done()
});

// #######################################################


gulp.task('start', ['banner'], /* build, test, express */ function (cb) {
  runSequence('build', 'test', 'express', cb);
  $.util.log($.util.colors.green("Open a browser and connect to this computer (either ip address or local name) at port 5000\ni.e.  http://localhost:5000"));
});

gulp.task('start.mocked', ['banner'], /* build, mock, express */ function (cb) {
  runSequence('build', ' mock', 'express', cb);
  $.util.log($.util.colors.red('The app has been compiled with mocked external services - for testing purposes only!'));
  $.util.log($.util.colors.green("Open a browser and connect to this computer (either ip address or local name) at port 5000\ni.e.  http://localhost:5000"));
});


gulp.task('dev.mocked', ['banner'], /*build, watch server.start */ function (cb) {
  //$.util.log($.util.colors.blue('dev = build, watch, serve'));
  runSequence('build', 'mock', ['watch', 'server.start'], cb);
});
gulp.task('dev', ['banner'], /*build, watch server.start */ function (cb) {
  //$.util.log($.util.colors.blue('dev = build, watch, serve'));
  runSequence('build', ['watch', 'server.start'], cb);
});


gulp.task('build', ['banner'], /* 'clean:build', 'less:build', ['config.resources', 'compile', 'copy'], 'index:build' */ function (cb) {
  runSequence('clean:build', 'less:build', ['config.resources', 'compile', 'copy'], 'index:build', cb);
});

gulp.task('build.mocked', ['banner'], /* 'build','mock' */ function (cb) {
  runSequence('build', 'mock', cb);
});

gulp.task('test', ['banner'], /* 'unit','build', 'mock', 'e2e' */ function (cb) {
  runSequence('unit', 'build', 'mock', 'e2e', cb);
  // TODO: If tests fail then stop all gulp tasks!
});

gulp.task('unit', ['banner'], /* 'karmna' */ function (cb) {
  $.util.log('\n' + $.util.colors.green.bold([
      '############################################################',
      '#                                                          #',
      '#        Starting unit tests with Karma and Mocha.         #',
      '#                                                          #',
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

gulp.task('e2e', ['banner'], /* 'protractor' */ function (cb) {
  $.util.log($.util.colors.green.bold(['', '',
    '-------------------------------------------------------------------',
    'Starting functional Tests using Protractor and WebDriver',
    'Starting web server to host files from distribution folder, then',
    'I will start selenium server to act as a test proxy to the browser',
    'then I will run all functional e2e-tests against hosted app',
    '-------------------------------------------------------------------'
  ].join('\n')));

  runSequence('server.start.single', 'protractor', cb);

  $.util.log('\n------------------------------------\n   Done   \n\n');
});


// #######################################################


gulp.task('adminNote', function () {
  notifier.notify({
    title: 'THIS IS A NOTE',
    message: 'Just notifying you that you have received an adminNote from gulp.'
  });
});
