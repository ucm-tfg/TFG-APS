const transferUpload = require('../transfers/transferUpload');
const mysql = require ('mysql');
const transferMensajes = require('../transfers/transferMensajes');
const knex = require('../../config');
const transferMail = require('../transfers/transferMail');
const transferNewsletter = require('../transfers/transferNewsletter');

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
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar obtener el upload con id ", idUploads);
    }).finally(()=>{
        knex.destroy();
    });
}

// Devuelve el mensaje correspondiente
function obtenerMensajes(idMensajes){//funciona
    console.log('comienza la ejecucion ');
    return knex('mensaje').where({
        id: idMensajes
    }).select('*').then((mensaje) =>{
        return knex('usuario').where({
            id: mensaje[0]['usuario']
        }).select('origin_login').then((nombre) =>{
            return new transferMensajes(
                idMensajes,
                mensaje[0]['texto'],
                mensaje[0]['fecha'],
                mensaje[0]['usuario'],
                nombre[0]['origin_login']
            );
        }).catch((err) => {
            console.log(err);
            console.log("Se ha producido un error al intentar obtener el usuario con id ",  mensaje[0]['usuario']);
        }).finally(()=>{
            knex.destroy();
        });
       
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar obtener el mensaje con id ", idMensajes);
    }).finally(()=>{
        knex.destroy();
    });
}

//Devuelve todos los mensajes de un anuncio
function obtenerMensajesAnuncio(idAnuncio){// FUNCIONA
    return knex('mensaje_anuncioservicio').where({
        id_anuncio: idAnuncio
    }).join('mensaje', 'id_mensaje', '=', 'id').join('usuario', 'usuario.id', '=', 'usuario').select('mensaje.id', 'mensaje.texto', 'mensaje.fecha', 'mensaje.usuario', 'usuario.origin_login').then((mensaje)=> {
        mensajes = [];
        for(men of mensaje){
            m2 = Object.assign({}, men);
            m3 = new transferMensajes(
                m2['id'],
                m2['texto'],
                m2['fecha'],
                m2['usuario'],
                m2['origin_login']
            );
            mensajes.push(m3);
        }
        return mensajes;
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar obtener los mensajes del anuncio ", idAnuncio);
    }).finally(()=>{
        knex.destroy();
    });// hacer join con tabla de mensajes para sollucionar porblema de cuello de botella.
}

//Devuelve todos los mensajes de una colaboración
function obtenerMensajesColab(idColab){
    return knex('mensaje_colaboracion').where({
        id_colaboracion: idColab
    }).join('mensaje', 'id_mensaje', '=', 'id').join('usuario', 'usuario.id', '=', 'usuario').select('mensaje.id', 'mensaje.texto', 'mensaje.fecha', 'mensaje.usuario', 'usuario.origin_login').then((mensaje)=> {
        mensajes = [];
        for(men of mensaje){
            m2 = Object.assign({}, men);
            m3 = new transferMensajes(
                m2['id'],
                m2['texto'],
                m2['fecha'],
                m2['usuario'],
                m2['origin_login']
            );
            mensajes.push(m3);
        }
        return mensajes;
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar obtener los mensajes de la colaboracion con id ", idColab);
    }).finally(()=>{
        knex.destroy();
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
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar obtener los uploads del anuncio con id ", idAnuncio);
    }).finally(()=>{
        knex.destroy();
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
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar obtener los uploads de la colaboracion con id ", idColab);
    }).finally(()=>{
        knex.destroy();
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
    }).finally(()=>{
        knex.destroy();
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
    }).finally(()=>{
        knex.destroy();
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
    }).finally(()=>{
        knex.destroy();
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
    })
    .finally(()=>{
        knex.destroy();
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
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar eliminar el mensaje con id ", id_mensaje);
    }).finally(()=>{
        knex.destroy();
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
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar eliminar el upload con id ", id_upload);
    }).finally(()=>{
        knex.destroy();
    });
}
function ActualizarUpload(Upload){
    return knex('upload').where('id', Upload.getId()).update({
        almacenamiento: Upload.getAlmacenamiento(), 
        campo: Upload.getCampo(), 
        tipo: Upload.getTipo(), 
        tipo_id: Upload.getTipoId(),
        path: Upload.getPath(),
        client_name: Upload.getClientName(),
        nombre: Upload.getNombre(), 
        updatedAt: new Date()
    }).then(()=>{
        console.log("Se ha actualizado el upload con id ", Upload.getId())
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar actualizar el upload con id ", id_upload);
    }).finally(()=>{
        knex.destroy();
    });
}

