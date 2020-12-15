class TEstudiante extends TUsuario{
    constructor(correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados){
    super(correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados);
    }
    constructor(id,correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados){
     super(id,correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados);
    }

    
}

module.exports= TEstudiante;