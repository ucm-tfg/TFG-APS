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
const transferIniciativa = require('./database/services/transfers/transferIniciativa');

// OFERTAS-----------------------------------------------------------------------
// let titulo = "Anuncio 1";
// let descripcion = "Prueba 1";
// let imagen = "Prueba, aquí va la dirección de la imagen";
// let asignatura = ["Ampliación de Matemáticas", "Matemáticas"]; 
// let cuatrimestre = 1;
// let anio = 2020;
// let fecha_limite = new Date (2021, 10, 04);
// let observaciones = "URGENTE";
// let creador = 5; //Profesor con id 1
// let area = [1, 0, 2];
// let profesores = 5;

// let oferta1 = new transferOfertaServicio(null, titulo, descripcion, imagen, "", "", 0.9, asignatura,
//     cuatrimestre, anio, fecha_limite, observaciones, creador, area, null,
//     null, profesores); 
// dao_tentativa.obtenerOfertaServicio(46).then(function(oferta){console.log(oferta);});
// dao_tentativa.crearOferta(oferta1);

// anio = 2022;
// asignatura = ["Ampliación de Matemáticas"]; 
// oferta1 = new transferOfertaServicio(46, titulo, descripcion, imagen, "", "", 0.9, asignatura,
//     cuatrimestre, anio, fecha_limite, observaciones, creador, area, null,
//     null, profesores);
// dao_tentativa.actualizarOfertaServicio(oferta1).then(function(oferta){});
// dao_tentativa.obtenerOfertaServicio(46).then(function(oferta){console.log(oferta);});
//  dao_tentativa.limpiarAnuncioServicios(); //Elimina todos los elementos de la tabla
// dao_tentativa.crearAnuncio(titulo, descripcion, imagen);
// dao_tentativa.eliminarOferta(44);

// DEMANDAS----------------------------------------------------------------------------------------
// let ciudad = "Madrid"; 
// let finalidad = "Crear un videojuego para niños de primaria";
// let periodo_definicion_ini = new Date (2020, 5, 04);
// let periodo_definicion_fin  = new Date (2020, 6, 04);
// let periodo_ejecucion_ini = new Date (2020, 6, 05);
// let periodo_ejecucion_fin = new Date (2021, 2, 11);
// let fecha_fin  = new Date (2021, 7, 01);
// let observaciones_temporales = "NADA";
// let necesidad_social = 1;
// let titulacionlocal_demandada = [1, 2, 3];
// let area_servicio = [1,2];
// let demanda = new transferDemandaServicio(null, titulo, descripcion, imagen, "", "", 0.9,
//     7, ciudad, finalidad, periodo_definicion_ini, periodo_definicion_fin, periodo_ejecucion_ini,
//     periodo_ejecucion_fin, fecha_fin, observaciones_temporales, necesidad_social, titulacionlocal_demandada,
//     area_servicio, 0, 0);
// dao_tentativa.crearDemanda(demanda);

// dao_tentativa.obtenerDemandaServicio(41).then(function(oferta){console.log(oferta);});
// ciudad = "Barcelona"; 
// area_servicio = [2];
// titulacionlocal_demandada = [1, 3];
// demanda = new transferDemandaServicio(36, titulo, descripcion, imagen, "", "", 0.9,
//     7, ciudad, finalidad, periodo_definicion_ini, periodo_definicion_fin, periodo_ejecucion_ini,
//     periodo_ejecucion_fin, fecha_fin, observaciones_temporales, necesidad_social, titulacionlocal_demandada,
//     area_servicio, 0, 0);
// dao_tentativa.obtenerTodasDemandasServicio().then((datos) => {
//     console.log(datos);
// })
// dao_tentativa.actualizarDemanda(demanda);
// dao_tentativa.eliminarDemanda(41);

//INICIATIVAS
// let titulo = "Iniciativa 1 editada";
// let descripcion = "Descripción de la iniciativa número 1 editada";
// let necesidad_social = 1;
// let area_servicio = [2];
// let estudiante = 9;
// let iniciativa = new transferIniciativa(3, titulo, descripcion, necesidad_social, 52, area_servicio, estudiante);
// dao_tentativa.crearIniciativa(iniciativa);
// dao_tentativa.obtenerIniciativa(2).then((datos) => {
//     console.log(datos);
// })
// dao_tentativa.eliminarIniciativa(2);
// dao_tentativa.obtenerTodasIniciativas().then((datos) =>{
//     console.log(datos);
// })
// dao_tentativa.actualizarIniciativa(iniciativa).then((datos) => {
//     console.log("Se ha actualizado la iniciativa número ", datos);
// });