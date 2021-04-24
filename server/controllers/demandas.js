const dao_tentativa = require("./../database/services/daos/daoTentativa");
const TDemanda = require("./../database/services/transfers/TDemandaServicio");

const getAreasservicio = async(req, res) => {
    try {
        areasServicio = await dao_tentativa.obtenerListaAreasServicio();
        console.log("Lista de areas de servicio ", areasServicio);
        
        return res.status(200).json({
            ok: true,
            areasServicio,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
        });
    }
}


const getTitulaciones = async(req, res) => {
    try {
        titulacionLocal = await dao_tentativa.obtenerListaTitulacionLocal();
        console.log("Lista de titulaciones locales ", titulacionLocal);
        
        return res.status(200).json({
            ok: true,
            titulacionLocal,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
        });
    }
}

const getNecesidades = async(req, res) => {
    try {
        necesidadSocial = await dao_tentativa.obtenerListaNecesidadSocial();
        console.log("Lista de areas de servicio ", necesidadSocial);
        
        return res.status(200).json({
            ok: true,
            necesidadSocial,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
        });
    }
}

const crearDemanda = async(req, res = response) => {//continuar 

    try {
        console.log("Req.body:\n", req.body);
        const oferta = new TOferta(
            null,
            req.body.titulo,
            req.body.descripcion,
            req.body.imagen,
            null,
            null,
            req.body.asignatura,
            req.body.cuatrimestre,
            req.body.anio_academico,
            req.body.fecha_limite,
            req.body.observaciones,
            req.current_user.uid,
            req.body.area_servicio,
            req.current_user.uid);
        
            console.log("Oferta:\n", oferta);
        await dao_tentativa.crearOferta(oferta);

        return res.status(200).json({
            ok: true,
            oferta: oferta,
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
    getAreasservicio,
    getNecesidades,
    getTitulaciones,
    crearDemanda
}