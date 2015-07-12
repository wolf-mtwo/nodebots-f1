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

(function(module) {

  var socket = io();

  module.socket = (function(module) {

    module.emit = (function(module) {

      module.command = function (data) {
        if (!data) throw new Error('data is undefined');
        socket.emit(CHANNELS.CMD, data);
      }

      module.camera = (function(module) {
        module.start = function () {
          console.log(CHANNELS.CAMERA.START);
          socket.emit(CHANNELS.CAMERA.START);
        }

        module.stop = function () {
          console.log(CHANNELS.CAMERA.STOP);
          socket.emit(CHANNELS.CAMERA.STOP);
        }

        return module;
      })({})

      return module;
    })({});

    module.message = function (callback) {
      socket.on(CHANNELS.MESSAGE, function(message) {
        console.info(CHANNELS.MESSAGE, ':', message);
        callback(message);
      });
    }

    module.camera = (function(module) {

      module.streaming = function (callback) {
        socket.on(CHANNELS.CAMERA.STREAM, function(data) {
          console.info(CHANNELS.CAMERA.STREAM , ':');
          callback(data);
        });
      }

      module.start = function (callback) {
        socket.on(CHANNELS.CAMERA.START, function(data) {
          console.info(CHANNELS.CAMERA.START , ':');
          callback(data);
        });
      }

      module.stop = function (callback) {
        socket.on(CHANNELS.CAMERA.STOP, function(data) {
          console.info(CHANNELS.CAMERA.STOP , ':');
          callback(data);
        });
      }

      return module;
    })(module);

    window.EventManager = module;
  })({});
})({});
