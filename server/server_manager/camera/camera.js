var utils = require('../utils');
var fs = require('fs');

var RaspiCam = null;
if (utils.getEnvironmentState()) {
  RaspiCam = require("raspicam");
} else {
  RaspiCam = require("../../mock/raspicam");
}

module.exports = (function(module) {

  // Camera options
  var options = {
    mode: "timelapse",
    output: "./server/stream/parser.jpg",
    timelapse: 3000,
    width : 320,
    height: 240,
    timeout: 600000
  };

  var CAMERA_STATE = false;
  var camera = new RaspiCam(options);

  module.start = function(callback) {
    if (!CAMERA_STATE) {
        camera.start();
        CAMERA_STATE = true;
        module.streaming(callback);
    } else {
      console.log('the camera has the next state [START]');
    }
  }

  module.stop = function() {
    if (CAMERA_STATE) {
      camera.stop();
      CAMERA_STATE = false;
    } else {
      console.log('the camera has the next state [STOP]');
    }
  }

  module.streaming = function(callback) {
    camera.on('read', function(err, timestamp, filename) {
      if (!CAMERA_STATE) return;
      if (filename.length >= 11) return;
      fs.readFile('./server/stream/parser.jpg',
        {encoding: "base64"},
        function (err, data) {
        if (err) {
          console.log(err.message);
          console.log('IMAGE DOES NOT EXIT');
          return;
        }
        callback(data);
      });
    });
  }

  return module;
})({});
