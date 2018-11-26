var express = require('express');
var router = express.Router();

const AuthController = require("../controllers/UserController");
//Requerimos el Middelware que hemos creado
const AuthMiddleware = require("../middlewares/AuthMiddleware")
//Requerimos el modelo
const User = require("../models/users");

/* GET users listing. */
router.get('/', function (req, res) {
  res.send('respond with a resource');
});

router.get('/inicio',AuthController.inicio);

router.get('/profile',AuthController.profile);

router.get('/Editar-perfil',AuthController.editProfile);
//router.get('/inicio', AuthController.login);

//router.get('/index',AuthController.signin);

//ruta que nos devolvera el formulario para crear usuarios
router.get('/registro', AuthController.create);
//ruta que enviara los datos del usuario para almacenarlos en la base de datos
router.post('/registro', AuthController.store);
//ruta que nos devolvera el formulario para ingresar
router.get('/')
router.get('/index', AuthController.login);
//ruta que enviara los datos del usuario para ingresar al sistema
router.post('/index',AuthController.signin);

//ruta para salir del sistema
//router.get('/logout', AuthController.logout);
/*Middleware que verifica que solo los usuarios registrados podran ingresar a esta seccion */
router.use(AuthMiddleware.isAuthentication);

module.exports = router;

