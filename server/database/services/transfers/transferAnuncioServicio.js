class transferAnuncioServicio {
    id;
    titulo;
    descripcion;
    imagen;
    created_at;
    updated_at;
    _v;
    area_servicio;
    mensajes;
    uploads;
    constructor(id, titulo, descripcion, imagen, created_at, updated_at, _v, area_servicio, mensajes, uploads) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.imagen = imagen ;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this._v = _v;
        this.area_servicio = area_servicio;
        this.mensajes = mensajes;
        this.uploads = uploads;
    }

    getId() {
        return this.id;
    }

    setId(id_anuncio) {
        return this.id = id_anuncio;
    }

    getTitulo() {
        return this.titulo;
    }

    setTitulo(titulo) {
        this.titulo = titulo;
    }

    getDescripcion() {
        return this.descripcion;
    }

    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }

    getImagen() {
        return this.imagen;
    }

    setImagen(imagen) {
        this.imagen = imagen;
    }

    getCreated_at() {
        return this.created_at;
    }

    setCreated_at(created_at) {
        this.created_at = created_at;
    }

    getUpdated_at() {
        return this.updated_at;
    }

    setUpdated_at(updated_at) {
        this.updated_at = updated_at;
    }

    get_v() {
        return this._v;
    }

    set_v(_v) {
        this._v = _v;
    }
    getArea_servicio() {
        return this.area_servicio;
    }

    setArea_servicio(area_servicio) {
        this.area_servicio = area_servicio;
    }

    getMensajes() {
        return this.mensajes;
    }

    setMensajes(mensajes) {
        this.mensajes = mensajes;
    }

    getUploads() {
        return this.uploads;
    }

    setUploads(uploads) {
        this.uploads = uploads;
    }
}
module.exports = transferAnuncioServicio;