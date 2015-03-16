
var plato = require('plato');

gulp.task('analyze', function() {
    $.util.log($.util.colors.green('Analyzing source with JSHint, JSCS, and Plato'));

    var files = [DIR.src + '/**/*.@(es6|js)'];
    var jshint = analyzejshint(files);
    var jscs = analyzejscs(files);

    startPlatoVisualizer();

    return $.merge(jshint, jscs);
});

gulp.task('jshint', function() {
    "use strict";
    return  analyzejshint([DIR.src + '/**/*.@(es|js)']);
});

gulp.task('jscs', function() {
    "use strict";
    return  analyzejscs([DIR.src + '/**/*.@(es|js)']);
});

/**
 * Execute JSHint on given source files
 * @param  {Array} sources
 * @param  {String} overrideRcFile
 * @return {Stream}
 */
function analyzejshint(sources, overrideRcFile) {
    var jshintrcFile = overrideRcFile || './.jshintrc';
    $.util.log($.util.colors.green('Running JSHint'));
    $.util.log($.util.colors.blue(sources));
    return gulp
        .src(sources)
        .pipe($.jshint(jshintrcFile))
        .pipe($.jshint.reporter('jshint-stylish'));
}

/**
 * Execute JSCS on given source files
 * @param  {Array} sources
 * @return {Stream}
 */
function analyzejscs(sources) {
    $.util.log($.util.colors.green('Running JSCS'));
    return gulp.src(sources)
        .pipe($.jscs('./.jscsrc', {
                             options: {
                                 config: '.jscsrc',
                                 reporter: require('jscs-stylish').path
                             }
                         }
                         ))
}

/**
 * Start Plato inspector and visualizer
 */
function startPlatoVisualizer() {
    $.util.log($.util.colors.green('Running Plato'));

   // var files = glob.sync(DIR.build + '/assets/js/!(vendor)/**/*.js');
    var files = glob.sync(DIR.src + '/**/*.es6');
    var es5App = glob.sync(DIR.src + '/**/*.js');
    var es5Tasks = glob.sync(DIR.gulpTasks + '/**/*.js');

    $.util.log("files[" + files.length + "] is " + typeof(files) );//+ ", " + files.isArray());
    $.util.log("es5App[" + es5App.length + "] is " + typeof(es5App) );//+ ", " + es5App.isArray());
    $.util.log("es5Tasks[" + es5Tasks.length + "] is " + typeof(es5Tasks) );//+ ", " + es5Tasks.isArray());

    if (es5App.length > 0) { files = files.concat(es5App);}
    if (es5Tasks.length > 0) { files = files.concat(es5Tasks);}

    $.util.log($.util.colors.blue("Source Files to analyze: ") + files.length +
    "\n" + colors.gray.bold(files.join('\n')));

    var options = {
        title: 'Plato Inspections Report',
        esnext: true
    };
    var outputDir = './report/plato';

    plato.inspect(files, outputDir, options, platoCompleted);

    function platoCompleted(report) {
        var overview = plato.getOverviewReport(report);
        $.util.log($.util.colors.red(sprintf("total:   jshint: %5s, sloc: %5s, maintainability: %s",
            overview.summary.total.jshint,
            overview.summary.total.sloc,
            overview.summary.total.maintainability)));
        $.util.log($.util.colors.red(sprintf("average: jshint: %5s, sloc: %5s, maintainability: %s\n",
            overview.summary.average.jshint,
            overview.summary.average.sloc,
            overview.summary.average.maintainability)));
    }
}
