var socket = io(':3000/');


socket.on('connect', function(){
  console.log('connected')
});

socket.on('yo', function(e) { console.log(e) })
