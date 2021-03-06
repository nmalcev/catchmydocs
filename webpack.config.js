const path = require('path');

module.exports = (env) => {
	const assetsPath = path.resolve(__dirname, 'dist/assets');
	return {
		mode: 'production', // We want to build a production ready build
		entry: {
			index: path.resolve(__dirname, 'src/index.js')
		},
		output: {
			path: assetsPath,
			publicPath: '/assets/',
			filename: '[name].bundle.js' // in the file system
		},
		devtool: '#source-map',
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
				{
					test: /\.(png|svg|jpg|gif|eot|woff|woff2|ttf)$/, // This will copy the required images
					use: [
						'file-loader',
					],
				},
				{
					test: /\.scss$/,
					use: [
						'style-loader',
						'css-loader',
						'sass-loader'
					]
				  },
				{
					test: /\.css$/,
					use: [
						'style-loader',
						'css-loader'
					],
				},
			]
		},
	};
};

