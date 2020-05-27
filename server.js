'use strict';
const mongoose = require('mongoose');
var express = require('express');
var app = express();

//Static Files
const CONFIG_FILE = require("./config.json"); 

global.ENV_DATA = (process.env.NODE_ENV)? CONFIG_FILE[process.env.NODE_ENV]: CONFIG_FILE["local"];

mongoose.connect( global.ENV_DATA.database.url, {
    useNewUrlParser: true
}, (err, db) => {
    console.log( (err)? err: "Mongo Connected ...." );
});

var bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var server = app.listen(global.ENV_DATA.port, function () {
   
    var host = server.address().address
    var port = server.address().port

    console.log("Dharma Apis listening at http://%s:%s at %s", host, port, new Date())
});

// //------- ROUTING ----------sss
app.use('/apis/user',require('./src/users/users.routes'));
app.use('/apis/task', require('./src/tasks/tasks.routes'));
app.use('/apis/city', require('./src/cities/cities.routes'));
app.get("/apis/document", function(req,res){

    res.sendFile('./apidoc/index.html');

})