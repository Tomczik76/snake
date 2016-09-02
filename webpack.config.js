var path = require("path");
module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};