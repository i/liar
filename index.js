var express = require('express')
var app     = express()
var server  = require('http').Server(app)
var io      = require('socket.io')(server)

var config = {
  port: 3000,
}

server.listen(config.port);

app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('main.ejs')
})

io.on('connection', function (socket) {
  // socket.emit('news', { hello: 'world' });
  // socket.on('hey', function (e) { console.log(e) })
});
