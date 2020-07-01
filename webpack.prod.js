//IMPORTING COMMON CONFIGURATION
const common = require("./webpack.common");

//MERGING COMMON CONFIGURATOIN
const merge = require("webpack-merge");

//PLUGINS
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeAssets = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
	mode: "production",
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "styles/[name].css",
		}),
	],
	optimization: {
		minimizer: [
			new TerserJSPlugin(),
			new OptimizeAssets(),
			new HtmlWebpackPlugin({
				template: "index.html",
				filename: "index.html",
				minify: {
					collapseWhitespace: true,
					removeComments: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
					useShortDoctype: true,
				},
			}),
		],
	},
});
