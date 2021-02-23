class transferProyecto{
    id;
    id_partenariado;
    estado;
    constructor(id, id_partenariado, estado){
        this.id = id;
        this.id_partenariado = id_partenariado;
        this.estado = estado;
    }
    getId(){
        return this.id;
    }
    setId(id_pro){
        this.id = id_pro;
    }
    getId_Partenariado(){
        return this.id_partenariado;
    }
    setId_Partenariado(id_partenariado_pro){
        this.id_partenariado = id_partenariado_pro;
    }
    getEstado(){
        return this.estado;
    }
    setEstado(estado_pro){
        this.estado = estado_pro;
    }
}
module.exports = transferProyecto;