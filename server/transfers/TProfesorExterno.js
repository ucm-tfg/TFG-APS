class TProfesorExterno extends TProfesor{
    constructor(correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados,universidad){
        super(correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados);
    }
    constructor(id,correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados){
        super(id,correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados);
 
    }

}