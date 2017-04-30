const path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve('public'),
        filename: 'index_bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            {   test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query:
                    {
                        presets:['react']
                    }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: 'index.template.ejs',
        //     inject: 'body',
        // })
    ]
}