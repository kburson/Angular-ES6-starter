var jsstyle = require('jshint-stylish');

gulp.task('lint:js', function () {
    // Note: To have the process exit with an error code (1) on
    //  lint error, return the stream and pipe to failOnError last.
    //return gulp.src(['src/app/**/*.js','*.js', 'docs/**/*.js', 'tools/**/*.js'], {base:'./'})
    return gulp.src(['client/src/app/**/*.es6'], {base:'./'})
        //.pipe($.print())
        .pipe($.eslint({
                settings: {
                    'ecmascript': 6,
                    'jsx': false
                },
                'ecmaFeatures': {
                    'binaryLiterals': true,
                    'blockBindings': true,
                    'defaultParams': true,
                    'forOf': true,
                    'generators': true,
                    'objectLiteralComputedProperties': true,
                    'objectLiteralDuplicateProperties': true,
                    'objectLiteralShorthandMethods': true,
                    'objectLiteralShorthandProperties': true,
                    'octalLiterals': true,
                    'regexUFlag': true,
                    'regexYFlag': true,
                    'templateStrings': true,
                    'unicodeCodePointEscapes': true,
                    'jsx': false
                },
                'env':{
                    'browser': true,
                    'node': true,
                    'mocha': true,
                    'jasmine': true,
                    'amd': true
                }
            })
        )
        .pipe($.eslint.format())
        .pipe($.eslint.failOnError());
});
