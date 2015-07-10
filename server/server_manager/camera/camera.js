// var onRasp = false;
// var RaspiCam, Gpio = null;
// if (onRasp) {
//   RaspiCam = require("raspicam");
//   Gpio = require('onoff').Gpio;
// } else {
//   RaspiCam = require("./mock/raspicam");
//   Gpio = require('./mock/onoff');
// }


// var options = {
//   mode: "timelapse",
//   output: "./server/stream/parser.jpg",
//   timelapse: 3000,
//   width : 320,
//   height: 240,
//   timeout: 30000
// };

// var cameraState = false;
// var camera = new RaspiCam(options);


// function cameraStop() {
//   camera.stop();
// }

//var fs = require('fs');
// function startStreaming(io) {

//   if (!cameraState) {
//     camera.start();
//     cameraState = true;
//   }

//   camera.on("read", function(err, timestamp, filename) {
//     if (filename.length >= 11) {
//       return;
//     }
//     fs.readFile('./server/stream/parser.jpg', {encoding: "base64"}, function (err, data) {
//       if (err) {
//         console.log(err.message);
//         console.log('IMAGE DOES NOT EXIT');
//         return;
//       }
//       console.log('sent');
//       io.sockets.emit('liveStream',{data:data});
//     });
//   });
// }
