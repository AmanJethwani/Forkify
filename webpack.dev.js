//IMPORTING COMMON CONFIGURATION
const common = require("./webpack.common");

//MERGING COMMON CONFIGURATOIN
const merge = require("webpack-merge");

//PLUGINS
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
	mode: "development",
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "index.html",
			filename: "index.html",
		}),
	],
});
