// ruta: /api/home

const { Router } = require('express');
const { getDatosHome } = require('./../controllers/home');

const router = Router();

// listar datos home
router.get('/', [], getDatosHome);

module.exports = router;