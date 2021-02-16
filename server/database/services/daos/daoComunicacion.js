const transferMensaje = require('../transfers/transferMensajes');
const transferUpload = require('../transfers/transferUpload');
const mysql = require ('mysql');
const transferMensajes = require('../transfers/transferMensajes');
const knex = require('../../config');

// Devuelve todos los uploads que coincidan con los ids idUploads
function obtenerUploads(idUploads){
    return knex('upload').where({
        id: idUploads
    }).select('*').then((upload) => {
        return new transferUpload(
            idUploads,
            upload[0]['almacenamiento'],
            upload[0]['campo'],
            upload[0]['tipo'],
            upload[0]['tipo_id'],
            upload[0]['path'],
            upload[0]['client_name'],
            upload[0]['nombre'],
            upload[0]['creador'],
            upload[0]['createdAt'],
            upload[0]['updatedAt'],
            upload[0]['_v']
        );
    });
}

// Devuelve todos los mensajes que coincidan con los ids idMensajes
function obtenerMensajes(idMensajes){
    return knex('mensaje').where({
        id: idMensajes
    }).select('*').then((mensaje) =>{
        return new transferMensajes(
            idMensajes,
            mensaje[0]['texto'],
            mensaje[0]['fecha'],
            mensaje[0]['usuario']
        );
    });
}

//Devuelve todos los mensajes de un anuncio
function obtenerMensajesAnuncio(idAnuncio){
    return knex('mensaje_anuncioservicio').where({
        id_anuncio: idAnuncio
    }).select('id_mensaje').then((men) =>{
       // console.log(men);
        mensajes = [];
        for(m of men){
            m2 = Object.assign({}, m);
            id = m2['id_mensaje'];
           // console.log(id);
            obtenerMensajes(id).then(function(mensaje){
                mensajes.push(mensaje);
                //console.log(mensajes);
            });
        }
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar sacar todos los mensajes del anuncio ", idAnuncio);
    });
}

//Devuelve todos los mensajes de una colaboración
function obtenerMensajesColab(idColab){
    return 0;
}

//crea un nuevo mensaje
function crearMensajeAnuncio(texto, fecha, usuario, anuncio){//funciona
    return knex('mensaje').insert({
        texto: texto, fecha: fecha, usuario: usuario
    }).then((id_mensaje) =>{
        return knex('mensaje_anuncioservicio').insert({
            id_mensaje: id_mensaje, id_anuncio: anuncio
        }).then(() => {
            return id_mensaje;
        });
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar crear el mensaje con texto ", texto);
    });
}

function crearMensajeColab(texto, fecha, usuario, colaboracion){//funciona
    return knex('mensaje').insert({
        texto: texto, fecha: fecha, usuario: usuario
    }).then((id_mensaje) =>{
        return knex('mensaje_colaboracion').insert({
            id_mensaje: id_mensaje, id_colaboracion: colaboracion
        }).then(() => {
            return id_mensaje;
        });
    })
    .catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar crear el mensaje con texto ", texto);
    });
}

//crea un nuevo upload
function crearUploadAnuncio(almacenamiento, campo, tipo, tipo_id, path, client_name, nombre, creador, createdAt, updatedAt, _v, anuncio){
    return knex('upload').insert({
        almacenamiento: almacenamiento, campo: campo, tipo: tipo, tipo_id: tipo_id, path: path, client_name: client_name, nombre: nombre, creador: creador, createdAt: createdAt, updatedAt: updatedAt, _v: _v
    }).then((id_upload) =>{
        return knex('upload_anuncioservicio').insert({
            id_upload: id_upload, id_anuncio: anuncio
        }).then(() => {
            return id_upload;
        });
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar crear el upload con nombre ", nombre);
    });
}

function crearUploadColab(almacenamiento, campo, tipo, tipo_id, path, client_name, nombre, creador, createdAt, updatedAt, _v, colaboracion){
    return knex('upload').insert({
        almacenamiento: almacenamiento, campo: campo, tipo: tipo, tipo_id: tipo_id, path: path, client_name: client_name, nombre: nombre, creador: creador, createdAt: createdAt, updatedAt: updatedAt, _v: _v
    }).then((id_upload) =>{
        return knex('uploads_colaboracion').insert({
            id_upload: id_upload, id_colaboracion: colaboracion
        }).then(() => {
            return id_upload;
        });
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar crear el upload con nombre ", nombre);
    });
}

module.exports = {knex, obtenerUploads, obtenerMensajes, obtenerMensajesAnuncio, obtenerMensajesColab, crearMensajeAnuncio, crearMensajeColab, crearUploadAnuncio, crearUploadColab};