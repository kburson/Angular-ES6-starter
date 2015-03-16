var webpack = require('webpack');
var path = require('path');

var appRoot = __dirname + '/client/src/app';

module.exports = {

  context: appRoot,

  entry: {
    app: [
      'webpack/hot/dev-server',
      appRoot + '/index.es6'
    ],
    lib: [
      'angular',
      'lodash'
    ]
  },

  output: {
    filename: 'bundle.js',
    path: appRoot,
    publicPath: 'http://localhost:8000/'
  },

  module: {
    loaders: [
      {test: /[\/]angular\.js$/, loader: "exports?angular"},

      {test: /\.es6$/, loader: 'babel',          exclude: /node_modules/},

      {test: /\.tpl$/,  loader: 'raw',            exclude: /node_modules/},
      {test: /\.html$/, loader: 'raw',            exclude: /node_modules/},

      {test: /\.css$/, loader: 'style!css'/*,      exclude: /node_modules/*/},
      {test: /\.less$/, loader: 'style!css!less'/*, exclude: /node_modules/*/},

      // inline base64 URLs for <=8k images, direct URLs for the rest
      {test: /\.(png|jpg|svg|woff|ttf)$/, loader: 'url-loader?limit=8192'/*, exclude: /node_modules/*/}
    ]
  },

  resolve: {
    extensions: ['', '.js', '.es6'/*, '.json', '.less','.css','.jpg','.svg'*/],
    modulesDirectories: ['node_modules', 'lib'],
    alias: {
      'app': __dirname + '/client/src/app',
      'npm': __dirname + '/node_modules',
      'bower': __dirname + '/bower_components',
      'lib': __dirname + '/client/lib'
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      __TESTING__:    process.env.NODE_ENV === 'test',
      __MOCKED__:     JSON.stringify(JSON.parse(process.env.MOCKED           || 'false')),
      __DEV__:        JSON.stringify(JSON.parse(process.env.BUILD_DEV        || 'false')),
      __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
    })/*,
    new webpack.optimize.CommonsChunkPlugin('common.js')*/
  ]


};
