const transferOfertaServicio = require("./transferOfertaServicio");

class transferAnuncioServicio {
    id_oferta;
    titulo;
    descripcion;
    imagen;
    created_at;
    updated_at;
    _v;
    constructor( id_oferta, titulo, descripcion, imagen, created_at, updated_at, _v) {
        this.id_oferta = id_oferta;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.imagen = imagen ;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this._v = _v;
    }

    getId_oferta() {
        return this.id_oferta;
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
}
module.exports = transferAnuncioServicio;