'use strict';
const mongoose = require('mongoose');
var express = require('express');
var app = express();

//Static Files
const CONFIG_FILE = require("./config.json"); 

global.ENV_DATA = (process.env.NODE_ENV)? CONFIG_FILE[process.env.NODE_ENV]: CONFIG_FILE["local"];

console.log(global.ENV_DATA)

mongoose.connect( global.ENV_DATA.database.url, {
    useNewUrlParser: true
}, (err, db) => {
    console.log( (err)? err: "Mongo Connected ...." );
});

var bodyParser = require('body-parser'); 
app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(global.ENV_DATA.port, function () {
   
    var host = server.address().address
    var port = server.address().port

    console.log("Dharma Apis listening at http://%s:%s at %s", host, port, new Date())
});

// //------- ROUTING ----------sss
app.use('/apis/user',require('./src/users/users.routes'));
app.use('/apis/task', require('./src/tasks/tasks.routes'));