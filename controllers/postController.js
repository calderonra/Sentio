
//probar en postman

const mongoose = require('mongoose'),
    postModel = require('../models/post')

const PostController = {
};

PostController.create = function (req, res) {
    /*res.json({
        okay:true
    });*/
    //codigo de obtener datos de la peticion 
    let post= new postModel({
        nombre: req.body.nombre,
        contenido:req.body.contenido,
        rutaImagen: req.body.ruta 
    });
    post.save(function(error){
        if(error)   
            res.status(500);
        else
        res.json({message: 'Almacenado con exito' } );
    });
    //validar valores 
    /*console.log(data);
    if (data.nombre && data.contenido && data.rutaImagen != '' && data.autor) {

    } else {
        res.status(400);
        res.jason({ err: { code: 400, message: 'faltan datos' } });
    }
    //crear un objeto post
    let nuevoPost = new postModel(data);
    nuevoPost.save(function (err) {
        if (err) {
            res.status(500);
        } else {
            res.json({ ok: true, message: 'se guardo con exito' })
        }
    })
    //guardar en la base de datos */
};

PostController.getAll = function (req, res) {
    // Obtener todos los post de la base datos
    postModel.find({},function(err, posts){
        if (err) {
            res.status(500);
            res.json({code:500, err});
        } else {
            res.json({ ok:true , posts});
        }
    });
    
};


PostController.get = function (req, res) {
    // Buscar por id, el psot
    postModel.findOne({_id: req.params.id }, function(err, post){
        if (err) {
            res.status(500);
            res.json({code:500, err});
        } else {
            res.json({ok: true, post});
        }
    });
    // si se encontro darlo como JSON
    // sino err
}


PostController.update = function (params) {
    let update={
        
        nombre: req.body.nombre,
        contenido:req.body.contenido,
        rutaImagen: req.body.rutaImagen
    }
    //ejecuta la update 
    postModel.findByIdAndUpdate(req.params.id, update, function (err, old) {
        if (err) {
            res.status(500);
        } else {
            res.json({ ok: true,old,update})
        }
    })

}

PostController.delete=function (params) {
    postModel.findByIdAndRemove(req.params.id, update, function (err, old) {
        if (err) {
            res.status(500);
        } else {
            res.json({ ok: true,old,update})
        }
    })
}




PostController.read = function (req, res) {
    //obtener todos los post de la base de datos y enviarlos como respuesta json
};
module.exports = PostController;