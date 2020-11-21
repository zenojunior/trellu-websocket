var app = require('express')();
var http = require('http').createServer(app);
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.get('/', (req, res) => res.json({websocket: new Date().toLocaleTimeString()}));

app.post('/webhooks/ordenate', (req, res) => {
  console.log(req.body);
  res.json({teste: 123})
});

app.get('/*', (req, res) => res.redirect('/'));

http.listen(port, () => {
  console.log(`trellu-websocket listen on ${port}`);
});
