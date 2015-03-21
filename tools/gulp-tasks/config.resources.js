var minimist = require('minimist');

function buildResourceFile(useMocks) {
  var appVersion = require(projectRoot + '/package.json').version; // TODO read environment variable from Jenkins to get BUILD #
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

  //$.util.log(options);

  return gulp.src('app/resources.json', {read: true, cwd: DIR.src})
    //.pipe($.print())
    .pipe($.jsonEditor(
      function (json) {

        var hosts = json['environments'][options.env]['hosts'];
        if (options.env === 'local') {
          hosts.api = hosts.api + options.host;
          hosts.admin = hosts.admin + options.host;
        }
        return {
          useMockedServices: useMocks,
          clientAppVersion: options.version + '.' + options.build_number,
          env: options.env,
          hosts: hosts,
          resources: json['resources']
        };
      }, {
        'indent_char': '\t',
        'indent_size': 1
      })
  ).pipe(gulp.dest(DIR.build));
}

gulp.task('config.resources', function () {
  return buildResourceFile(false);
});

gulp.task('config.mocks', function () {
  return buildResourceFile(true);
});