require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const { dbConnection } = require("./database/config");

// Creo app express
const app = express();

// configurar CORS
app.use(cors());

// lectura y parsear json
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/mails", require("./routes/mails"));

app.use("/api/home", require("./routes/home"));
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/iniciativas", require("./routes/iniciativas"));
app.use("/api/partenariados", require("./routes/partenariados"));
app.use("/api/proyectos", require("./routes/proyectos"));

app.use("/api/upload", require("./routes/uploads"));

// cuando la peticion no es para el backend, servimos el frontend
app.use(express.static(__dirname + "/../dist/portal-aps"));

// Pruebas DAO Usuario
const dao_usuario = require("./database/services/daos/daoUsuario");
const tUsuario = require("./database/services/transfers/TUsuario");
const tAdmin = require("./database/services/transfers/TAdmin");
const tOficinaAps = require("./database/services/transfers/TOficinaAps");
const TEstudiante = require("./database/services/transfers/TEstudiante");
const tEstInterno = require("./database/services/transfers/TEstudianteInterno");
const tProfesor = require("./database/services/transfers/TProfesor");
const tEntidad = require("./database/services/transfers/TEntidad");
const tProfesorInterno = require("./database/services/transfers/TProfesorInterno");
const tEstudianteExterno = require("./database/services/transfers/TEstudianteExterno");
const tProfesorExterno = require("./database/services/transfers/TProfesorExterno");

//OJOOOOOO METED VOSOTROS LOS DATOS CORRESPONDIENTES( ID, ATRIBUTOS...)


//BORRAR-------------------------------------------------------------------------------------------------------------------------------------------------------------------
// dao_usuario.borrarUsuario(140);
// dao_usuario.borrarEstudianteInterno(101);
// dao_usuario.borrarProfesorInterno(136);
// dao_usuario.borrarOficinaAPS(123);
//dao_usuario.borrarAdmin(107);
//dao_usuario.borrarEntidad();
//dao_usuario.borrarProfesorExterno(122)
//dao_usuario.borrarProfesorInterno(123)

//INSERTAR-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//nuevo estudiante interno
/* let idtitulacion_local=48;
let estudinateInterno1 = new tEstInterno(
  null,
  "correoestu@ucm.es",
  "ad",
  "min",
  "1234",
  "origen",
  "imag",
  "creado",
  "actualizado",
  1,
  idtitulacion_local
);
dao_usuario.insertarEstudianteInterno(estudinateInterno1); */

//Insertar entidad
/* let entidad1 = new tEntidad(
  null,
  "nuevaentidad2@ucm.es",
  "ad",
  "min",
  "1234",
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1,
  "a",
  "b"
);
dao_usuario.insertarEntidad(entidad1); */

/* //Insertar admin
let admin1 = new tAdmin(
  null,
  "adminnuevo@ucm.es",
  "ad",
  "min",
  "1234",
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1
);
dao_usuario.insertarAdmin(admin1); */

/* let area_conocimiento = [4, 5];
let titulacion_local = [48, 49];
let profesorInterno = new tProfesorInterno(
  null,
  "profesorInterno.com",
  "nombre",
  "apellidos",
  "password",
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1,
  null,
  null
);
dao_usuario.insertarProfesorInterno(
  profesorInterno,
  titulacion_local,
  area_conocimiento
);
 */
/* //Insertar estudiante Externo
let estudianteExterno = new tEstudianteExterno(
  null,
  "estudianteExterno1.com",
  "nombre",
  "apellidos",
  "password",
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1,
  1,
  "titulacion",
  null,
  null
);
dao_usuario.insertarEstudianteExterno(estudianteExterno); */

/* //Insertar profesor externo
let profesorExterno = new tProfesorExterno(
  null,
  "profesorExterno1.com",
  "nombre",
  "apellidos",
  "password",
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1,
  1,
  null,
  null
);
dao_usuario.insertarProfesorExterno(profesorExterno); */

