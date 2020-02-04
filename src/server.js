const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  console.log(req.body.Body)

  twiml.message('Your message recieved by: Guy Cherkesky');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});


// running from terminal
// twilio phone-numbers:update "+16152355775" --sms-url="http://localhost:1337/sms"
// node src/server.js