function ActualizarMensaje(id, texto){
    return knex('mensaje').where({
        id: id
    }).update({
        texto: texto,
        fecha: new Date()
    }).then(()=>{
        console.log("Se ha actualizado el mensaje con id ", id)
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar actualizar el upload con id ", id_upload);
    }).finally(()=>{
        knex.destroy();
    });
}

function CrearMail(mail_to, type, mail_name, mail_from, subject, html, _to, usuario, createdAt, updatedAt){
    return knex('mail').insert({
        mail_to: mail_to, 
        type: type, 
        mail_name: mail_name, 
        mail_from: mail_from, 
        subject: subject, 
        html: html, 
        _to: _to,
        usuario: usuario, 
        createdAt: createdAt, 
        updatedAt: updatedAt
    }).then((id_mail) =>{
        return id_mail;
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar crear el mail con subject ", subject);
    }).finally(()=>{
        knex.destroy();
    });
}

function ObtenerMail(id_mail){
    return knex('mail').where({
        id: id_mail
    }).select('*').then((mail) =>{
        return new transferMail(
            mail[0]['id'],
            mail[0]['mail_to'],
            mail[0]['type'],
            mail[0]['mail_name'],
            mail[0]['mail_from'],
            mail[0]['subject'],
            mail[0]['html'],
            mail[0]['_to'],
            mail[0]['usuario'],
            mail[0]['createdAt'],
            mail[0]['updatedAt']
            );
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar obtener el mail con id ", id_mail);
    }).finally(()=>{
        knex.destroy();
    });
}

function ActualizarMail(Mail){
    return knex('mail').where('id', Mail.getId()).update({
        mail_to: Mail.getMail_to(), 
        type: Mail.getType(), 
        mail_name: Mail.getMailName(), 
        mail_from: Mail.getMailFrom(), 
        subject: Mail.getSubject(), 
        html: Mail.getHtml(), 
        _to: Mail.getTo(), 
        updatedAt: new Date()
    }).then(()=>{
        console.log("Se ha actualizado el mail con id ", Mail.getId())
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar actualizar el mail con id ", Mail.getId());
    }).finally(()=>{
        knex.destroy();
    });
}

function EliminarMail(id_mail){
    return knex('mail').where({
        id: id_mail
    }).del().then((result)=>{
        if(result > 0){
            console.log("Se ha eliminado de la base de datos el mail con id ", id_mail);
        }else{
            console.log("No existe el upload con id ", id_mail);
        }
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar eliminar el mail con id ", id_mail);
    }).finally(()=>{
        knex.destroy();
    });
}

function CrearNewsletter(mail_to, CreatedAt, UpdatedAt){
    return knex('newsletter').insert({
        mail_to: mail_to,
        created_at: CreatedAt,
        updated_at: UpdatedAt
    }).then((id_news) =>{
        return id_news;
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar crear el newsletter con destino", mail_to);
    }).finally(()=>{
        knex.destroy();
    });
}

function ObtenerNewsletter(id_news){
    return knex('newsletter').where({
        id: id_news
    }).select('*').then((news) =>{
        return new transferNewsletter(
            news[0]['id'],
            news[0]['mail_to'],
            news[0]['created_at'],
            news[0]['updated_at']
        );
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar obtener la newsletter con id ", id_news);
    }).finally(()=>{
        knex.destroy();
    });
}

function ActualizarNewsletter(id, mail_to){
    return knex('newsletter').where({
        id: id
    }).update({
        mail_to: mail_to,
        updated_at: new Date()
    }).then(()=>{
        console.log("Se ha actualizado la newsletter con id ", id)
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar actualizar la newsletter con id ", id);
    }).finally(()=>{
        knex.destroy();
    });
}

function EliminarNewsletter(id){
    return knex('newsletter').where({
        id: id
    }).del().then((result)=>{
        if(result > 0){
            console.log("Se ha eliminado de la base de datos la newsletter con id ", id);
        }else{
            console.log("No existe la newsletter con id ", id);
        }
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar eliminar la newsletter con id ", id);
    }).finally(()=>{
        knex.destroy();
    });
}


module.exports = {knex, obtenerUploads, obtenerMensajes, obtenerMensajesAnuncio, obtenerMensajesColab, obtenerUploadsAnuncio, obtenerUploadsColab, crearMensajeAnuncio, crearMensajeColab, 
    crearUploadAnuncio, crearUploadColab, eliminarMensaje, eliminarUpload, ActualizarUpload, ActualizarMensaje, CrearMail, ObtenerMail, ActualizarMail, EliminarMail, CrearNewsletter, ObtenerNewsletter, ActualizarNewsletter, EliminarNewsletter};