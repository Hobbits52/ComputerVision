const HtmlWebpackPlugin = require('html-webpack-plugin'); // Installed via npm
const webpack = require('webpack'); // To access built-in plugins
const path = require('path');

// Webpack is a module bundler for modern JavaScript applications.
// 
// Webpack creates a graph of all of your application's dependencies. 
// The starting point of this graph is known as an entry point.
// 
// The ENTRY POINT tells webpack where to start and follows the graph
// of dependencies to know what to bundle. 
// You can think of your application's entry point as the contextual 
// root or the first file to kick off your app.

// In webpack we define entry points using the entry property in our 
// webpack configuration object.
// 
const config = {
  entry: path.resolve(__dirname, 'src/client/app/index.jsx'),
  
  // Once you've bundled all of your assets together, we still need to
  // tell webpack where to bundle our application.
  // 
  // The webpack OUTPUT property describes to webpack how to treat 
  // bundled code.
  // 
  // With PATH, we are describing to webpack the name of our bundle.
  // 
  // With FILENAME, we are describing where where we want it to be 
  // emitted to.  (Emitted = Produced, or Discharged.)
  output: {
    path: path.resolve(__dirname, 'src/client/public'),
    filename: 'bundle.js'
  },

  // The goal is to have all of the assets in your project to be 
  // webpack's concern and not the browser's. 
  // (This doesn't mean that they all have to be bundled together). 
  // 
  // Webpack treats every file (.css, .html, .scss, .jpg, etc.) as a module. 
  // However, webpack only understands JavaScript.
  // 
  // Loaders in webpack transform these files into modules as they are 
  // added to your dependency graph.  

  // At a high level, they have two purposes in your webpack config.

    // 1) Identify what files should be transformed by a certain loader. 
    //    (test property)
    // 
    // 2) Transform that file so that it can be added to your dependency 
    //    graph (and eventually your bundle). (use property)
  module: {
    loaders: [
        {
          test: /\.jsx*$/,
          loaders: [ 'babel' ],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loaders: ['style', 'css'] 
        }                           
      ],
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  },
  // We define a rules property for a single module with two required 
  // properties: TEST and USE. This tells webpack's compiler:

  // "Hey webpack compiler, when you come across a path that resolves to a 
  // '.js' or '.jsx' file inside of a require()/import statement, use the 
  // babel-loader to transform it before you add it to the bundle".

  // Since Loaders only execute transforms on a per-file basis, plugins are 
  // most commonly used (but not limited to) performing actions and custom
  // functionality on "compilations" or "chunks" of your bundled modules.
  // 
  // The webpack Plugin system is extremely powerful and customizable.
  // In order to use a plugin, you just need to require() it and add it to 
  // the plugins array. 
  // 
  // Most plugins are customizable via options. 
  // 
  // Since you can use a plugin multiple times in a config for different 
  // purposes, you need to create an instance of it by calling it with 'new'.
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    // new HtmlWebpackPlugin({template: './src/client/index.html'})
  ]
  // There are many plugins that webpack provides out of the box! 
  // Check out our list of in the webpack documentation.
};


  module.exports = config;