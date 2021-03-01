require('dotenv').config();

const express = require("express");
const cors = require('cors');
const path = require("path");

// Creo app express
const app = express();

// configurar CORS
app.use( cors() );

// lectura y parsear json
app.use( express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/mails', require('./routes/mails'));

app.use('/api/home', require('./routes/home'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/iniciativas', require('./routes/iniciativas'));
app.use('/api/partenariados', require('./routes/partenariados'));
app.use('/api/proyectos', require('./routes/proyectos'));

app.use('/api/upload', require('./routes/uploads'));

// cuando la peticion no es para el backend, servimos el frontend
app.use( express.static(__dirname + '/../dist/portal-aps') );

// Lanzo servidor escuchando en puerto 8080 por defecto
app.listen(process.env.PORT || 8080, () => {
    console.info("Servidor escuchando en puerto " + process.env.PORT || 8080);
});

// Pruebas DAO tentativa
const dao_tentativa = require('./database/services/daos/daoTentativa');
const transferOfertaServicio = require('./database/services/transfers/transferOfertaServicio');
const transferDemandaServicio = require('./database/services/transfers/transferDemandaServicio');

// OFERTAS-----------------------------------------------------------------------
//let titulo = "Anuncio 1";
//let descripcion = "Prueba 1";
//let imagen = "Prueba, aquí va la dirección de la imagen";
//let asignatura = ["Ampliación de Matemáticas", "Matemáticas"]; 
//let cuatrimestre = 1;
//let anio = 2020;
//let fecha_limite = new Date (2021, 10, 04);
//let observaciones = "URGENTE";
//let creador = 5; //Profesor con id 1
//let area = [1];
//let profesores = 5;

//let oferta1 = new transferOfertaServicio(null, titulo, descripcion, imagen, "", "", 0.9, asignatura,
 //   cuatrimestre, anio, fecha_limite, observaciones, creador, area, null,
  //  null, profesores); 
// dao_tentativa.obtenerOfertaServicio(46).then(function(oferta){console.log(oferta);});
//  dao_tentativa.crearOferta(oferta1);

//anio = 2022;
//asignatura = ["Ampliación de Matemáticas"]; 
//oferta1 = new transferOfertaServicio(46, titulo, descripcion, imagen, "", "", 0.9, asignatura,
 //   cuatrimestre, anio, fecha_limite, observaciones, creador, area, null,
  //  null, profesores);
// dao_tentativa.actualizarOfertaServicio(oferta1).then(function(oferta){});
// dao_tentativa.obtenerOfertaServicio(46).then(function(oferta){console.log(oferta);});
//  dao_tentativa.limpiarAnuncioServicios(); //Elimina todos los elementos de la tabla
// dao_tentativa.crearAnuncio(titulo, descripcion, imagen);
// dao_tentativa.eliminarOferta(44);

// DEMANDAS----------------------------------------------------------------------------------------
//let ciudad = "Madrid"; 
//let finalidad = "Crear un videojuego para niños de primaria";
//let periodo_definicion_ini = new Date (2020, 5, 04);
//let periodo_definicion_fin  = new Date (2020, 6, 04);
//let periodo_ejecucion_ini = new Date (2020, 6, 05);
//let periodo_ejecucion_fin = new Date (2021, 2, 11);
//let fecha_fin  = new Date (2021, 7, 01);
//let observaciones_temporales = "NADA";
//let necesidad_social = 1;
//let titulacionlocal_demandada = [1, 2, 3];
//let area_servicio = [1,2];
//let demanda = new transferDemandaServicio(null, titulo, descripcion, imagen, "", "", 0.9,
 //   7, ciudad, finalidad, periodo_definicion_ini, periodo_definicion_fin, periodo_ejecucion_ini,
 //   periodo_ejecucion_fin, fecha_fin, observaciones_temporales, necesidad_social, titulacionlocal_demandada,
  //  area_servicio, 0, 0);

// dao_tentativa.crearDemanda(demanda);
// dao_tentativa.obtenerDemandaServicio(41).then(function(oferta){console.log(oferta);});
//ciudad = "Barcelona"; 
//area_servicio = [2];
//titulacionlocal_demandada = [1, 3];
//demanda = new transferDemandaServicio(36, titulo, descripcion, imagen, "", "", 0.9,
//    7, ciudad, finalidad, periodo_definicion_ini, periodo_definicion_fin, periodo_ejecucion_ini,
//    periodo_ejecucion_fin, fecha_fin, observaciones_temporales, necesidad_social, titulacionlocal_demandada,
//    area_servicio, 0, 0);
// dao_tentativa.actualizarDemanda(demanda);
// dao_tentativa.eliminarDemanda(41);
//--------------------------------------Pruebas del DAO comunicacion
const dao_comunicacion = require('./database/services/daos/daoComunicacion');
const transferUpload = require('./database/services/transfers/transferUpload');
const transferMensajes = require('./database/services/transfers/transferMensajes');
const transferMail = require('./database/services/transfers/transferMail');
const transferNewsletter = require('./database/services/transfers/transferNewsletter');
const dao_colaboracion = require('./database/services/daos/daoColaboracion');
const transferColaboracion = require('./database/services/transfers/transferColaboracion');
const { date } = require('faker');

//let texto = "texto de prueba para mensaje de colaboracion";
//let fecha = new Date(2021, 2, 16);//pone horas minutos y segundos todo a ceros, arreglar
//let usuario = 5;
//dao_comunicacion.crearMensajeAnuncio(texto, fecha, usuario, 34);
//dao_comunicacion.crearMensajeColab(texto, fecha, usuario, 1);
//dao_comunicacion.obtenerMensajes(6).then(function(mensaje){console.log(mensaje);});
//dao_comunicacion.obtenerMensajesAnuncio(34).then(function(resultado){console.log(resultado);});

//let almacenamiento = "almacenamiento de prueba";
//let campo = "campo de prueba"; 
//let tipo = "prueba"; 
//let tipo_id = "tipo_id prueba"; 
//let camino = "probando probando"; 
//let client_name = "Juan el pruebas"; 
//let nombre = "La prueba";  
//let createdAt = new Date(); 
//let updatedAt = new Date();
//let _v = 0.5; 
//prueba = new transferUpload(2, almacenamiento, campo, tipo, tipo_id, camino, client_name, nombre, createdAt, updatedAt, _v);
//dao_comunicacion.ActualizarUpload(prueba).then(function(upload){});
//dao_comunicacion.crearUploadAnuncio(almacenamiento, campo, tipo, tipo_id, camino, client_name, nombre, creador, createdAt, updatedAt, _v, 9);
//dao_comunicacion.crearUploadColab(almacenamiento, campo, tipo, tipo_id, camino, client_name, nombre, creador, createdAt, updatedAt, _v, 1)
//dao_comunicacion.obtenerUploads(6).then(function(upload){console.log(upload);});
//dao_comunicacion.eliminarUpload(6).then();
//dao_comunicacion.obtenerUploadsAnuncio(9).then(function(upload){console.log(upload);});

//let mail_to =  "Se lo enviamos a jose";
//let type = "prueba 2";
//let mail_name = "La Gran Prueba";
//let mail_from= "Un servidor";
//let subject = "Testeaar la actualizacion";
//let html = "patata";
//let _to = "juan ";
//let usuario = "Juanillo el pruebas";
//let createdAt = new Date();
//let updatedAt = new Date();

//email = new transferMail(1, mail_to, type, mail_name, mail_from, subject, html, _to, usuario, createdAt, updatedAt);
//dao_comunicacion.CrearMail(mail_to, type, mail_name, mail_from, subject, html, _to, usuario, createdAt, updatedAt);
//dao_comunicacion.ObtenerMail(1).then(function(mail){console.log(mail);});
//dao_comunicacion.ActualizarMail(email)
//dao_comunicacion.EliminarMail(1);

//let mail_to = "JOEMAMA";
//let createdAt = new Date();
//let updatedAt = new Date();

//dao_comunicacion.CrearNewsletter(mail_to, createdAt, updatedAt);
//dao_comunicacion.ObtenerNewsletter(1).then(function(news){console.log(news)});
//dao_comunicacion.ActualizarNewsletter(1, mail_to);
//dao_comunicacion.EliminarNewsletter(1);

let titulo = "iiiiiiiiiiiii";
let descripcion = "blablabla";
let admite_externos = 1;
let responsable = 5;
let profesores = [5, 9];
colab = new transferColaboracion(17, titulo, descripcion, admite_externos, responsable, profesores);
//dao_colaboracion.CrearColaboracion(titulo, descripcion, admite_externos, responsable, profesores);
//dao_colaboracion.ObtenerColaboracion(16).then(function(colab){console.log(colab);});
//dao_colaboracion.EliminarColaboracion(16);
dao_colaboracion.ActualizarColaboracion(colab).then(()=>{
  console.log("actualizado");
});