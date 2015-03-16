
lrserver = gulp-require('tiny-lr');
livereload = require('connect-livereload');
express = require('express');
// *********************************************

const SERVER = {config: config.server};
livereloadport = 35729;
serverport = 5000;

//We only configure the server here and start it only when running the watch task
var server = express();
//Add livereload middleware before static-middleware
server.use(livereload({
    port: livereloadport
}));

server.use(express.static(DIR.build));

gulp.task('express', function() {
    $.util.log("start express server");
    //Set up your static fileserver, which serves files in the build dir
    server.listen(serverport);

    //Set up your livereload server
    //lrserver.listen(livereloadport);
});
