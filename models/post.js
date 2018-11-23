const mongoose = require('mongoose');
//Creamos el modelo del objeto que ira a la base de datos 
let postmodel=new mongoose.Schema({
    nombre:{
        type:String,
        unique=true,
        index: true
    },
    contenido:String,
    rutaImagen:String 
});

module.exports=mongoose.model('post',postmodel);