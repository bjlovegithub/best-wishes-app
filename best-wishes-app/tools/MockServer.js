const express = require('express');
const http = require('http');
const url = require('url');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

router.get('/wish/:id', function (req, res) {
  const id = req.params.id;
  if (id === "1") {
	   res.send({"wish": "this is wish 1.", "thumbs": 1, "sid": "sid1"})
  }
  else if (id === "2") {
	   res.send({"wish": "this is wish 2.", "thumbs": 2, "sid": "sid2"})
  }
  else {
	   res.send({wish: "this is wish 3.", thumbs: 3, "sid": "sid3"})
  }
});

router.patch('/wish/:id', function (req, res) {
  res.send({status: 'OK'});
});

router.get('/my_wish/:id', function (req, res) {
  res.send([
    {'wish': 'test'}, {'wish': 'test1'},
    {'wish': 'test'}, {'wish': 'test1'},
    {'wish': 'test'}, {'wish': 'test1'}
  ]);
});

router.put('/submit_my_wish/', function (req, res) {
  console.log(req.body);
  res.send({status: 'OK'});
});


app.use("/", router);

const server = http.createServer(app);
server.listen(9999, function listening() {
  console.log('Listening on %d', server.address().port);
});
