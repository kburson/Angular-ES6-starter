
var rjsOptimizer = require('requirejs/bin/r.js');

var amdConfig = {
    baseUrl: 'src',
    exclude:['a.js','b.js'],
    path:{
        'lib': '../lib'
    }
};
var requireConfig = {
    baseUrl: DIR.build
};
var options = {
    umd: false
};

gulp.task('package', ['clean:dist'], function() {
    $.util.log($.util.colors.blue(['package: add ng injector annotations for minification safety then concatenate all js files,',
                     'minify, obfuscate and save to distribution folder '].join()));

    return gulp.src([
            DIR.build + '/assets/js/**/*.js',
            '!' + DIR.build + '/assets/js/vendor/**/*'
        ])
        .pipe($.debug({verbose: true}))
        .pipe(rjsOptimizer(requireConfig, options))
        //.pipe($.concat('modules.js'))
        //.pipe($.uglify())
        //.pipe($.merge(gulp.src(DIR.build + '/assets/vendor/**/*.js'))) // TODO: Add minified libraries AFTER uglify
        .pipe($.debug({verbose: true}))
        //.pipe($.concat('app.js'))
        .pipe(gulp.dest(DIR.dist));
});
