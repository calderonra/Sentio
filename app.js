'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var use_routes = require('./routes/users');

var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var createError = require('http-errors');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

var routes = require('./routes/index');
var users = require('./routes/users');
var post = require('./routes/post');

const MongoStore = require('connect-mongo')(session);
//Credenciales de nuestra base de datos
const { mongodb } = require('./configs/keys');

//coneccion 
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://usuariosdb:12345678a@ds245357.mlab.com:45357/usuarios')
    .then(()=>console.log('mongoose se conecto'));
    





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
//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//routes
app.use('/api',use_routes);
//exports
module.exports=app;

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
///
app.use('public',express.static(path.join(__dirname, 'views')));

app.use('/', routes);
app.use('/users', users);
app.use('/users/post',post);

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

//autentication with passport
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
    app.locals.signupMessage= req.flash('signupMessage');
    app.locals.signinMessage= req.flash('signinMessage');
    app.locals.user = req.user;
    next();
})


module.exports = app;
