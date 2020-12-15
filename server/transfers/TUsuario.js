class TUsuario{
   
    constructor(correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados){
        this.correo=correo;
        this.nombre=nombre;
        this.apellidos=apellidos;
        this.password=password;
        this.origin_login=origin_login;
        this.origin_img=origen_img;
        this.createdAt=createdAt;
        this.updatedAt=updatedAt;
        this.terminos_aceptados=terminos_aceptados;
    }
    constructor(id,correo,nombre,apellidos,password,origin_login,origin_img,createdAt,updatedAt,terminos_aceptados){
        this.id=id;
        this.correo=correo;
        this.nombre=nombre;
        this.apellidos=apellidos;
        this.password=password;
        this.origin_login=origin_login;
        this.origin_img=origen_img;
        this.createdAt=createdAt;
        this.updatedAt=updatedAt;
        this.terminos_aceptados=terminos_aceptados;
    }
   
    getId(){
        return this.id;
     }
 
     setId(id){
         this.id=id;
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

     getOriginLogin(){
        return this.origin_login;
     }
 
     setOriginLogin(originL){
         this.origin_login=originL;
     }

     getOriginImg(){
        return this.origin_img;
     }
 
     setOriginImg(origin_img){
         this.origin_img=origin_img;
     }

     
     getCreatedAt(){
        return this.createdAt;
     }
 
     setCreatedAt(createdAt){
         this.createdAt=createdAt;
     }

     getUpdatedAt(){
     return this.updatedAt;
    }

    setCreatedAt(updatedAt){
        this.updatedAt=updatedAt;
    }

    getTermAcept(){
        return this.terminos_aceptados;
       }
   
    setTermAcept(term){
           this.terminos_aceptados=term;
     }
}
