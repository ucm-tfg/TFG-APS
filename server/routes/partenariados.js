// ruta: /api/partenariados

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('./../middlewares/validar-campos');
const { getPartenariados, getPartenariado, cambiarEstadoPartenariado, enviarMensajePartenariado } = require('./../controllers/partenariados');
const { opcionalJWT, validarJWT, validarEsProfesorOrEntidadOrEsGestor } = require('../middlewares/validar-jwt');

const router = Router();

// listar partenariados
router.get('/', [], getPartenariados);

// obtener un partenariado
router.get(
    '/:id', [
        validarJWT,
        validarEsProfesorOrEntidadOrEsGestor,
        check('id', 'El id del partenariado debe ser válido').isMongoId(),
        validarCampos
    ],
    getPartenariado
);

// modificar estado
router.put(
    '/modificar-estado/:id', [
        validarJWT,
        validarEsProfesorOrEntidadOrEsGestor,
        check('id', 'El id del partenariado debe ser válido').isMongoId(),
        validarCampos
    ],
    cambiarEstadoPartenariado
);


// modificar estado
router.post(
    '/enviar-mensaje/:id', [
        validarJWT,
        validarEsProfesorOrEntidadOrEsGestor,
        check('id', 'El id del partenariado debe ser válido').isMongoId(),
        validarCampos
    ],
    enviarMensajePartenariado
);


module.exports = router;