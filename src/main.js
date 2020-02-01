// console.log("text2node")

var express = require('express');
var app = express();
const accountSid = 'ACec7734a550fbbe92ed1c44e99f23a57f';
const authToken = 'your_auth_token';
const client = require('twilio')(accountSid, authToken);

app.get('/', function (req, res) {
  res.send('Text2Node');
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+15017122661',
     to: '+15558675310'
   })
  .then(message => console.log(message.sid));