var express = require('express');
var http = require('http');
var request = require('request');
var unirest = require('unirest');
var app = express();

function openKisi() {
	var options = {
		method		: 'POST',
  		url			: 'http://www.kisi.de/locks/1144/access.json',
		headers		:	{
			'x-authentication-token'	: '92ec5f0786810e611f826dcb53b9bb9f',
     		'content-type'				: 'application/json'
		},
  		body		: JSON.stringify({
			"lock": {
				"channel": null,
				"created_at": "2014-10-17T20:48:44.000Z",
				"gateway_id": 1134,
				"id": 1144,
				"name": "Lobby Door",
				"params": "0,2,1;1,2,0;3,5,1;4,5,0;5,2,1;10,2,0;11,5,1;13,5,0;14,5,1;15,5,0",
				"params_enabled": true,
				"place_id": 868,
				"keys_count": 0,
				"gateway": {
					"enabled": true,
					"online": true
				},
				"current_user_permissions": {
					"destroy": true,
					"share": false
				}
			}
		})
	};

	request(options, function(error, response, body) {
		if (error) throw new Error(error);
		console.log('statusCode: ', response.statusCode);
		console.log('body: ', body);
	})
}

app.get('/', function(req, res) {
	res.send('Hello World');
});

app.get('/open', function(req, res) {
	// var authCode = req.query.auth;
	openKisi();
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var port = normalizePort(process.env.PORT || '3000');


var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
