const transferAnuncioServicio = require('./transferAnuncioServicio');
class transferDemandaServicio extends transferAnuncioServicio{

   

    constructor( id_oferta, titulo, descripcion, imagen, created_at, updated_at, _v) 
    {
        super(id_oferta, titulo, descripcion, imagen, created_at, updated_at, _v);
    }

}

module.exports = transferDemandaServicio;