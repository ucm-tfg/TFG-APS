class TProfesorInterno extends TProfesor{
    constructor(correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados,universidad){
        super(correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados);
        this.universidad=universidad;
    }
    constructor(id,correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados,universidad){
        super(id,correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados);
        this.universidad=universidad;
 
    }

    getUniversidad(){
        return this.universidad;
    }

    setUniversidad(universidad){
        this.universidad=universidad;
    }
}