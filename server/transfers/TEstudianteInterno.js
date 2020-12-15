class TEstudianteInterno extends TEstudiante{
    constructor(correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados,titulacion_local){
        super(correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados);
        this.titulacion_local=titulacion_local;
    }
    constructor(id,correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados,titulacion_local){
        super(id,correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados);
        this.titulacion_local=titulacion_local;
    }

    getTitulacionLocal(){
        return this.titulacion_local;
    }

    setTitulacionLocal(titulacion_local){
        this.titulacion_local=titulacion_local;
    }
}

module.exports= TEstudianteInterno;