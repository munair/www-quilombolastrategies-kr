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

app.get('/', function(request, response) { var htmlBuffer = fs.readFileSync('index.html', 'utf-8'); response.send(htmlBuffer); });
app.get('/services', function(request, response) { var htmlBuffer = fs.readFileSync('index.html', 'utf-8'); response.send(htmlBuffer); });
app.get('/proprietor', function(request, response) { var htmlBuffer = fs.readFileSync('index.html', 'utf-8'); response.send(htmlBuffer); });
app.get('/faq', function(request, response) { var htmlBuffer = fs.readFileSync('index.html', 'utf-8'); response.send(htmlBuffer); });
app.get('/contact', function(request, response) { var htmlBuffer = fs.readFileSync('index.html', 'utf-8'); response.send(htmlBuffer); });
app.get('/inc_services.html', function(request, response) { var htmlBuffer = fs.readFileSync('inc_services.html', 'utf-8'); response.send(htmlBuffer); });
app.get('/inc_proprietor.html', function(request, response) { var htmlBuffer = fs.readFileSync('inc_proprietor.html', 'utf-8'); response.send(htmlBuffer); });
app.get('/inc_faq.html', function(request, response) { var htmlBuffer = fs.readFileSync('inc_faq.html', 'utf-8'); response.send(htmlBuffer); });
app.get('/inc_contact.html', function(request, response) { var htmlBuffer = fs.readFileSync('inc_contact.html', 'utf-8'); response.send(htmlBuffer); });

app.post('/contact', function(request, response) {
  var name = request.body.name;
  var email = request.body.email;
  var mobile = request.body.mobile;
  var referral = request.body.referral;
  var validation = request.body.validation;
  var out = 'contact name: ' + name 
          + '\ncontact email: ' + email 
          + '\nmobile: ' + mobile 
          + '\nreferral: ' + referral
          + '\nvalidation: ' + validation 
          + '\n';
  postmark.send({
    "From": "zumbi@cdoseoul.kr",
    "To": "info@cdoseoul.kr",
    "Subject": "Free Class Signup [www.cdoseoul.kr]",
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
