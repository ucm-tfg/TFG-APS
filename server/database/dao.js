var TUsuario =require("./transfers/TUsuario");
var TAdmin =require("./transfers/TAdmin");
var TOficinaAps=require("./transfers/TOficinaAps");
var TEstudiante=require("./transfers/TEstudiante");
var TEstudianteExterno=require("./transfers/TEstudianteExterno");
var TEstudianteInterno=require("./transfers/TEstudianteInterno");
var TProfesorExterno= require("./transfers/TProfesorExterno");
var TEntidad=require("./transfers/TEntidad");
var TProfesor=require("./transfers/TProfesor");
var TProfesorInterno = require("./transfers/TProfesorInterno");
const mysql = require('mysql');
const knex = require('./config');





function insertarUsuario(usuario){
    console.log(usuario)
    return knex("usuario")
    .insert({origin_login:usuario.getOriginLogin(),origin_img:usuario.getOriginImg(),createdAt:usuario.getCreatedAt(),updatedAt:usuario.getUpdatedAt(),terminos_aceptados: usuario.getTermAcept()})
    .select('id').then(function(result){
        return result;
    })

}

function insertarAdmin(usuario){
  return insertarUsuario(usuario).then(function(idF){
      return knex('datos_personales_interno').insert({correo:usuario.getCorreo(),password:usuario.getPassword(),apellidos:usuario.getApellidos(),nombre:usuario.getNombre()})
      .select('id').then(function(result){
            return knex('admin')
            .insert({ id:idF[0],datos_personales_Id:result[0]}).then(function(resultF){
                console.log("insertado")
            })
        })
})
}

function insertarOficinaAps(usuario){
    return insertarUsuario(usuario).then(function(idF){
        return knex('datos_personales_interno')
        .insert({correo:usuario.getCorreo(),password:usuario.getPassword(),apellidos:usuario.getApellidos(),nombre:usuario.getNombre()})
        .select('id').then(function(result){
              return knex('oficinaaps')
              .insert({ id:idF[0],datos_personales_Id:result[0]})
              .then(function(resultF){
                  console.log("insertado")
              })
          })
  })
  }

  function insertarEstudiante(usuario){
    return insertarUsuario(usuario).then(function(id){
        return knex('estudiante')
        .insert({ id:id[0]})
        .select('id')
        .then(function(resultF){
            return resultF;
        })
      })
}

function insertarEstudianteInterno(usuario){
    return insertarEstudiante(usuario).then(function(idF){
        return knex('datos_personales_interno')
        .insert({correo:usuario.getCorreo(),password:usuario.getPassword(),apellidos:usuario.getApellidos(),nombre:usuario.getNombre()})
        .select('id').then(function(result){
              return knex('estudiante_interno')
              .insert({ id:idF[0],titulacion_local:usuario.getTitulacionLocal(),datos_personales_Id:result[0]})
              .then(function(resultF){
                  console.log("insertado")
              })
          })
  })
  }

  function insertarProfesor(usuario){
    return insertarUsuario(usuario).then(function(id){
        return knex('profesor')
        .insert({ id:id[0]})
        .select('id')
        .then(function(resultF){
            return resultF;
        })
      })
}

  function insertarProfesorInterno(usuario){
    return insertarProfesor(usuario).then(function(idF){
        return knex('datos_personales_interno')
        .insert({correo:usuario.getCorreo(),password:usuario.getPassword(),apellidos:usuario.getApellidos(),nombre:usuario.getNombre()})
        .select('id').then(function(result){
              return knex('profesor_interno')
              .insert({ id:idF[0],titulacion_local:usuario.getTitulacionLocal(),datos_personales_Id:result[0]})
              .then(function(resultF){
                  console.log("insertado")
              })
          })
  })
  }




function insertarEntidad(usuario){
    return insertarUsuario(usuario).then(function(idF){
        return knex('datos_personales_externo')
        .insert({correo:usuario.getCorreo(),password:usuario.getPassword(),apellidos:usuario.getApellidos(),nombre:usuario.getNombre()})
        .select('id').then(function(result){
              return knex('entidad')
              .insert({ id:idF[0],sector:usuario.getSector(),nombre_entidad: usuario.getNombreEntidad(),datos_personales_Id:result[0]})
              .then(function(resultF){
                  console.log("insertado")
              })
          })
  })
  }



function insertarEstudianteExterno(usuario){
    return insertarEstudiante(usuario).then(function(idF){
        return knex('datos_personales_externo')
        .insert({correo:usuario.getCorreo(),password:usuario.getPassword(),apellidos:usuario.getApellidos(),nombre:usuario.getNombre()})
        .select('id').then(function(result){
              return knex('estudiante_externo')
              .insert({ id:idF[0],titulacion:usuario.getTitulacion(),universidad:usuario.getUniversidad(),datos_personales_Id:result[0]})
              .then(function(resultF){
                  console.log("insertado")
              })
          })
  })
  }




