//IMPORTING PATH PACKAGE
const path = require("path");

//CLEANING BEFORE BUILD
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	entry: "./src/js/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "js/bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ["babel-loader"],
				exclude: /node_modules/,
			},
			{ test: /\.html$/, use: ["html-loader"] },
			{
				test: /\.(svg|png|jpg|gif)$/,
				use: {
					loader: "file-loader",
					options: {
						name: "[name].[ext]",
						outputPath: "img",
					},
				},
			},
		],
	},
	plugins: [new CleanWebpackPlugin()],
};
