/*
 * HEP-PUBSUB Interface Controller
 * (C) 2019 QXIP BV
 */

try {
  var config = require('./config.js');
} catch(e) { console.log('Missing config!',e); process.exit(1); }

var AWS = require("aws-sdk");
var express = require('express');
const app = express();
const request = require('request');
var bodyParser = require("body-parser");
app.use(bodyParser.json());

var port = config.service.port;

// API SETTINGS
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   next();
});

app.post('/get/:id', function (req, res) {
	var data = { params: req.params, body: req.body }
	console.log('NEW API POST REQ', data);
	var args = processArgs(req.params, req.body?.data, config.cloudwatchDefaults);
	new AWS.CloudWatchLogs({region:args.region})
		.filterLogEvents(args.retrieveLogsParameters)
		.promise()
		.then(data => res.send(data))
		.catch(err => console.error(err));
})

app.listen(port, () => console.log('Cloudwatch integration Server started',port))

// HEP PUBSUB Hooks
var api = config.backend;
const uuidv1 = require('uuid/v1');
var uuid = uuidv1();
var ttl = config.service.ttl;
var token = config.token;

var publish = function(){

  try {
    var settings = config.service;
    settings.uuid = uuid;  
    
    const data = JSON.stringify(settings)

    const options = {
        url: api,
        method: 'POST',
        json: settings,
        headers: {
          'Auth-Token': token
        }
    }
    
    if (config.debug) console.log("Body:", JSON.stringify(options));

    request(options, function (error, response, body) {
        if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
            if (config.debug) {              
                console.log("RESPONSE API:", body) // Print the shortened url.
            }
        } else {
            if (config.debug) {
                if(body && body.message) console.log('REGISTER API ERROR: ', body.message);
                else console.log('REGISTER UNKNOWN ERROR: ', error);
            }
        }
    });        

  } catch(e) { console.error(e) }
}

/* REGISTER SERVICE w/ TTL REFRESH */
if (ttl) {
	publish();
	/* REGISTER LOOP */
	setInterval(function() {
	   publish()
	}, (.9 * ttl)*1000 );
}


function processArgs(params, body, defaults) {

	var result = defaults == undefined ? {} : defaults;
	if (result.retrieveLogsParameters == undefined)
		result.retrieveLogsParameters = {};

	for (var key in params)
		setValue(key, params[key],result);
	for (var key in body)
		setValue(key, body[key],result);
	return result;	
}

function setValue(key, value, result) {
	if (key == 'region') result.region = value;
	else if (key == 'filterPattern') result.retrieveLogsParameters['filterPattern'] = '\"'+value+'\"';
	else if (key == 'logGroupKey') result.retrieveLogsParameters['logGroupName'] = config.cloudwatchDefaults.logGroupName[value];
	else result.retrieveLogsParameters[key] = value;
}

/* END */


