var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require("path");
var fs = require('fs');
app.use(express.static(path.join(__dirname + '/../public')));
app.use(express.static(path.join(__dirname + '/../bower_components')));

app.get('/', function (req, res) {
  res.sendFile(path.join( __dirname + '/index.html'));
});

io.on('connection', function(socket) {
  socket.on('msg', function(msg) {
    console.log(msg);
    // io.emit('chat message', msg);
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


function startStreaming(io) {

  // if (app.get('watchingFile')) {
  //   io.sockets.emit('liveStream', 'image_stream.jpg?_t=' + (Math.random() * 100000));
  //   return;
  // }
  //
  // var args = ["-w", "640", "-h", "480", "-o", "./stream/image_stream.jpg", "-t", "999999999", "-tl", "100"];
  // proc = spawn('raspistill', args);
  //
  // console.log('Watching for changes...');
  //
  // app.set('watchingFile', true);

  // fs.watchFile('./server/stream/parser.jpg', function(current, previous) {
  //   console.log('change');
    // console.log(current);
    // console.log(previous);
    // fs.readFile('./stream/parser.jpg', {encoding: "base64"}, function (err, data) {
    setInterval(function() {
      fs.readFile('./server/stream/parser.jpg', {encoding: "base64"}, function (err, data) {
        if (err) {
          console.log(err.message);
          console.log('IMAGE DOES NOT EXIT');
          return;
        }
        console.log('sent');
        io.sockets.emit('liveStream',{data:data});
      });
    }, 100);

  // })
}

startStreaming(io);