/* let usuario1 = new tUsuario(
  null,
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1
);
dao_usuario.insertarUsuario(usuario1);


let oficinaAPS = new tOficinaAps(
  null,
  "aps1@ucm.es",
  "ad",
  "min",
  "1234",
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1
);
dao_usuario.insertarOficinaAps(oficinaAPS);

let estudiante1 = new TEstudiante(
  null,
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1
);
dao_usuario.insertarEstudiante(estudiante1);
let estudinateInterno1 = new tEstInterno(
  null,
  "esta4@ucm.es",
  "ad",
  "min",
  "1234",
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1,
  48
);
dao_usuario.insertarEstudianteInterno(estudinateInterno1);
let profesor1 = new tProfesor(
  null,
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1
);
dao_usuario.insertarProfesor(profesor1);

//OBTENER-------------------------------------------------------------------------------------------------------------------------------------------------------------------

dao_usuario.obtenerEstudianteExterno(87);
dao_usuario.obtenerAdmin(107);
dao_usuario.obtenerOficinaAps(108);
dao_usuario.obtenerEntidad(120);
dao_usuario.obtenerEstudianteExterno(133);
dao_usuario.obtenerEstudianteInterno(117);
dao_usuario.obtenerProfesorExterno(134);
dao_usuario.obtenerProfesorInterno(140);
dao_usuario.obtenerEstudianteInterno(100);


*/

//ACTUALIZAR----------------------------------------------------------------------------------------------------------------------------------------------------------------
/* let usuario1 = new tUsuario(
  555,
  "nuevo",
  "nuevo",
  "nuevocreatedAt",
  "nuevoupdatedAt",
  1
);
dao_usuario.actualizarUsuario(usuario1); */

/* 
let estudiante1 = new TEstudiante(
  116,
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1
);
dao_usuario.actualizarEstudiante(estudiante1); */


/* let admin1 = new tAdmin(
  124,
  "admin3@ucm.es",
  "gudaielaaajgu",
  "minnn",
  "1234",
  "nuevorigin_login",
  "fff",
  "sss",
  "bvx",
  1
);
dao_usuario.actualizarAdmin(admin1); */

/*  let entidad1 = new tEntidad(
  105,
  "nuevaentidad2@ucm.es",
  "asdf",
  "min",
  "1234",
  "nuevorigin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1,
  "a",
  "b"
);
dao_usuario.actualizarEntidad(entidad1);  */

/* let oficinaAPS = new tOficinaAps(
 125,
 "aps1@ucm.es",
 "aholad",
 "min",
 "1234",
 "fidus",
 "123",
 "23",
 "updatedAt",
 1
);
dao_usuario.actualizarOficinaAPS(oficinaAPS);  */

/* let idtitulacion_local = 48;
let estudinateInterno1 = new tEstInterno(
  127,
  "prueba1@ucm.es",
  "denuevo",
  "min",
  "1234",
  "origenblablabla",
  "imag",
  "creado",
  "actualizado",
  1,
  idtitulacion_local
);
dao_usuario.actualizarEstudianteInterno(estudinateInterno1); */

/*  let estudianteExterno = new tEstudianteExterno(
  128,
  "estudianteExterno7.com",
  "otro",
  "apellidos",
  "password",
  "ihaaa",
  "origin_img",
  "createdAt",
  "updatedAt",
  1,
  1,
  "titulacion",
  null,
  null
);
dao_usuario.actualizarEstudianteExterno(estudianteExterno);  */

/* 
let profesorExterno = new tProfesorExterno(
  130,
  "profesorExterno9.com",
  "hola",
  "apellidos",
  "password",
  "origin_login",
  "origin_img",
  "createdAt",
  "updatedAt",
  1,
  1,
  null,
  null
);
dao_usuario.actualizarProfesorExterno(profesorExterno); */

/* let area_conocimiento = [4, 5];
let titulacion_local = [48, 49];
let profesorInterno = new tProfesorInterno(
  134,
  "holaaa94.com",
  "nonono",
  "apellidos",
  "password",
  "pipa",
  "origin_img",
  "createdAt",
  "updatedAt",
  1,
  null,
  null
);
dao_usuario.actualizarProfesorInterno(
  profesorInterno,
  area_conocimiento,
  titulacion_local

); */

//AUXILIARES------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* let arrayPrf = [136, 137,138,139];
dao_usuario.obtenerProfesoresInternos(arrayPrf);  */

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Lanzo servidor escuchando en puerto 8080 por defecto
app.listen(process.env.PORT || 8080, () => {
  console.info("Servidor escuchando en puerto " + process.env.PORT || 8080);
});
