var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Gpio = require('onoff').Gpio;
var path = require("path");
var fs = require('fs');
var RaspiCam = require("raspicam");

var camera = new RaspiCam({ mode:"photo", output:"./server/stream/image.jpg", timelapse: 3000 });


app.use(express.static(path.join(__dirname + '/../public')));
app.use(express.static(path.join(__dirname + '/../bower_components')));

app.get('/', function (req, res) {
  res.sendFile(path.join( __dirname + '/index.html'));
});

io.on('connection', function(socket) {
  socket.on('msg', function(msg) {

    gpio.reset();

    if (msg.v > 0) {
      gpio.move('forward');
    }
    if (msg.v < 0) {
      gpio.move('back');
    }

    if (msg.h > 0) {
      gpio.move('right');
    }
    if (msg.h < 0) {
      gpio.move('left');
    }
  });

  socket.on('start-stream', function() {
    startStreaming(io);
  });
});

setInterval(function(){
  io.emit('msg', 'message');
}, 30000);

http.listen(3000, function () {
  console.log('listenin on *:3000');
});
//


function startStreaming(io) {
  camera.start();

  camera.on("read", function(err, timestamp, filename){
    //do stuff
    console.log('ñeeeeeeee');
    console.log(filename);
  });

    // setInterval(function() {
    //   fs.readFile('./server/stream/parser.jpg', {encoding: "base64"}, function (err, data) {
    //     if (err) {
    //       console.log(err.message);
    //       console.log('IMAGE DOES NOT EXIT');
    //       return;
    //     }
    //     console.log('sent');
    //     io.sockets.emit('liveStream',{data:data});
    //   });
    // }, 10000);

  // })
}

startStreaming(io);

var gpio = (function(module) {

  var drive = {
    led: new Gpio(14, 'out'),
    forward: new Gpio(15, 'out'),
    back: new Gpio(18, 'out'),
    left: new Gpio(23, 'out'),
    right: new Gpio(24, 'out')
  }

  module.move = function(direction) {
    if (drive[direction]) {
      drive[direction].writeSync(1);
    } else {
      console.log('command not found');
    }
  }

  module.reset = function() {
    for(var i in drive) {
      drive[i].writeSync(0);
    }
    drive['led'].writeSync(1);
  }

  return module;
})({});

setTimeout(function(){
  camera.stop();
}, 20000);
