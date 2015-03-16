const BUILD = 0;
const RELEASE = 1;

function templates(release) {
    var targetFile = 'templates.module' + (release === RELEASE ? '.min.js' : '.js');
    var targetDir = (release === RELEASE ? DIR.dist : DIR.build ) + '/js/modules/common/templates/';

    return gulp.src("**/*.tpl", {cwd: 'client/src/app/modules/'})
        .pipe($.if(release, $.minifyHtml({empty: true, quotes: true }), $.jsbeautifier()))
        .pipe($.ngTemplate({
            moduleName: 'app.templates',
            standalone: true,
            filePath: targetFile
        }))

        // remove IIFE, it interferes with traceur.
        .pipe($.replace(/^;\(function\(\){\n/,''))
        .pipe($.replace(/}\)\(\);/,''))
        .pipe($.replace(/["']use strict['"];/g,''))
        .pipe($.replace(/^\n/g,''))

        // add AMD structure
        .pipe($.insert.prepend("import angular from 'angular';\nvar templateModule = "))
        .pipe($.replace(/.run/,';\ntemplateModule.run'))
        .pipe($.insert.append("export default templateModule;"))

        // transpile to ES5, package in AMD define([...
        .pipe($.traceur({modules: 'amd', experimental: true }))

        // minify and obfuscate if this is a release package.
        .pipe($.if(release, $.uglify(), $.jsbeautifier()))

        .pipe(gulp.dest(targetDir));
}

gulp.task ('templates', ['templates:build', 'templates:dist']);

gulp.task('templates:build', function() {
    //log(colors.green(['templates:build: prettify **/*.tpl.html, convert into js strings,',
    //                  'inject into angular template cache and save to build folder'].join()));
    return templates(BUILD);
});

gulp.task('templates:dist', ['clean:dist'], function() {
    //log(colors.green(['templates:dist: minify **/*.tpl.html, convert into js strings and inject into ',
    // 'angular template cache, uglify the js and save to distribution folder'].join()));
    return templates(RELEASE);
});
