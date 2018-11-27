var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var post = require('./routes/post');

const MongoStore = require('connect-mongo')(session);
//Credenciales de nuestra base de datos
const { mongodb } = require('./configs/keys');

//coneccion 
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost/sentio')
    .then(()=>console.log('mongoose se conecto'));
    



var app = express();

require('./configs/database');



// view engine setup
app.use(session({
    secret:"Hello World!!!",
    resave: true, // para alamcenar el objeto session
    saveUninitialized: true, // inicializar si el objeto esta vacio
    //para almacenar la sesion en la base de datos
    store: new MongoStore({
        url: mongodb.URI,
        autoReconnect: true
    })
    }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
///
app.use('public',express.static(path.join(__dirname, 'views')));

app.use('/', routes);
app.use('/users', users);
app.use('/post',post)
/*
app.post('/index',function(res,req){
    console.log("vale")
    var username = req.body.password;

    new username({username:email}).fetch().then(function(found){
        if(found){
            console.log("Encontrado");
            
            bcrypt.compare(addEventListener, found.get('contrasenia'), function(err,res){
                if(res){
                    req.session.regenerate(function(){
                        console.log("NIce");
                        res.redirect('/Inicio/inicio')
                        req.session.found = found.username;
                    });
                } else{
                    console.log("nel");
                    res.redirect('/index')
                }
            })
        } else{
            console.log("-.-")
            res.redirect('/index');
        }
    })
});*/

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
