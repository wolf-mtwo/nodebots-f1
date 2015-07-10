var gpio = require('./gpio');
var camera = require('./camera');

module.exports = function(io) {

  io.on('connection', function(socket) {
    socket.on('msg', function(msg) {
      console.log(msg);
    });

    socket.on('start-stream', function() {
      console.log('start-stream');
      //startStreaming(io);
    });
  });
}



