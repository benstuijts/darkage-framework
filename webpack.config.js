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
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false}),
	],
};
