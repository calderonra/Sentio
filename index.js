'use strict'

var mongoose= require('mongoose');
var app = require('./app');
var port=  3800;


//conexion a la bd 
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/Sentio-pruebas')
    .then(()=>{
        console.log("se conecto a la BD");
        //crear server
        app.listen(port,()=>{
            console.log("Server creado ");
        });
    })
    .catch(err => console.log(err));