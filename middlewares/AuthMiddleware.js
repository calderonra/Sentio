<<<<<<< HEAD
const AuthMiddleware = {};
 
 
=======
 const AuthMiddleware={};
>>>>>>> 0861f3b4c60d2055a32f59530a48eaeb40fa9548
 //middleware que verifica si una persona esta logueada
 AuthMiddleware.isAuthentication = function (req, res, next) {
    if(!req.session.user) // verificamos is existe la session
    {
        return res.redirect('/'); //redirigimos al index si esto no es posible
    }
    //si existe la sesion parsea el contenido
    data = JSON.parse(req.session.user);
    User.findOne({ email: data.email })
        .exec(function (err, user) {
            if (err) {
                return next(err);
            }
            else {
                if (!user) {
                    return res.redirect('/');
                }
                else {
                    bcrypt.compare(data.userId, user._id.toString(), function (err, result) {
                        console.log("llego aca", data.userId);
                        if (result == true) {
                            return next();
                        }
                        else {
                            return next(err);
                        }
                    });
                }
            }
        });
};

module.exports = AuthMiddleware;