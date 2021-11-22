// ruta: /api/utils
const {Router} = require('express');
const {getTags} = require('../controllers/utils');

const router = Router();

//Obtener tags from a text
router.get(
    '/getTags', [],
    getTags
);

module.exports = router;