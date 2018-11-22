
//probar en postman

const mongoose = require('mongoose'),
    postModel = require('../models/post')

const PostController = {
};

PostController.create = function (req, res) {
    res.json({
        okay=true
    });
    //codigo de obtener datos de la peticion 
    let data = {
        nombre: req.body.nombre,
        autor: req.body.autor
    }
    //validar valores 
    if (data.nombre && data.autor && data.nombre != '' && data.autor) {

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
    //guardar en la base de datos 
};

PostController.update = function (params) {
    let update={
        nombre: req.body.nombre,
        autor: req.body.autor
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