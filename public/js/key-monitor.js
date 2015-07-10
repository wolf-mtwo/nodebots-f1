(function(module){

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

    module.forward = function(callback) {
      console.log('Event forward:');
      socketModule.emit(module.state.change('v+'));
    }
    module.back = function(callback) {
      console.log('Event back:');
      socketModule.emit(module.state.change('v-'));
    }
    module.left = function(callback) {
      console.log('Event left:');
      socketModule.emit(module.state.change('h-'));
    }
    module.right = function(callback) {
      console.log('Event right:');
      socketModule.emit(module.state.change('h+'));
    }
    module.reset = function(callback) {
      console.log('Event reset:');
      socketModule.emit(module.state.reset());
    }
    window.run = {
      '119': module.forward,
      '115': module.back,
      '97': module.left,
      '100': module.right,
      '114': module.reset
    };
    return module;
  })({});

  window.remote = module;
})({});