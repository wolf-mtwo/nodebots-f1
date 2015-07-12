/**
 * Mock respicam module. it is used on development mode.
 */
var raspicam = function() {

  //  Log default message
  var DEFAULT_MESSAGE = 'raspicam mock:';

  return {
    start: function() {
      console.log(DEFAULT_MESSAGE, 'camera start');
    },
    stop: function() {
      console.log(DEFAULT_MESSAGE, 'camera stop');
    },
    on: function(key, callback) {
      var fileName = 'parser.jpg';
      setInterval(function() {
        callback(null, 1000, fileName);
      }, 1000);
    }
  }
};

module.exports = raspicam
