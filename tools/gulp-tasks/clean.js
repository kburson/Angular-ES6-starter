
// ###################################################################
gulp.task('clean', ['clean:build', 'clean:dist']);

gulp.task('clean:build', function(callback) {
    del(DIR.build, {force: true}, callback);
});

gulp.task('clean:dist', function(callback) {
    del(DIR.dist, {force: true}, callback);
});

gulp.task('clean:template', function(callback) {
    del(DIR.build + '/assets/js/app/app.templates.js', callback);
});