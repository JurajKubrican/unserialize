var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname ,
  devtool:"inline-sourcemap" ,
  entry: "./scripts.js",
  output: {
    path: __dirname + "/build",
    filename: "./scripts.min.js"
  },
  module:{
    loaders:[
      { test: /\.css$/ ,   loader: "style!css" },
      { test: /\.(woff|woff2|ttf|eot|svg)$/,   loader: "url-loader" },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json','.jsx' ],
    modulesDirectories:[ 'node_modules' ],
  }
};
