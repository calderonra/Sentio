'use strict'

var mongoose= require('mongoose');
var app = require('./app');
var port=  3800;


//conexion a la bd 
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://usuariosdb:12345678a@ds245357.mlab.com:45357/usuarios')
    .then(()=>{
        console.log("se conecto a la BD");
        //crear server
        app.listen(port,()=>{
            console.log("Server creado ");
        });
    })
    .catch(err => console.log(err));