function insertarProfesorExterno(usuario){
    return insertarProfesor(usuario).then(function(idF){
        return knex('datos_personales_externo')
        .insert({correo:usuario.getCorreo(),password:usuario.getPassword(),apellidos:usuario.getApellidos(),nombre:usuario.getNombre()})
        .select('id').then(function(result){
              return knex('profesor_externo')
              .insert({ id:idF[0],universidad:usuario.getUniversidad(),datos_personales_Id:result[0]})
              .then(function(resultF){
                  console.log("insertado")
              })
          })
  })
  }


function borrarUsuario(id){
    return knex('usuario').del().where({id:id}).then(function(result){
        console.log(result)
    })
   
}
  

function obtenerUsuario(id){
    
    return knex('usuario').where({id: id}).select('*').then(function (response) {
        //console.log(response[0])
        return response[0];
       //return new TUsuario(response[0]["id"],response[0]["origin_login"],response[0]["origin_img"],response[0]["createdAt"],response[0]["updatedAt"],response[0]["terminos_aceptados"]);

    })
   
    
}

function obtenerDatosPersonalesInterno(id){
 return knex('datos_personales_interno').where({id:id}).select('*').then(function(response){
     return response[0];
 })
}
function obtenerDatosPersonalesExterno(id){
    return knex('datos_personales_externo').where({id:id}).select('*').then(function(response){
        return response[0];
    })
}

function obtenerAdmin(id){
    
    return obtenerUsuario(id).then(function(usuario){
       return  knex('admin').where({id: id}).select('*').then(function (admin) {
          // console.log(admin[0]["datos_personales_Id"])
           return obtenerDatosPersonalesInterno(admin[0]["datos_personales_Id"]).then(function (datos){
               //console.log(datos)
            return new TAdmin(usuario["id"],datos["correo"],datos["nombre"],datos["apellidos"],datos["password"],usuario["origin_login"],usuario["origin_img"],usuario["createdAt"],usuario["updatedAt"],usuario["terminos_aceptados"]);
    
        })
       
    })
})
}

function obtenerOficinaAps(id){
    
    return obtenerUsuario(id).then(function(usuario){
       return  knex('oficinaaps').where({id: id}).select('*').then(function (admin) {
           return obtenerDatosPersonalesInterno(admin[0]["datos_personales_Id"]).then(function (datos){
              // console.log(datos)
            return new TAdmin(usuario["id"],datos["correo"],datos["nombre"],datos["apellidos"],datos["password"],usuario["origin_login"],usuario["origin_img"],usuario["createdAt"],usuario["updatedAt"],usuario["terminos_aceptados"]);
    
        })
       
    })
})
}


function obtenerEntidad(id){
    
    return obtenerUsuario(id).then(function(usuario){
       return  knex('entidad').where({id: id}).select('*').then(function (entidad) {
           return obtenerDatosPersonalesExterno(entidad[0]["datos_personales_Id"]).then(function (datos){
               //console.log(datos)
            return new TEntidad(usuario["id"],datos["correo"],datos["nombre"],datos["apellidos"],datos["password"],usuario["origin_login"],usuario["origin_img"],usuario["createdAt"],usuario["updatedAt"],usuario["terminos_aceptados"],entidad[0]["sector"],entidad[0]["nombre_entidad"]);
    
        })
       
    })
})
}

function obtenerProfesor(id){
    return obtenerUsuario(id).then(function(usuario){
        return  knex('profesor').where({id: id}).select('*').then(function (profesor) { 
            return profesor[0];
             //return new TEntidad(usuario["id"],datos["correo"],datos["nombre"],datos["apellidos"],datos["password"],usuario["origin_login"],usuario["origin_img"],usuario["createdAt"],usuario["updatedAt"],usuario["terminos_aceptados"],entidad[0]["sector"],entidad[0]["nombre_entidad"]);
     })
 })
}

function obtenerProfesorInterno(id){
    return obtenerUsuario(id).then(function(usuario){
            return obtenerProfesor(id).then(function (profesor) {
                return knex('profesor_interno').where({id: id}).select('*').then(function(profesorInterno){
                    return obtenerDatosPersonalesInterno(profesorInterno["datos_personales_Id"]).then(function (datos){
                          return new TProfesorInterno(usuario["id"],datos["correo"],datos["nombre"],datos["apellidos"],datos["password"],usuario["origin_login"],usuario["origin_img"],usuario["createdAt"],usuario["updatedAt"],usuario["terminos_aceptados"]);
                    
                })
            })
         }) 
 })
}

