// Aanpassen NODE_ENV variabele:
// [terminal] NODE_ENV=production webpack


var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');

module.exports = {
	context: __dirname + "",
	devtools: debug ? "inline-sourcemap" : null,
	entry: __dirname + "/client/entry.js",
	output: {
		path: __dirname + "/public_html",
		filename: "darkage.min.js"
	},
	module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }
    ]
  },
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false}),
	],
};
