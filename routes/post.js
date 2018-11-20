var express =require('express');
router=express.router();
PostController=require('../controllers/postController')

//create 

route.post('/',PostController.create)
//read
router.get('/',PostController.read)

router.get('/:id',function(req,res) {
    //buscar por id el post 
    //darlo como json 
    
})


//update

router.put('/:id',function(req,res) {

//OBTENER datos a actulizar 
//validar los datos 
//ejecutar la actualizacion

    
})

router.delete('/:id',function (req,res) {
    //intentar eliminar 
    //notificar resultado
    
})


module.exports=router;