function obtenerProfesorExterno(id){
    return obtenerUsuario(id).then(function(usuario){
            return obtenerProfesor(id).then(function (profesor) {
                return knex('profesor_externo').where({id: id}).select('*').then(function(profesorExterno){
                    return obtenerDatosPersonalesExterno(profesorExterno["datos_personales_Id"]).then(function (datos){
                          return new TProfesorExterno(usuario["id"],datos["correo"],datos["nombre"],datos["apellidos"],datos["password"],usuario["origin_login"],usuario["origin_img"],usuario["createdAt"],usuario["updatedAt"],usuario["terminos_aceptados"],profesorExterno["universidad"]);
                    
                })
            })
         }) 
 })
}

function obtenerEstudiante(id){
    return obtenerUsuario(id).then(function(usuario){
        return  knex('estudiante').where({id: id}).select('*').then(function (estudiante) { 
            return estudiante[0];
             //return new TEntidad(usuario["id"],datos["correo"],datos["nombre"],datos["apellidos"],datos["password"],usuario["origin_login"],usuario["origin_img"],usuario["createdAt"],usuario["updatedAt"],usuario["terminos_aceptados"],entidad[0]["sector"],entidad[0]["nombre_entidad"]);
     })
 })
}

function obtenerEstudianteInterno(id){
    return obtenerUsuario(id).then(function(usuario){
            return obtenerEstudiante(id).then(function (profesor) {
                return knex('estudiante_externo').where({id: id}).select('*').then(function(estudianteInterno){
                    return obtenerDatosPersonalesInterno(estudianteInterno["datos_personales_Id"]).then(function (datos){
                          return new TEstudianteInterno(usuario["id"],datos["correo"],datos["nombre"],datos["apellidos"],datos["password"],usuario["origin_login"],usuario["origin_img"],usuario["createdAt"],usuario["updatedAt"],usuario["terminos_aceptados"],profesorExterno["universidad"]);
                    
                })
            })
         }) 
 })
}


function obtenerEstudianteExterno(id){
    return obtenerUsuario(id).then(function(usuario){
            return obtenerEstudiante(id).then(function (profesor) {
                return knex('estudiante_externo').where({id: id}).select('*').then(function(estudianteExterno){
                    return obtenerDatosPersonalesExterno(estudianteExterno["datos_personales_Id"]).then(function (datos){
                          return new TEstudianteExterno(usuario["id"],datos["correo"],datos["nombre"],datos["apellidos"],datos["password"],usuario["origin_login"],usuario["origin_img"],usuario["createdAt"],usuario["updatedAt"],usuario["terminos_aceptados"],profesorExterno["universidad"]);
                    
                })
            })
         }) 
 })
}


  function obtenerProfesoresInternos(arrayProfesores){

    return knex.raw('select * from usuario where id in (' + arrayProfesores.map(_ => '?').join(',') + ')', [...arrayProfesores]).then(function(result){  
        return knex.raw('select * from profesor where id in (' + arrayProfesores.map(_ => '?').join(',') + ')', [...arrayProfesores]).then(function(result2){
           return knex.raw('select * from profesor_interno where id in (' + arrayProfesores.map(_ => '?').join(',') + ')', [...arrayProfesores]).then(function(profesorInterno){
            let arrayp=[], arrayT=[], aux=null,arrayF=[];
           
            profesorInterno[0].forEach(element => {
                arrayT.push(element)
                 arrayp.push(element["datos_personales_Id"])
            });
            
            return knex.raw('select * from datos_personales_interno where id in (' + arrayp.map(_ => '?').join(',') + ')', [...arrayp]).then(function(profesorInternoD){

               arrayT.forEach(element2 => {
                result[0].forEach(element3=>{
                    if(element2["id"]===element3["id"]){
                        profesorInternoD[0].forEach(element4=>{
                           if(element2["datos_personales_Id"]===element4["id"]){
                            
                                aux={
                                    id:element2["id"],
                                    correo: element4["correo"],
                                    apellidos: element4["apellidos"],
                                    nombre: element4["nombre"],
                                    password:element4["password"],
                                    origin_login:element3["origin_login"],
                                    origin_img:element3["origin_img"],
                                    createdAt:element3["createdAt"],
                                    updatedAt:element3["updatedAt"],
                                    terminos_aceptados:element3["terminos_aceptados"]
                                    
                                }
                                arrayF.push(aux);
                           }
                        });
                    }
                });
             });
             return arrayF

              })
          })
        })
    })
  

}

module.exports={obtenerUsuario,insertarAdmin,insertarOficinaAps,insertarUsuario,borrarUsuario,obtenerProfesoresInternos,obtenerOficinaAps,obtenerProfesor,obtenerEntidad,obtenerAdmin,knex};