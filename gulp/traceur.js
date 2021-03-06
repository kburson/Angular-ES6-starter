
gulp.task('traceur', function(release) {
    //$.util.log($.util.colors.green(['transpile: Convert all **/*.es6.js source files to **/*.es5.js',
    // '(ES5 compatible source files) and save in build folder'].join()));

    release = release || false;

    var destination = DIR.build + '/js/';

    return gulp.src(['**/*.es6',
                      '!**/*.spec.es6',
                      '!**/*.scenario.es6'
            ], {cwd: 'client/src/app'})
        //.pipe($.print(function(path) {return "<---- src: " + path;}))
        .pipe($.rename(function (path) {
          //$.util.log($.util.colors.red('rename ' + path.basename + '.' + path.extname));
          path.extname = '.js';
          //path.dirname += '/ver';
          //path.basename = path.basename.replace(/\.es6$/, '.js');
        }))
        //.pipe($.newer(destination))  // only pass files that are newer than destination
        //.pipe($.ngAnnotate({
        //    remove:true,  // remove existing annotations
        //    add: true,    // add annotations if they do not already exist
        //    single_quotes: true, // 'dep' | "dep"
        //    es6: true
        //}))
      .pipe($.traceur({
            modules: 'amd', //'register', //'commonjs',
            //script: false,
            //asyncFunctions: true,
            //annotations: true,
            //types: true,
            //typeAssertions: true,
            //typeAssertionModule: 'assert',
            //sourceMaps: false, //'file',
            //sourceRoot: __dirname + "/../client/src/app",
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

