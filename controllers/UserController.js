const mongoose = require('mongoose'); //libreria para el manejo a la conexion de bases de datos
const User = require("../models/users"); //modelo usuarios.
const AuthController = {}; // objeto que tendra la logica de nuestra web
const bcrypt = require('bcrypt'); //libreria para encriptar

/*nos devuelve la vista signin que es para ingresar al sistema */
AuthController.login = function (req, res, next) {
    res.render('index'); //
}


/*nos devuelve la vista signiup para crear al usuario*/
AuthController.create = function (req, res, next) {
    res.render('Form/registro')
}

AuthController.inicio = function(req,res,next){
    res.render('Inicio/inicio')
}

/*Para crear el usuario*/
AuthController.store = async function (req, res) {
    //obteniendo los datos del usuario
    let user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        birth: req.body.birth,
        description: req.body.description
    }
    console.log(user);
    /*alamcenando el usuario*/
    await User.create(user, (error, user) => {
        if (error) // si se produce algun error
            //Devolvemos una vista con los mensajes de error
            return res.render('registro', { err: error, email: user.email });
        else {
            //Almacenamos los datos de la consulta en el objeto data
            let data = {
                userId: user._id.toString(),
                name: user.name,
                email: user.email,
                password: user.password,
                birth: user.birth,
                description: user.description
            }
            //hash es el mé que nos permite encriptar el password
            //con 10 le indicamos cuantas veces realizara la encriptación
            bcrypt.hash(data.userId, 10, function (err, hash) {
                if (err) { //si produce un error
                    next(err); // retornaremos el error
                }

                data.userId = hash; // almacenamos la password encriptada
                //parseamos el objeto json a cadena y lo alamcenamos en la variable session
                req.session.user = JSON.stringify(data);
                console.log(req.session.user);
                //nos dirigira a la pagina donde se encuentra el perfil del usuario
                return res.redirect('/users/profile');
            });
        }
    })

};


/*nos dirigira al perfil */
AuthController.profile = function (req, res) {
    return res.render('Profile/profile');
}

AuthController.logout = function (req, res, next) {
    if (req.session) { //si la session existe
        req.session.destroy(function (err) { // destruimos la sesion
            if (err) { // si produce un error
                next(err);
            }
            else { //si la sesion se destruyo nos dirigira al index
                res.redirect('/');
            }
        });
    }
}

module.exports = AuthController;