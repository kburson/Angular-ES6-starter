// WATCH FILES FOR CHANGES
gulp.task('watch', function() {
    $.util.log("Start Watch:");

    gulp.watch(FILES.es6,  ['traceur'] );
    //$.util.log($.util.colors.blue("Watching *.es6"));

    gulp.watch(FILES.less, ['less:build'] );
    //$.util.log($.util.colors.blue("Watching *.less"));

    gulp.watch(FILES.tpl,  ['templates:build'] );
    //$.util.log($.util.colors.blue("Watching *.tpl.html"));

    gulp.watch(FILES.docs, ['docs'] );
    //$.util.log($.util.colors.blue("Watching *.md"));

    gulp.watch(['client/src/app/index.html', 'client/src/app/resources.json'],  ['index:build']);
    //$.util.log($.util.colors.blue("Watching index.html and resources.json"));

});
