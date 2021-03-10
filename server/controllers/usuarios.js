const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('./../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');
const { esGestor } = require('../helpers/auth');
const { ROL_GESTOR } = require('./../models/rol.model');

const getUsuarios = async(req, res) => {
    try {
        const skip = Number(req.query.skip) || 0;
        const limit = Number(req.query.limit) || Number.MAX_SAFE_INTEGER;

        const filtros = JSON.parse(req.query.filtros || '{}');

        let conditions = [];

        // filtro por texto (titulo)
        if(filtros.terminoBusqueda.trim() !== '') {
            let regex = new RegExp( filtros.terminoBusqueda.trim(), 'i')
            conditions.push(
                { $or: [{ nombre: regex }, { apellidos: regex }, { email: regex }, { universidad: regex }, { titulo: regex }, { sector: regex }, { rol: regex }, { origin_login: regex } ]}
            );
        }

        const [usuarios, filtradas, total] = await Promise.all([
            Usuario
                .find(conditions.length ? { $and: conditions} : {})
                .sort('-createdAt')
                .skip(skip)
                .limit(limit),

            Usuario.find(conditions.length ? { $and: conditions} : {}).countDocuments(),

            Usuario.countDocuments(),
        ]);

        return res.status(200).json({
            ok: true,
            usuarios,
            filtradas: filtradas,
            total: total,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
        });
    }
}


const getUsuario = async(req, res) => {
    try {
        const uid = req.params.uid;
        const usuario = await Usuario.findById(uid);

        return res.status(200).json({
            ok: true,
            usuario,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
        });
    }
}


const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });
        
        if(existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado',
            });
        }

        const usuario = new Usuario(req.body);

        // solo un usuario gestor puede crear otro gestor
        if( usuario.rol === ROL_GESTOR && !esGestor(req)) {
            return res.status(403).json({
                ok: false,
                msg: 'Operación no autorizada, solo gestores.',
            });
        }

        usuario.password = bcrypt.hashSync(password, bcrypt.genSaltSync());

        await usuario.save();

        const token = await generarJWT(usuario);

        return res.status(200).json({
            ok: true,
            usuario: usuario,
            token: token,
        });
    } catch (error) {

        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
        });
    }
}

const actualizarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {
        const usuario = await Usuario.findById(uid);

        if(!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe',
            });
        }

        // si actualiza a otro que no soy yo, debo ser gestor
        if(uid !== usuario.id && !esGestor(req)) {
            return res.status(403).json({
                ok: false,
                msg: 'Operación no autorizada, solo gestores.',
            });
        }

        const campos = req.body;

        // comprobar si quiere cambiar su email
        if( usuario.email === campos.email ) {
            delete campos.email;
        }

        // solo se puede cambiar el email en cuentas creadas desde el propio portal
        if(campos.email && usuario.origin_login !== 'Portal ApS') {
            return res.status(403).json({
                ok: false,
                msg: 'No está permitido cambiar el email para cuentas que han utilizado el SSO de ' + usuario.origin_login + '.',
            });
        }

        // si lo quiere cambiar, comprobar que no existe uno igual
        if(campos.email) {
            const existeEmail = await Usuario.findOne({ email: campos.email });
            if(existeEmail && uid !== existeEmail.id) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya está registrado',
                });
            }
        }

        // si la contraseña no viene vacia, es que la quiere cambiar
        if(campos.password) {
            campos.password = bcrypt.hashSync(campos.password, bcrypt.genSaltSync());
        } else {
            delete campos.password;
        }

        // nunca se puede cambiar el campo origin_login: UNED lo determina el tipo de login desde el SSO de la UNED, o google lo determina GOOGLE
        delete campos.origin_login;

        // solo el gestor puede cambiar el rol, aunque no debería por coherencia de datos en proyectos
        if((campos.rol === usuario.rol) || !esGestor(req)) {
            delete campos.rol;
        }
        else {
            // si era una entidad, borrale el sector
            if(usuario.rol == 'ROL_ENTIDAD') {
                campos.sector = '';
            }

            // si deja de ser estudiante o profesor, borra universidad y titulacion
            if(['ROL_ESTUDIANTE', 'ROL_PROFESOR'].includes(usuario.rol) && !['ROL_ESTUDIANTE', 'ROL_PROFESOR'].includes(campos.rol)) {
                campos.universidad = '';
                campos.titulacion = '';
            }
        }



        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        const token = await generarJWT(usuarioActualizado);

        return res.status(200).json({
            ok: true,
            token,
            usuario: usuarioActualizado
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
        });
    }
}

const borrarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {
        const usuario = await Usuario.findById(uid);

        if(!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe',
            });
        }

        // solo gestores
        if(!esGestor(req)) {
            return res.status(403).json({
                ok: false,
                msg: 'Operación no autorizada, solo gestores.',
            });
        }

        // no se puede borrar a uno mismo
        if(uid === req.current_user.uid) {
            return res.status(403).json({
                ok: false,
                msg: 'Operación no autorizada, no se puede borrar a uno mismo.',
            });
        }

        // borrado real
        const usuarioBorrado = await Usuario.findByIdAndDelete(uid);

        return res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
        });
    }
}

module.exports = {
    getUsuarios,
    getUsuario,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
}