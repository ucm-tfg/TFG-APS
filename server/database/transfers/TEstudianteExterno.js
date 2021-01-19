const TEstudiante =require("./TEstudiante")
class TEstudianteExterno extends TEstudiante{
    constructor(id,correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados,universidad,titulacion){
        super(id,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados);
        this.correo=correo;
        this.nombre=nombre;
        this.apellidos=apellidos;
        this.password=password;
        this.universidad=universidad;
        this.titulacion=titulacion;
    }
    getNombre(){
        return this.nombre;
     }
 
     setNombre(nombre){
         this.nombre=nombre;
     }
 
     getCorreo(){
         return this.correo;
      }
  
      setCorreo(correo){
          this.correo=correo;
      }
 
      getApellidos(){
         return this.apellidos;
      }
    
      setApellidos(apellidos){
          this.apellidos=apellidos;
      }
      getPassword(){
         return this.password;
      }
  
      setPassword(password){
          this.password=password;
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

module.exports= TEstudianteExterno;