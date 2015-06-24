module.exports = {
  randomRoomId: function() {
    var s = ''
    var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (var i = 0; i < 4; i++) s += alpha[Math.floor(Math.random() * alpha.length)]
    return s
  }
}
