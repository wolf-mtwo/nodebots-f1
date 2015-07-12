/**
 * Mock onoff module. it is used on development mode.
 */
var onoff = function() {

  //  Log default message
  var DEFAULT_MESSAGE = 'onoff:';

  return {
    writeSync: function(gpioState) {
      if (!gpioState) throw new error('gpioState is undefined');
      console.log(DEFAULT_MESSAGE, gpioState);
    }
  }
}

module.exports = onoff;
