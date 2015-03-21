
var karma = require('karma').server;

gulp.task('karma', function (done) {
  karma.start({
    configFile: projectRoot + '/client/src/tests/conf/karma.conf.js',
    singleRun: true,
    background: false
  }, done);
});