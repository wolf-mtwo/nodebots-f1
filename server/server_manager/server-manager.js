var gpio = require('./gpio');
var camera = require('./camera');


//Repeat code for front-end and back-end
//server/server-manager.js
//public/js/socker-event-manager.js
var CHANNELS = {
  CMD: 'command',
  MESSAGE: 'msg',
  CAMERA: {
    STREAM: 'live-stream',
    STOP: 'start-stream',
    START: 'stop-stream'
  }
};


module.exports = function(io) {

  io.on('connection', function(socket) {

    socket.on(CHANNELS.MESSAGE, function(message) {
      console.log(message);
    });

    //gpio-socker
    socket.on(CHANNELS.CMD, function(message) {
      console.log(message);
    });

    // Camera place
    socket.on(CHANNELS.CAMERA.STREAM, function() {
      console.log(CHANNELS.CAMERA.STREAM);
      //startStreaming(io);
    });

    socket.on(CHANNELS.CAMERA.START, function() {
      console.log(CHANNELS.CAMERA.START);
    });

    socket.on(CHANNELS.CAMERA.STOP, function() {
      console.log(CHANNELS.CAMERA.STOP);
    });
  });
}



