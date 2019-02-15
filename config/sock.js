var app = require('express')();
// var server = require('http').Server(app);


var api = require('./api');

// var conn = function(server) {
//   server.listen(8010);

//   app.get('/', function (req, res) {
//     res.sendfile(__dirname + '/index.html');
//   });
// };

var fromClient = function(server) {
var io = require('socket.io')(server);
// io.listen(server);
io.on('connection', function (socket) {
  console.log('io connect');
  
  socket.on('fromClient', function (data) {
    console.log(data.client);
         api.getRes(data.client).then(function(res){
           console.log('response', res);
            socket.emit('fromServer', { server: res });
         });
  });
});
}
module.exports = {fromClient}
