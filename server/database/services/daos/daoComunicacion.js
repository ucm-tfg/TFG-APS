const transferMensaje = require('../transfers/transferMensajes');
const transferUpload = require('../transfers/transferUpload');
const mysql = require ('mysql');
const transferMensajes = require('../transfers/transferMensajes');
const knex = require('../../config');

// Devuelve el upload correspondiente
function obtenerUploads(idUploads){//funciona
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

// Devuelve el mensaje correspondiente
function obtenerMensajes(idMensajes){//funciona
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
function obtenerMensajesAnuncio(idAnuncio){//NO FUNCIONA
    return knex('mensaje_anuncioservicio').where({
        id_anuncio: idAnuncio
    }).join('mensaje', 'id_mensaje', '=', 'id').select('mensaje.id', 'mensaje.texto', 'mensaje.fecha', 'mensaje.usuario').then((mensaje)=> {
        mensajes = [];
        for(men of mensaje){
            m2 = Object.assign({}, men);
            m3 = new transferMensajes(
                m2['id'],
                m2['texto'],
                m2['fecha'],
                m2['usuario']
            );
            mensajes.push(m3);
        }
        return mensajes;
    });// hacer join con tabla de mensajes para sollucionar porblema de cuello de botella.
}

//Devuelve todos los mensajes de una colaboración
function obtenerMensajesColab(idColab){
    return knex('mensaje_colaboracion').where({
        id_colaboracion: idColab
    }).join('mensaje', 'id_mensaje', '=', 'id').select('mensaje.id', 'mensaje.texto', 'mensaje.fecha', 'mensaje.usuario').then((mensaje)=> {
        mensajes = [];
        for(men of mensaje){
            m2 = Object.assign({}, men);
            m3 = new transferMensajes(
                m2['id'],
                m2['texto'],
                m2['fecha'],
                m2['usuario']
            );
            mensajes.push(m3);
        }
        return mensajes;
    });
}

//Devuelve todos los uploads de un anuncio
function obtenerUploadsAnuncio(idAnuncio){
    return knex('upload_anuncioservicio').where({
        id_anuncio: idAnuncio
    }).join('upload', 'id_upload', '=', 'id').select('upload.id', 'upload.almacenamiento', 'upload.campo', 'upload.tipo', 'upload.tipo_id', 'upload.path', 
    'upload.client_name', 'upload.nombre', 'upload.creador', 'upload.createdAt', 'upload.updatedAt', 'upload._v').then((upload) => {
        uploads = [];
        for(u of upload){
            u2 = Object.assign({}, u);
            u3 = new transferUpload(
                u2['id'],
                u2['almacenamiento'],
                u2['campo'],
                u2['tipo'],
                u2['tipo_id'],
                u2['path'],
                u2['client_name'],
                u2['nombre'],
                u2['creador'],
                u2['createdAt'],
                u2['updatedAt'],
                u2['_v']
            );
            uploads.push(u3);
        }   
        return uploads; 
    });
}

//Devuelve todos los uploads de una colaboracion
function obtenerUploadsColab(idColab){
    return knex('uploads_colaboracion').where({
        id_colaboracion: idColab
    }).join('upload', 'id_upload', '=', 'id').select('upload.id', 'upload.almacenamiento', 'upload.campo', 'upload.tipo', 'upload.tipo_id', 'upload.path', 
    'upload.client_name', 'upload.nombre', 'upload.creador', 'upload.createdAt', 'upload.updatedAt', 'upload._v').then((upload) => {
        uploads = [];
        for(u of upload){
            u2 = Object.assign({}, u);
            u3 = new transferUpload(
                u2['id'],
                u2['almacenamiento'],
                u2['campo'],
                u2['tipo'],
                u2['tipo_id'],
                u2['path'],
                u2['client_name'],
                u2['nombre'],
                u2['creador'],
                u2['createdAt'],
                u2['updatedAt'],
                u2['_v']
            );
            uploads.push(u3);
        }   
        return uploads; 
    });
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
function crearUploadAnuncio(almacenamiento, campo, tipo, tipo_id, path, client_name, nombre, creador, createdAt, updatedAt, _v, anuncio){//funciona
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

function crearUploadColab(almacenamiento, campo, tipo, tipo_id, path, client_name, nombre, creador, createdAt, updatedAt, _v, colaboracion){//funciona
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

function eliminarMensaje(id_mensaje){//Funciona
    return knex('mensaje').where({
        id: id_mensaje
    }).del().then((result) =>{
        if(result > 0){
            console.log("Se ha eliminado de la base de datos el mensaje con id ", id_mensaje);
        }else{
            console.log("No existe el mensaje  con id ", id_mensaje);
        }
    });
}

function eliminarUpload(id_upload){//Funciona
    return knex('upload').where({
        id: id_upload
    }).del().then((result)=>{
        if(result > 0){
            console.log("Se ha eliminado de la base de datos el upload con id ", id_upload);
        }else{
            console.log("No existe el upload con id ", id_upload);
        }
    });
}

module.exports = {knex, obtenerUploads, obtenerMensajes, obtenerMensajesAnuncio, obtenerMensajesColab, obtenerUploadsAnuncio, obtenerUploadsColab, crearMensajeAnuncio, crearMensajeColab, crearUploadAnuncio, crearUploadColab, eliminarMensaje, eliminarUpload};