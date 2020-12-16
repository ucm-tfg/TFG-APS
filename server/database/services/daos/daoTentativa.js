const transferOfertaServicio = require('../transfers/transferOfertaServicio');
const transferMensaje = require('../transfers/transferMensajes');
const transferUpload = require('../transfers/transferUpload');
const daoComunicacion = require('./daoComunicacion');
const daoUsuario = require('./daoUsuario');
const mysql = require ('mysql');
const knex = require("knex")({
    client: "mysql",
    connection: "postgres://root:@localhost:3306/aps",
    pool : { min:0, max:10 }
});

// Inserta en la base de datos un nuevo anuncio de servicio
function crearAnuncio(titulo, descripcion, imagen){
    return knex('anuncio_servicio').insert({titulo:titulo, descripcion:descripcion, imagen:imagen,
        _v:0.9})
}

// Inserta en la base de datos una nueva oferta de servicio
function crearOferta(titulo, descripcion, imagen, asignatura, cuatrimestre, anio, fecha_limite, observaciones, creador){
    return crearAnuncio(titulo, descripcion, imagen).then(function(id_anuncio){
        return knex('oferta_servicio').insert({id: id_anuncio[0], asignatura_objetivo: asignatura, cuatrimestre:cuatrimestre,
            anio_academico: anio, fecha_limite: fecha_limite, observaciones_temporales: observaciones, creador: creador })
            .then( function (result) {
                console.log("Se ha introducido la oferta con id ", id_anuncio[0]);     // respond back to request
            }); 
    })
}

// Obtiene el area de servicio correspondiente al id de un anuncio de servicio
function obtenerAreaServicio(id_anuncio){
    return knex('areaservicio_anuncioservicio').where({id_anuncio: id_anuncio}).select('id_area')
        .then(function(id_area){
            return knex('area_servicio').where({id: id_area}).select('nombre');
    })
    .catch((err) => { console.log( "No se ha encontrado el area de servicio perteneciente al anuncio de servicio con id ", id_anuncio); throw err});
}

// Devuelve todos los mensajes pertenecientes al anuncio de servicio con id=id_anuncio
function obtenerMensajesPorAnuncio(id_anuncio){
    return knex('mensaje_anuncioservicio').where({id_anuncio: id_anuncio}).select('id_mensaje')
        .then(function (id_mensajes){
            return daoComunicacion.obtenerMensajes(id_mensajes); //Esto devuelve un array de transferMensaje
        });
}

// Devuelve todos los mensajes pertenecientes al anuncio de servicio con id=id_anuncio
function obtenerUploadsPorAnuncio(id_anuncio){
    return knex('upload_anuncioservicio').where({id_anuncio: id_anuncio}).select('id_upload')
        .then(function (id_uploads){
            return daoComunicacion.obtenerUploads(id_uploads); //Esto devuelve un array de transferUpload
        });
}

// Devuelve todos los profesores pertenecientes al anuncio de servicio con id=id_anuncio
function obtenerProfesoresPorOferta(id_oferta){
    return knex('profesorinterno_oferta').where({id_oferta: id_oferta}).select('id_profesor')
        .then(function (id_profesores){
            return daoUsuario.obtenerProfesoresInternos(id_profesores); //Esto devuelve un array de transferUpload
        });
}

// Devuelve el anuncio de servicio que corresponda al id = id_anuncio
function obtenerAnuncioServicio(id_anuncio){
    return knex('anuncio_servicio').where({id: id_anuncio}).select('*');
}

// Devuelve la oferta que tenga el id = "id_oferta"
function obtenerOfertaServicio(id_oferta){
    return obtenerAnuncioServicio(id_oferta).then(function (anuncio){
       return knex('oferta_servicio').where({id: id_oferta}).select('*').then(function (oferta){
           return obtenerAreaServicio(id_oferta).then(function(area_servicio){
               return obtenerMensajesPorAnuncio(id_oferta).then( function(mensajes){
                   return obtenerUploadsPorAnuncio(id_oferta).then( function(uploads){
                       return obtenerProfesoresPorOferta(id_oferta).then( function(profesores){
                            const transferOferta = new transferOfertaServicio(
                                oferta[0]['id'],
                                anuncio[0]['titulo'],
                                anuncio[0]['descripcion'],
                                anuncio[0]['imagen'],
                                anuncio[0]['created_at'],
                                anuncio[0]['updated_at'],
                                anuncio[0]['_v'],
                                oferta[0]['asignatura_objetivo'],
                                oferta[0]['cuatrimestre'],
                                oferta[0]['anio_academico'],
                                oferta[0]['fecha_limite'],
                                oferta[0]['observaciones_temporales'],
                                oferta[0]['creador'],
                                area_servicio[0]['nombre'],
                                mensajes,
                                uploads,
                                profesores
                            );
                       });
                   });
               });
            });
        });
    })
    .catch((err) => { 
        console.log( err);
        console.log("Se ha producido un error al intentar obtener de la base de datos la oferta de servicio con id ", id_oferta);
    })
    .finally(() => {
        knex.destroy();
    });
}

//Elimina todos los elementos de la tabla anuncio_servicio
function limpiarAnuncioServicios(){ 
    knex('anuncio_servicio').del()
      .then( function (result) {
          console.log("Se han eliminado ", result, " elementos de la tabla anuncio_servicio ");     // respond back to request
    })
}

module.exports = {knex, crearOferta, crearAnuncio, limpiarAnuncioServicios, obtenerOfertaServicio, obtenerMensajesPorAnuncio};