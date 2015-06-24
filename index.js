var express = require('express')
var app     = express()
var server  = require('http').Server(app)
var io      = require('socket.io')(server)
var util    = require('./util')

var config = {
  port: 3000,
}

server.listen(config.port);

app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('main.ejs')
})

function Player(name) {
  this.name = name;
  this.score = 0;
}

function Room(id) {
  this.id = id;
  var nsp = io.of('/' + id)
  var players = [];

  var nsp = io.of('/' + id)
  nsp.on('connection', function(socket) {
    console.log('someone joined', id)

    socket.emit('joined', id)
    socket.on('join', function(name) {
      console.log(name, 'joined', id)
      players.push(new Player(name))
      socket.emit('welcome', players)
    })
  })

}

io.on('connection', function(socket) {

  socket.on('create', function() {
    console.log("creating new room")
    var room = new Room(util.randomRoomId())
    socket.emit('join', room.id) // tell client to join room with roomID
  })

})

io.on('connection', function (socket) {
  var sayings = [
    'eat pork roll',
    'eat haagen dazs',
    'go on a run, ian',
    'i hate obama',
    "it's story time",
  ]

  socket.emit('hi juli', sayings[Math.floor(Math.random() * sayings.length)])
  // socket.emit('news', { hello: 'world' });
  // socket.on('hey', function (e) { console.log(e) })
});
