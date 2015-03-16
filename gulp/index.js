
gulp.task('index:build', function() {

    //$.util.log(colors.green(['index:build: insert \<script\> tags into index.html',
    //' for *.js and *.css files in build folder'].join()));
    var appVersion = require('../package.json').version; // TODO read environment variable from Jenkins to get BUILD #

    var knownOptions = {
        string: ['env', 'host', 'appVersion', 'BUILD_NUMBER'],
        default: {
            env: process.env.env || 'local',
            host: process.env.API_HOST || 'localhost:9000',
            version: process.env.appVersion || appVersion,
            build_number: process.env.BUILD_NUMBER || 'local'
        }
    };

    var options = minimist(process.argv.slice(2), knownOptions);

    return gulp.src(FILES.index)
        .pipe($.inject(gulp.src(['css/**/!(app).css','css/**/app.css'],{read: false, cwd: DIR.build})))
        .pipe($.inject(gulp.src('',{read: true, cwd: DIR.src}), {
            // inject script tag that defines all the api endpoints for the current installation
            starttag: '<!-- inject:version -->',
            transform: function (filePath, file) {
                return "<script id='clientVersion'>window.clientVersion='" + options.version + "';</script>";
            }
        }))
        .pipe(gulp.dest(DIR.build));
});
