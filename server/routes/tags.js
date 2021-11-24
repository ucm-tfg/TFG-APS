// ruta: /api/utils
const { Router } = require('express')
const { getTags, getPossibleTags } = require('../controllers/tags')

const router = Router()

//Obtener tags from a text
router.get('/getTags', [], getTags)

//Obtener alternatives tags from a text
router.get('/getPossibleTags', [], getPossibleTags)

module.exports = router
