function validar(){
    var nombre, correo, contra, cuentanos, exp, exp1, exp2, exp3;
    nombre = document.getElementById("nombre").value;
    correo = document.getElementById("e-mail").value;
    contra = document.getElementById("contrasena").value;
    cuentanos = document.getElementById("cuentanos").value;

    exp = /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/;
    exp1 = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    exp2 =/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    exp3 = /^[A-Za-z0-9\s]+$/;

    if(nombre === ""){
        alert("No ha ingresado un nombre");
        return false;
    }
    else if(nombre.length>25){
        alert("El nombre es demasiado extenso");
        return false;
    }
    else if(!exp.test(nombre)){
        alert("Tiene que ingresar al menos un nombre y un apellido");
        return false;
    }
    else if(correo === ""){
        alert("El campo e-mail esta vacío");
        return false;
    }
    else if(correo.length>25){
        alert("El correo es demasiado extenso");
        return false;
    }
    else if(!exp1.test(correo)){
        alert("El correo no es válido");
        return false;
    }
    else if(contra ===""){
        alert("Por favor introduzca una contraseña");
        return false;
    }
    else if(contra.length>10){
        alert("La contraseña debe tener 20 caracteres como máximo");
        return false;
    }
    else if(!exp2.test(contra)){
        alert("Debe contener al menos un número, una letra mayúscula y minúscula, y al menos 8 o más caracteres");
        return false;
    }
}