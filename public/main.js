var socket = io(':3000');

socket.on('connect', function(){
  console.log('connected to server')
});

Zepto(function($){
  var room;

  function joinRoom(roomId, name) {
    console.log('joining room', roomId, 'as', name)
    room = io(':3000/' + roomId)
    room.on('joined', function(roomId) {
      console.log('joined room', roomId)
      $("#currentRoom").text("In room: " + roomId)

      room.emit('join', name)
    })

    room.on('welcome', function(players) {
      console.log(players)
    })


  }

  $('#join').click(function() {
    var roomId = $('#roomId').val()
    var name = $('#name').val()
    joinRoom(roomId, name)
  })

  $('#create').click(function() {
    console.log('create')
    socket.emit('create')
  })

  // server says we should join this room
  socket.on('join', function(roomId) {
    var name = $('#name').val()
    joinRoom(roomId, name)
  })

})
