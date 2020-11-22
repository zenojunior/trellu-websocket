var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.get('/', (req, res) => res.json({websocket: new Date().toLocaleTimeString()}));

io.on('connect', function(socket) {
  console.log('usuario conectado', socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
}); 


app.post('/webhooks/ordenate', (req, res) => {
  const socketId = req.body.socketId
  const sockets = Object.fromEntries(io.sockets.sockets)
  const socket = sockets[socketId]
  socket.broadcast.emit('ordenate', req.body)
  console.log(req.body);
  // io.emit('ordenate', req.body);
  res.json({ success: true });
});

app.get('/*', (req, res) => res.redirect('/'));

http.listen(port, () => {
  console.log(`trellu-websocket listen on ${port}`);
});
