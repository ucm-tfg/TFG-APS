class transferColaboracion{
    id;
    titulo;
    descripcion;
    admite_externos;
    responsable;
    constructor(id, titulo, descripcion, admite_externos, responsable){
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.admite_externos = admite_externos;
        this.responsable = responsable;
    }
    getId(){
        return this.id;
    }
    setId(id_colab){
        this.id = id_colab;
    }
    getTitulo(){
        return this.titulo;
    }
    setTitulo(titulo_colab){
        this.titulo = titulo_colab;
    }
    getDescripcion(){
        return this.descripcion;
    }
    setDescripcion(descripcion_colab){
        this.descripcion = descripcion_colab;
    }
    getAdmite(){
        return this.admite_externos;
    }
    setAdmite(admite_colab){
        this.admite_externos = admite_colab;
    }
    getResponsable(){
        return this.responsable;
    }
    setResponsable(responsable_colab){
        this.responsable = responsable_colab;
    }

}
module.exports = transferColaboracion;