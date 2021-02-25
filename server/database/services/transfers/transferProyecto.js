const transferColaboracion = require('./transferColaboracion');
class transferProyecto extends transferColaboracion {
    id;
    id_partenariado;
    estado;
    estudiantes;
    constructor(id, id_partenariado, estado, estudiantes){
        this.id = id;
        this.id_partenariado = id_partenariado;
        this.estado = estado;
        this.estudiantes = estudiantes;
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
    
    getEstudiantes() {
        return this.estudiantes;
    }

    setEstudiantes(estudiantes) {
        this.estudiantes = estudiantes;
    }
}
module.exports = transferProyecto;