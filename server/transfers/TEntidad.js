class TEstudiante extends TUsuario{
    constructor(correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados,sector,nombre_entidad){
        super(correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados);
        this.sector=sector;
        this.nombre_entidad=nombre_entidad;
    }
    constructor(id,correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados,sector,nombre_entidad){
        super(id,correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados);
        this.sector=sector;
        this.nombre_entidad=nombre_entidad;
    }

    getSector(){
        return this.sector;
    }

    setSector(sector){
        this.sector=sector;
    }

    getNombreEntidad(){
        return this.nombre_entidad;
    }

    setNombreEntidad(nombre_entidad){
        this.nombre_entidad=nombre_entidad;
    }
}
