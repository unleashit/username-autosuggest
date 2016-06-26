var ExtractTextPlugin = require('extract-text-webpack-plugin');
let appCSS = new ExtractTextPlugin('./css/style.css', {allChunks: false});

var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: [
        './app/js/index.js'
    ],
    output: {
        path: __dirname + '/dist/',
        filename: "global.min.js"
    },
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract( 'style', 'css?sourceMap') },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract( 'style', 'css?sourceMap!sass?sourceMap') },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                //query: {presets: ['react']}
            },
            {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/},
            // {
            //     test: /\.css$/,
            //     loader: 'style!css!'
            // }
        ]
    },
    eslint: {
        failOnWarning: false,
        failOnError: true
    },
    sassLoader: {
        includePaths: [ './app/css' ]
    },
    plugins: [HtmlWebpackPluginConfig, appCSS]
};


