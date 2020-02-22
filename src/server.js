const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const ApiKeys = require('./apikeys')
const mymongopass = ApiKeys.mymongopass
const mongoose = require('mongoose')
const Userconnection = require('./userconnection')

mongoose.connect(`mongodb+srv://cherkesky:${mymongopass}@text2node-eywb4.mongodb.net/test?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

 
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send('Text2Node');
});
app.get('/test', function (req, res) {
  res.send('TEST');
});

app.post('/sms', (req, res) => {
   
  // mongoose connection
  const userconnection = new Userconnection({
    _id: new mongoose.Types.ObjectId,
    cid: parseInt(req.body.From.split("+")[1]),
    body: req.body.Body,
    token: 'tempToken'
  })
  userconnection.save()
  .then(result=>{
    console.log ("Mongoose Save: ", result)
  }) . catch(err => console.log(err))



  if (req.body.Body === "joke" || req.body.Body === "Joke"){
    console.log(req.body.Body)

    fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json())
    .then(joke => {
      const twiml = new MessagingResponse();
      twiml.message(joke.value);
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    })
  } 
  else {
    console.log("Unknown Command")
    console.log("from:", req.body.From)

    const twiml = new MessagingResponse();
      twiml.message("Unknown Command");
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
  }
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});


// running from terminal
// twilio phone-numbers:update "+16152355775" --sms-url="http://localhost:1337/sms"
// node src/server.js
