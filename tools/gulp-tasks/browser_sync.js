var browserSync = require('browser-sync');

const SERVER = {config: config.server};

gulp.task('ip', function() {
    "use strict";

    //ifconfig | grep -E "^\s*inet\s*([0-9]{1,3}\.){3}[0-9]{1,3}\s*netmask" | awk "{ print \$2 }" | grep -v "127.0.0.1"
//        .pipe($.run("grep -E '^\s*inet\s*([0-9]{1,3}\.){3}[0-9]{1,3}\s*netmask'"))


    $.run('ifconfig | grep "inet"').exec()
        //.pipe($.run('grep inet'))
        //.pipe($.run("grep -E '^\s*inet\s*"))
        //.pipe("awk \'{ print $2 }\'")
        //.pipe('grep -v \'127.0.0.1\'')
        .pipe(gulp.dest('output'));
});

// watch files for changes and reload
gulp.task('sync', function() {


    browserSync({
        server: {
            baseDir: DIR.build,
            directory: false
        },
        https: true,
        //proxy: 'my-imac.local',
        //host: '10.197.25.206',
        host: 'localhost',
        debugInfo: false,
        open: false,
        port: 3000,
        reloadDelay: 2000
    });

    //browserSync.init(null, {
    //    server: {
    //        baseDir: DIR.build,
    //        directory: true
    //    },
    //    debugInfo: false,
    //    open: false
    //    //,hostnameSuffix: ".xip.io"
    //}, function (err, bs) {
    //    require('opn')(bs.options.url);
    //    console.log('Started connect web server on ' + bs.options.url);
    //});

    gulp.watch(['**/*.*'], {cwd: DIR.build}, browserSync.reload);
});
