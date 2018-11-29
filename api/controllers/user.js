"use strict"
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function home(req, res) {
    res.status(200).send({
        message: "Hola y bienvenido a nuevo curso de C++"
    });
}

function pruebas(req, res) {
    res.status(200).send({
        message: 'hola mundo desde el server'
    });
}

function saveUser(req, res) {
    var params = req.body;
    var user = new User();

    if (params.name && params.surname && params.nick && params.email && params.password) {
        user.name = params.name;
        user.surname = params.surname;
        user.nick = params.nick;
        user.email = params.email;
        user.role = 'ROLE.USER';
        user.image = null;

        //Validación de usuarios ya creados
        User.find({
            $or: [
                { nick: user.nick.toLowerCase() },
                { email: user.email.toLowerCase() }
            ]
        }).exec((err, users) => {
            if (err) return res.status(500).send({ message: 'Error en la petición de usuarios' });
            if (users && users.length >= 1) {
                return res.status(200).send({ message: 'El usuario que intenta registrar ya existe' });
            } else {
                //Encriptcion contra y guardar user
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    user.password = hash;

                    user.save((err, userStored) => {
                        if (err) return res.status(500).send({ message: 'No se pudo guardar el usuario' });

                        if (userStored) {
                            res.status(200).send({ user: userStored });
                        } else {
                            res.status(404).send({ message: 'No se ha registradon el usuario' });
                        }
                    });
                });
            }
        });

    } else {
        res.status(200).send({
            message: 'Error al ingresar datos'
        });
    }
}

function loginUser(req,res){
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email:email},(err,user)=>{
         
        
        if (err) return res.status(500).send({message: 'Error en la peticion'});
    
        if(user){
            bcrypt.compare(password, user.password,(err, check)=>{
                if (check){
                    if(params.gettoken){
                        //devolver token
                        //generar token
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        }); 
                    }else{
                        //devuelve los datos del usuario
                    user.password = undefined;
                    return res.status(200).send({user});
                    }
                }
                else{
                    return res.status(404).send({message: 'El usario no se ha podido indentifcar'})
                }
            });
        }else{
            return res.status(404).send({message: 'El usario no se ha podido indentifcar'})
        }
    });
}

module.exports = {
    home,
    pruebas,
    saveUser,
    loginUser
}