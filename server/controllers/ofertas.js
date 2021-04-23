const dao_tentativa = require("./../database/services/daos/daoTentativa");
const TOferta = require("./../database/services/transfers/TOfertaServicio");

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

const crearOferta = async(req, res = response) => {

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
    crearOferta
}