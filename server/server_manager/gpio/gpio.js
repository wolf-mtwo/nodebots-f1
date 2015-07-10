// gpio.reset();

//   if (msg.v > 0) {
//   gpio.move('forward');
//   }
//   if (msg.v < 0) {
//   gpio.move('back');
//   }

//   if (msg.h > 0) {
//   gpio.move('right');
//   }
//   if (msg.h < 0) {
//   gpio.move('left');
//   }

// io.on('connection', function(socket) {
//   socket.on('msg', function(msg) {

//     gpio.reset();

//     if (msg.v > 0) {
//       gpio.move('forward');
//     }
//     if (msg.v < 0) {
//       gpio.move('back');
//     }

//     if (msg.h > 0) {
//       gpio.move('right');
//     }
//     if (msg.h < 0) {
//       gpio.move('left');
//     }
//   });

//   socket.on('start-stream', function() {
//     startStreaming(io);
//   });
// });

// var gpio = (function(module) {
//   var drive = {
//     led: new Gpio(14, 'out'),
//     forward: new Gpio(15, 'out'),
//     back: new Gpio(18, 'out'),
//     left: new Gpio(23, 'out'),
//     right: new Gpio(24, 'out')
//   }

//   module.move = function(direction) {
//     if (drive[direction]) {
//       drive[direction].writeSync(1);
//     } else {
//       console.log('command not found');
//     }
//   }

//   module.reset = function() {
//     for(var i in drive) {
//       drive[i].writeSync(0);
//     }
//     drive['led'].writeSync(1);
//   }

//   return module;
// })({});
