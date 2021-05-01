// ruta: /api/home

const { Router } = require('express');
const { getDatosHome ,getUniversidades, getAreasConocimiento} = require('./../controllers/home');

const router = Router();

// listar datos home
router.get('/', [], getDatosHome);

//Obtener universidades
router.get(
    '/universidades',[],
    getUniversidades
);

router.get(
    '/areasConocimiento',[],
    getAreasConocimiento
);

module.exports = router;