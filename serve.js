// Inspired by https://gist.github.com/icebob/0dda386fceb8e14b91d84d057fac676f
"use strict";

// Create express app
const express = require("express");
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

if (process.env.NODE_ENV !== 'production') {
  const webpackConfig = require("@vue/cli-service/webpack.config.js");

  // Configure webpack as middleware
  const webpack = require("webpack");

  webpackConfig.entry.app.unshift('webpack-hot-middleware/client');
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  //console.log(webpackConfig);
  const compiler = webpack(webpackConfig);
  const devMiddleware = require('webpack-dev-middleware'); // eslint-disable-line
  app.use(devMiddleware(compiler, {
      noInfo: false,
      publicPath: webpackConfig.output.publicPath,
      headers: { "Access-Control-Allow-Origin": "*" },
      stats: {colors: true}
  }));

  const hotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line
  app.use(hotMiddleware(compiler, {
      log: console.log
  }));
}
else {
  app.use(express.static(path.join(__dirname, 'dist/')));
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

// Read in the "class" to store all our data on the server side
// If you need to change how data is handled, check the dataHandler.js file!
const Data = require("./dataHandler.js");

var data = new Data();
data.initializeData();


const DB = require("./DBHandler.js")
var db=new DB();

io.on('connection', function (socket) {
  // Send list of orders and text labels when a client is ready
  socket.on('pageLoaded', function() {
    socket.emit('initialize', { prognosisPat: data.getPrognosisPat(),
                                prognosisStaff: data.getPrognosisStaff(),
                                prognosisRooms: data.getPrognosisRooms() });
  });

});

const port = 8080;
http.listen(port, function() {
    console.log("Developer server running on http://localhost:" + port);
});
