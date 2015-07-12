var Gpio = require('./gpio');
var Camera = require('./camera');

// Unit-test
//Gpio.exec('0000');

//Repeat code for front-end and back-end
//server/server-manager.js
//public/js/socker-event-manager.js
var CHANNELS = {
  CMD: 'command',
  MESSAGE: 'message',
  CAMERA: {
    STREAM: 'live-stream',
    STOP: 'stop-stream',
    START: 'start-stream'
  }
};

module.exports = function(io) {

  io.on('connection', function(socket) {

    // Gpio-socket
    socket.on(CHANNELS.CMD, function(command) {
      Gpio.exec(command);
    });

    // Camera handler
    socket.on(CHANNELS.CAMERA.START, function() {
      console.log(CHANNELS.CAMERA.START);
      Camera.start(function(data) {
        console.log("streaming sent data");
        io.sockets.emit(CHANNELS.CAMERA.STREAM, {data:data});
      });
    });

    socket.on(CHANNELS.CAMERA.STOP, function() {
      console.log(CHANNELS.CAMERA.STOP);
      Camera.stop();
    });
  });
}
