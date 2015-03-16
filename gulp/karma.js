
var karma = require('karma').server;

gulp.task('karma', function (done) {
  $.util.log("Executing ",__filename," in ", __dirname);
  karma.start({
    configFile: projectRoot + '/client/src/tests/karma/karma.conf.js'
  }, done);
});