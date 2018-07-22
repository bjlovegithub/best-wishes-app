const express = require('express');
const http = require('http');
const url = require('url');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

router.get('/board_wish/', function (req, res) {
  const arr = [
    {
      id: '1',
      userEmail: 'abc@abc.com',
      wish: 'this is my wish 1\nhappy',
      fontFamily: 'Helvetica',
      fontSize: 16,
      fontColor: 'blue',
      backgroundPic: 'https://images.pexels.com/photos/17679/pexels-photo.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb',
      thumbs: 1,
      createdTimestamp: 1525506395,
      updatedTimestamp: 0,
    },
    {
      id: '2',
      userEmail: 'abc@abc.com',
      wish: 'this is my wish 2',
      fontFamily: 'Helvetica',
      fontSize: 16,
      fontColor: 'black',
      backgroundPic: 'https://images.pexels.com/photos/36764/marguerite-daisy-beautiful-beauty.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb',
      thumbs: 2,
      createdTimestamp: 1525506395,
      updatedTimestamp: 0,
    },
    {
      id: '3',
      userEmail: 'abc@abc.com',
      wish: 'this is my wish 3',
      fontFamily: 'Cochin',
      fontSize: 22,
      fontColor: 'red',
      backgroundPic: 'https://images.pexels.com/photos/1562/italian-landscape-mountains-nature.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb',
      thumbs: 3,
      createdTimestamp: 1525506395,
      updatedTimestamp: 0,
    },
  ];
  
	res.send(arr);
});

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

router.get('/my_wish/:user_id', function (req, res) {
  res.send([
    {
      id: '1',
      userEmail: 'abc@abc.com',
      wish: 'this is my wish 1',
      fontFamily: 'Helvetica',
      fontSize: 16,
      fontColor: 'blue',
      backgroundPic: 'https://images.pexels.com/photos/17679/pexels-photo.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb',
      thumbs: 1,
      createdTimestamp: 1525506395,
      updatedTimestamp: 0,
    },
    {
      id: '2',
      userEmail: 'abc@abc.com',
      wish: 'this is my wish 2',
      fontFamily: 'Helvetica',
      fontSize: 16,
      fontColor: 'black',
      backgroundPic: 'https://images.pexels.com/photos/36764/marguerite-daisy-beautiful-beauty.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb',
      thumbs: 2,
      createdTimestamp: 1525506395,
      updatedTimestamp: 0,
    },
    {
      id: '3',
      userEmail: 'abc@abc.com',
      wish: 'this is my wish 3',
      fontFamily: 'Cochin',
      fontSize: 22,
      fontColor: 'red',
      backgroundPic: 'https://images.pexels.com/photos/1562/italian-landscape-mountains-nature.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb',
      thumbs: 3,
      createdTimestamp: 1525506395,
      updatedTimestamp: 0,
    },
    {
      id: '4',
      userEmail: 'abc@abc.com',
      wish: 'this is my wish 1',
      fontFamily: 'Helvetica',
      fontSize: 16,
      fontColor: 'blue',
      backgroundPic: 'https://images.pexels.com/photos/17679/pexels-photo.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb',
      thumbs: 1,
      createdTimestamp: 1525506395,
      updatedTimestamp: 0,
    },
    {
      id: '6',
      userEmail: 'abc@abc.com',
      wish: 'this is my wish 2',
      fontFamily: 'Helvetica',
      fontSize: 16,
      fontColor: 'black',
      backgroundPic: 'https://images.pexels.com/photos/36764/marguerite-daisy-beautiful-beauty.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb',
      thumbs: 2,
      createdTimestamp: 1525506395,
      updatedTimestamp: 0,
    },
    {
      id: '5',
      userEmail: 'abc@abc.com',
      wish: 'this is my wish 3',
      fontFamily: 'Cochin',
      fontSize: 22,
      fontColor: 'red',
      backgroundPic: 'https://images.pexels.com/photos/1562/italian-landscape-mountains-nature.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb',
      thumbs: 3,
      createdTimestamp: 1525506395,
      updatedTimestamp: 0,
    },
  ]);
});

router.put('/my_wish/', function (req, res) {
  console.log(req.body);
  res.send({status: 'OK'});
});

router.delete('/my_wish/:id', function (req, res) {
  res.send({status: 'OK'});  
});

app.use("/", router);

const server = http.createServer(app);
server.listen(9999, function listening() {
  console.log('Listening on %d', server.address().port);
});
