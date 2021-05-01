// ruta: /api/partenariados

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('./../middlewares/validar-campos');
const { crearPartenariadoProfesor} = require('../controllers/partenariados');
const { validarJWT, validarEsProfesor } = require('../middlewares/validar-jwt');

const router = Router();

// crear partenariado_profesor
router.post(
    '/crearProfesor',
    [
        validarJWT,
        validarEsProfesor,
        check('id_demanda', 'El id_demanda es un campo obligatorio').not().isEmpty(),
        check('titulo', 'El titulo es un campo obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es un campo obligatorio').not().isEmpty(),
        check('area_servicio', 'El area de servicio es un campo obligatorio').not().isEmpty(),
        check('externos', 'El campo externos es un campo obligatorio').not().isEmpty(),
        check('responsable', 'El responsable es un campo obligatorio').not().isEmpty(),
        check('profesores', 'Los profesores es un campo obligatorio').not().isEmpty(),
        // check('imagen', 'El imagen es un campo obligatorio').not().isEmpty(),
        // check('necesidad_social', 'La necesidad social es un campo obligatorio').not().isEmpty(),
        // check('finalidad', 'La finalidad es un campo obligatorio').not().isEmpty(),
        // check('comunidad_beneficiaria', 'La comunidad beneficiaria es un campo obligatorio').not().isEmpty(),
        // check('ciudad', 'La ciudad es un campo obligatorio').not().isEmpty(),
        // check('asignatura', 'La asignatura es un campo obligatorio').not().isEmpty(),
        // check('titulacion_local', 'La titulacion local es un campo obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearPartenariadoProfesor
);
// listar partenariados
// router.get('/', [], getPartenariados);

// // obtener un partenariado
// router.get(
//     '/:id', [
//         validarJWT,
//         validarEsProfesorOrEntidadOrEsGestor,
//         check('id', 'El id del partenariado debe ser válido').isMongoId(),
//         validarCampos
//     ],
//     getPartenariado
// );

// // modificar estado
// router.put(
//     '/modificar-estado/:id', [
//         validarJWT,
//         validarEsProfesorOrEntidadOrEsGestor,
//         check('id', 'El id del partenariado debe ser válido').isMongoId(),
//         validarCampos
//     ],
//     cambiarEstadoPartenariado
// );


// // modificar estado
// router.post(
//     '/enviar-mensaje/:id', [
//         validarJWT,
//         validarEsProfesorOrEntidadOrEsGestor,
//         check('id', 'El id del partenariado debe ser válido').isMongoId(),
//         validarCampos
//     ],
//     enviarMensajePartenariado
// );


module.exports = router;