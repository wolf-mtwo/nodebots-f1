var utils = require('../utils');
var fs = require('fs');
var decode = require('./decode');

var Gpio = null;
if (utils.getEnvironmentState()) {
  Gpio = require("onoff").Gpio;
} else {
  Gpio = require("../../mock/onoff");
}

module.exports = (function(module) {

  module.exec = function(command) {
    console.log('executed:', command);
    var commands = decode.command(command);
    module.GpioFacede.moveMany(commands);
  }

  module.GpioFacede = (function(module) {

    var drive = {
      led: new Gpio(14, 'out'),
      forward: new Gpio(15, 'out'),
      back: new Gpio(18, 'out'),
      left: new Gpio(23, 'out'),
      right: new Gpio(24, 'out')
    };

    module.moveMany = function(commands) {
      if (!(commands instanceof Array)) {
        throw new Error('command should be array');
      }
      for (var i in commands) {
        module.changeState(commands[i])
      }
    }

    module.changeState = function(commandState) {
      if (!commandState) throw new error('commandState is undefined');
      var gpio = drive[commandState.command];
      if (gpio) {
        gpio.writeSync(parseInt(commandState.value));
      } else {
        console.log('command not found', commandState);
      }
    }

    return module;
  })({});

  return module;
})({});
