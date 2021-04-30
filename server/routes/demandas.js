// ruta: /api/ofertas

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getTitulaciones, obtenerDemanda} = require('../controllers/demandas');
const { opcionalJWT, validarJWT, validarEsProfesorOrEsGestor } = require('../middlewares/validar-jwt');

const router = Router();

//Obtener universidades
router.get(
    '/titulaciones',[],
    getTitulaciones
);

// obtener una demanda
router.get(
    '/:id', [],
    obtenerDemanda
);

module.exports = router;