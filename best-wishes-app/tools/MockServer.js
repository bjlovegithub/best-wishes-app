const express = require('express');
const http = require('http');
const url = require('url');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/wish/:id', function (req, res) {
  const id = req.params.id;
  if (id === "1") {
	   res.send({"wish": "this is wish 1.", "thumbs": 1})
  }
  else if (id === "2") {
	res.send({"wish": "this is wish 2.", "thumbs": 2})
  }
  else {
	res.send({wish: "this is wish 3.", thumbs: 3})
  }
});

const server = http.createServer(app);
server.listen(9999, function listening() {
  console.log('Listening on %d', server.address().port);
});
