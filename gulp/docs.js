/*global require __dirname*/

var DocGeni = require('dgeni');

gulp.task('dgeni', function() {
    try {
        var docGeni = new DocGeni([require(__dirname + '/docs/docGeni.conf')]);
        return docGeni.generate();
    } catch (x) {
        log(x.stack);
        throw x;
    }
});
