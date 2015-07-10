(function(module){
  var socket = io();
  module.version = "v0.0.1";
  var socketModule = module.socket = (function(module) {
    module.emit = function (msg) {
      console.info('sent:', msg);
      socket.emit('msg', msg);
    }
    module.on = function (callback) {
      socket.on('msg', function(msg) {
        console.info('recive:', msg);
        callback(msg);
      });
    }

    module.streaming = function (callback) {
      socket.on('liveStream', function(msg) {
        console.info('recive liveStream:', 'ok!');
        callback(msg);
      });
    }
    return module;
  })({});

  module.move = (function(module) {

    module.state = (function(module) {
      var state = {v: 0,h: 0};
      var old = null;
      module.reset = function() {
        return state = {v: 0,h: 0}
      }
      module.change = function(command) {
        switch (command) {
          case 'v+': state.v = old == command ? state.v : 0; state.v++; break;
          case 'v-': state.v = old == command ? state.v : 0; state.v--; break;
          case 'h+': state.h++; break;
          case 'h-': state.h--; break;
          default:
            console.error('there is no command:', command);
            break;
        }
        old = command;
        return state;
      }
      return module;
    })({});