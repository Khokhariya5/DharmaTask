'use strict';
var express = require('express');
var app = express();

//Static Files
const CONFIG_FILE = require("./config.json"); 

//Routes
require('./src/index.routes')(app);

const ENV_DATA = (process.env.NODE_ENV)? CONFIG_FILE[process.env.NODE_ENV]: CONFIG_FILE["local"];

var server = app.listen(ENV_DATA.port, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Dharma Apis listening at http://%s:%s at %s", host, port, new Date())
});