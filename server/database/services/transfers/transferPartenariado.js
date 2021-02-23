class transferPartenariado{
    id;
    id_demanda;
    id_oferta;
    estado;
    _v;
    constructor(id, id_demanda, id_oferta, estado, _v){
        this.id = id;
        this.id_demanda = id_demanda;
        this.id_oferta = id_oferta;
        this.estado = estado;
        this._v = _v;
    }
    getId(){
        return this.id;
    }
    setId(id_part){
        this.id = id_part;
    }
    getId_Demanda(){
        return this.id_demanda;
    }
    setId_Demanda(id_demanda_part){
        this.id_demanda = id_demanda_part;
    }
    getId_Oferta(){
        return this.id_oferta;
    }
    setId_Oferta(id_oferta_part){
        this.id_oferta = id_oferta_part;
    }
    getEstado(){
        return this.estado;
    }
    setEstado(estado_part){
        this.estado = estado_part;
    }
    getV(){
        return this._v;
    }
    setV(_v_part){
        this._v = _v_part;
    }
}
module.exports = transferPartenariado;