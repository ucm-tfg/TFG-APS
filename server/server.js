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
let titulo = "Anuncio 1";
let descripcion = "Prueba 1";
let imagen = "Prueba, aquí va la dirección de la imagen";
let asignatura = "Ampliación de Matemáticas"; 
let cuatrimestre = 1;
let anio = 2020;
let fecha_limite = new Date (2021, 10, 04);
let observaciones = "URGENTE";
dao_tentativa.obtenerOfertaServicio(1)
// let creador = 1; //Profesor con id 1
// dao_tentativa.crearOferta(titulo, descripcion, imagen, asignatura, cuatrimestre, anio, fecha_limite,
//      observaciones, creador );
//  dao_tentativa.limpiarAnuncioServicios(); //Elimina todos los elementos de la tabla
// dao_tentativa.crearAnuncio(titulo, descripcion, imagen);