class TEstudianteExterno extends TEstudiante{
    constructor(correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados,universidad,titulacion){
        super(correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados);
        this.universidad=universidad;
        this.titulacion=titulacion;
    }
    constructor(id,correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados,universidad,titulacion){
        super(id,correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados);
        this.universidad=universidad;
        this.titulacion=titulacion;
    }

    getUniversidad(){
        return this.universidad;
    }

    setUniversidad(universidad){
        this.universidad=universidad;
    }

    getTitulacion(){
        return this.titulacion;
    }

    setTitulacion(titulacion){
        this.titulacion=titulacion;
    }
}