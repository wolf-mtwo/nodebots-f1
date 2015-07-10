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

(function(module) {

  var socket = io();

  module.socket = (function(module) {

    module.emit = function (msg) {
      console.info('sent:', msg);
      socket.emit('msg', msg);
    }

    module.on = function (callback) {
      socket.on(CHANNELS.MESSAGE, function(message) {
        console.info('recive:', message);
        
      });
    }

    module.streaming = function (callback) {
      socket.on('live-stream', function(msg) {
        console.info('recive liveStream:', 'ok!');
        callback(msg);
      });
    }

    module.camera = (function(module){
      module.start = function (callback) {
        socket.on('start-stream', function(msg) {
          console.info('recive liveStream:', 'ok!');
          callback(msg);
        });
      }

      module.stop = function (callback) {
        socket.on('stop-stream', function(msg) {
          console.info('recive liveStream:', 'ok!');
          callback(msg);
        });
      }
      return module;
    })(module);    

    window.SocketManager = module;
  })({});
})({});