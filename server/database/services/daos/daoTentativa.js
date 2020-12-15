const mysql = require ('mysql');
var transferOfertaServicio = require('../transfers/transferOfertaServicio');
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

// Devuelve el anuncio de servicio que corresponda al id = id_anuncio
function obtenerAnuncioServicio(id_anuncio){
    return knex('anuncio_servicio').where({id: id_anuncio}).select('*');
}

// Devuelve la oferta que tenga el id = "id_oferta"
function obtenerOfertaServicio(id_oferta){
    return obtenerAnuncioServicio(id_oferta).then(function (anuncio){
        return knex('oferta_servicio').where({id: id_oferta}).select('*').then(function (oferta){
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
                oferta[0]['creador']
            );
        });
    });
}
//Elimina todos los elementos de la tabla anuncio_servicio
function limpiarAnuncioServicios(){ 
    knex('anuncio_servicio').del()
      .then( function (result) {
          console.log("Se han eliminado ", result, " elementos de la tabla anuncio_servicio ");     // respond back to request
    })
}

module.exports = {knex, crearOferta, crearAnuncio, limpiarAnuncioServicios, obtenerOfertaServicio};