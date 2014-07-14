var express = require('express');
var fs = require('fs');
var postmark = require("postmark")(process.env.POSTMARK_API_KEY);


var app = express();

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use("/js", express.static(__dirname + '/js'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/images", express.static(__dirname + '/images'));
app.use("/fonts", express.static(__dirname + '/fonts'));
app.use("/sounds", express.static(__dirname + '/sounds'));

app.get('/', function(request, response) { var htmlBuffer = fs.readFileSync('index.html', 'utf-8'); response.send(htmlBuffer); });
app.get('/proprietor', function(request, response) { var htmlBuffer = fs.readFileSync('index.html', 'utf-8'); response.send(htmlBuffer); });
app.get('/contact', function(request, response) { var htmlBuffer = fs.readFileSync('index.html', 'utf-8'); response.send(htmlBuffer); });
app.get('/inc_about.html', function(request, response) { var htmlBuffer = fs.readFileSync('inc_proprietor.html', 'utf-8'); response.send(htmlBuffer); });
app.get('/inc_contact.html', function(request, response) { var htmlBuffer = fs.readFileSync('inc_contact.html', 'utf-8'); response.send(htmlBuffer); });

app.post('/contact', function(request, response) {
  var name = request.body.name;
  var email = request.body.email;
  var mobile = request.body.mobile;
  var message = request.body.message;
  var validation = request.body.validation;
  var out = 'contact name: ' + name 
          + '\ncontact email: ' + email 
          + '\nmobile: ' + mobile 
          + '\nmessage: ' + message
          + '\nvalidation: ' + validation 
          + '\n';
  postmark.send({
    "From": "info@quilombola.com",
    "To": "munair@quilombola.com",
    "Subject": "Contact from www.quilombola.com",
    "TextBody": out,
    "Tag": "registrant"
  }, function(error, success) {
       if(error) {
          console.error("Unable to send via postmark: " + error.message);
         return;
       }
    console.info("Sent to postmark for delivery")
  });

  response.redirect('back');
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
