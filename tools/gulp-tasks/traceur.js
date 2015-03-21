
gulp.task('traceur', function(release) {
    //$.util.log($.util.colors.green(['transpile: Convert all **/*.es6.js source files to **/*.es5.js',
    // '(ES5 compatible source files) and save in build folder'].join()));

    release = release || false;

    var destination = DIR.build + '/js/modules/';

    return gulp.src(['modules/**/*.js',
                      '!**/*.spec.js',
                      '!**/*.scenario.js'
            ], {cwd: 'client/src/app'})
        //.pipe($.print(function(path) {return "<---- src: " + path;}))
        //.pipe($.rename(function (path) {
        //  //$.util.log($.util.colors.red('rename ' + path.basename + '.' + path.extname));
        //  path.extname = '.js';
        //  //path.dirname += '/ver';
        //  //path.basename = path.basename.replace(/\.es6$/, '.js');
        //}))
        //.pipe($.newer(destination))  // only pass files that are newer than destination
        //.pipe($.ngAnnotate({
        //    remove:true,  // remove existing annotations
        //    add: true,    // add annotations if they do not already exist
        //    single_quotes: true, // 'dep' | "dep"
        //    es6: true
        //}))
      .pipe($.traceur({
            modules: 'instantiate', // amd, commonjs, closure, instantiate, inline, register
        //script: false,
            //asyncFunctions: true,
            //annotations: true,
            //types: true,
            //typeAssertions: true,
            //typeAssertionModule: 'assert',
            //sourceMaps: false, //'file',
            //sourceRoot: projectRoot + "/client/src/app",
            experimental: true
        }))
        //.pipe($.print(function(path) {return "----> compiled: " + path;}))
        .pipe($.ngAnnotate({
            add: true,    // add annotations if they do not already exist
            single_quotes: true // 'dep' | "dep"
        }))
        //.pipe($.print(function(path) {return "<---- compiled: " + path;}))
        .pipe($.replace(/["']use strict['"];.*\n/g,''))
        //.pipe($.print(function(path) {return "processed: " + path;}))
        .pipe(gulp.dest(destination))
        //.pipe($.notify("Compilation complete."))
        ;

});

