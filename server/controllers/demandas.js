const dao_tentativa = require("../database/services/daos/daoTentativa");
const TOferta = require("../database/services/transfers/TOfertaServicio");

const getTitulaciones = async(req, res) => {
    try {
        let id_demanda = req.body.id_demanda;
        titulaciones = await dao_tentativa.obtenerTitulacionLocal(id_demanda);
        
        return res.status(200).json({
            ok: true,
            titulaciones,
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

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
        });
    }
}
module.exports = {
    getTitulaciones,
    obtenerDemanda
}