gulp.task('protractor', function (cb) {
  gulp.src([projectRoot + "client/src/tests/e2e/scenarios/**/*.js"])
    .pipe($.protractor.protractor({
      configFile: projectRoot + "/client/src/tests/conf/protractor.conf.js",
      args: ['--baseUrl', 'http://127.0.0.1:8000']
    }))
    .on('end', function () {
      cb();
    })
    .on('error', function (e) {
      throw e
    });

});