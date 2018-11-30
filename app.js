'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var use_routes = require('./api/routes/users');

var routes = require('./api/routes/index');

var register = require('./api/routes/users');



//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//routes
app.use('/api',use_routes);

//exports
module.exports=app;

