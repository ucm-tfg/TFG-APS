const dao_tentativa = require("./../database/services/daos/daoTentativa");
const TDemanda = require("./../database/services/transfers/TDemandaServicio");

const getAreasservicio = async(req, res) => {
    try {
        areasServicio = await dao_tentativa.obtenerListaAreasServicio();
        
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
        console.log("El body es ", req.body);
        const demanda = new TDemanda(
            null,
            req.body.titulo,
            req.body.descripcion,
            req.body.imagen,
            null,
            null,
            "",
            req.current_user.uid,
            req.body.ciudad,
            req.body.objetivo,
            req.body.fechaDefinicionIni,
            req.body.fechaDefinicionFin,
            req.body.fechaEjecucionIni,
            req.body.fechaEjecucionFin,
            req.body.fechaFin,
            req.body.observaciones,
            req.body.necesidad_social,
            req.body.titulacion_local,
            req.body.area_servicio,
            req.body.comunidadBeneficiaria,
            );
            // constructor( id_oferta, titulo, descripcion, imagen, created_at, updated_at, _v,
            //     creador, ciudad, finalidad, periodo_definicion_ini, periodo_definicion_fin, periodo_ejecucion_ini,
            //     periodo_ejecucion_fin, fecha_fin, observaciones_temporales, necesidad_social, titulacionlocal,
            //     area_servicio, comunidad_beneficiaria) 
        console.log("La demanda es ", demanda);
        await dao_tentativa.crearDemanda(demanda);


        return res.status(200).json({
            ok: true,
            demanda: demanda,
        });
    } catch (error) {

        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
        });
    }
}

const obtenerDemanda = async(req, res) => {
    try {

        const id = req.params.id;
        const demanda = await dao_tentativa.obtenerDemandaServicio(id);

        return res.status(200).json({
            ok: true,
            demanda,
        });

        console.error(error);
    } catch (error) {

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
    crearDemanda,
    obtenerDemanda
}

    