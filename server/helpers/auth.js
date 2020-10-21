const { ROL_ESTUDIANTE, ROL_PROFESOR, ROL_ENTIDAD, ROL_GESTOR } = require('./../models/rol.model');


const esGestor = (req) => {
    return req.current_user && req.current_user.rol === ROL_GESTOR;
}

const esEntidad = (req) => {
    return req.current_user && req.current_user.rol === ROL_ENTIDAD;
}

const esProfesor = (req) => {
    return req.current_user && req.current_user.rol === ROL_PROFESOR;
}

const esEstudiante = (req) => {
    return req.current_user && req.current_user.rol === ROL_ESTUDIANTE;
}

module.exports = {
    esGestor,
    esEntidad,
    esProfesor,
    esEstudiante,
}