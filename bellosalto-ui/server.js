const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const app = express();
const appRedirect = express();

var privateKey = fs.readFileSync( '/etc/letsencrypt/live/app.bellosalto.com/privkey.pem' );
var certificate = fs.readFileSync( '/etc/letsencrypt/live/app.bellosalto.com/cert.pem' );

app.use(express.static(__dirname + '/dist/bellosalto-ui'));

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/dist/bellosalto-ui/index.html');
});

appRedirect.get('*', function(req, res) {
  res.redirect('https://' + req.headers.host);
});

https.createServer({
  key: privateKey,
  cert: certificate
}, app).listen(443);

http.createServer(appRedirect).listen(80);


//app.listen(process.env.PORT || 80);