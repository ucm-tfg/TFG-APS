const daoOferta = require("./../database/services/daos/daoOferta");
const TOferta = require("./../database/services/transfers/TOfertaServicio");

const getAreasservicio = async(req, res) => {
    try {
        areasServicio = await daoOferta.obtenerListaAreasServicio();
        
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
        let areas = [];
        req.body.area_servicio.forEach(data => {
            areas.push(data.id);
        });
        let oferta = new TOferta(
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
            areas,
            req.current_user.uid);
        
        await daoOferta.crearOferta(oferta);

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

const obtenerOferta = async(req, res) => {
    try {

        const id = req.params.id;
        const oferta = await daoOferta.obtenerOfertaServicio(id);

        return res.status(200).json({
            ok: true,
            oferta,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado.',
        });
    }
}

const obtenerOfertas = async(req, res = response) =>{
    try{
        let ofertas = [];
        ofertas = daoOferta.obtenerTodasOfertasServicio(); // Como recoger el resultado???
        return res.status(200).json({
            ok: true,
            ofertas
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
        })
    }
}

module.exports = {
    getAreasservicio,
    crearOferta,
    obtenerOferta,
    obtenerOfertas
}