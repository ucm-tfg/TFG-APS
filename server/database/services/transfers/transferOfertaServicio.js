
class transferOfertaServicio {
    id_oferta;
    titulo;
    descripcion;
    imagen;
    created_at;
    updated_at;
    _v;
    asignatura_objetivo;
    cuatrimestre;
    anio_academico;
    fecha_limite;
    observaciones_temporales;
    creador;
    constructor( id_oferta, titulo, descripcion, imagen, created_at, updated_at, _v, asignatura_objetivo,
         cuatrimestre, anio_academico, fecha_limite, observaciones_temporales, creador) 
    {
        this.id_oferta = id_oferta;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.imagen = imagen ;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this._v = _v;
        this.asignatura_objetivo = asignatura_objetivo;
        this.cuatrimestre = cuatrimestre;
        this.anio_academico = anio_academico;
        this.fecha_limite = fecha_limite;
        this.observaciones_temporales = observaciones_temporales;
        this.creador = creador;
    }
    getId_oferta() {
        return this.id_oferta;
    }

    setId_oferta(id_oferta) {
        this.id_oferta = id_oferta;
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

    getAsignatura_objetivo() {
        return this.asignatura_objetivo;
    }

    setAsignatura_objetivo(asignatura_objetivo) {
        this.asignatura_objetivo = asignatura_objetivo;
    }

    getCuatrimestre() {
        return this.cuatrimestre;
    }

    setCuatrimestre(cuatrimestre) {
        this.cuatrimestre = cuatrimestre;
    }

    getAnio_academico() {
        return this.anio_academico;
    }

    setAnio_academico(anio_academico) {
        this.anio_academico = anio_academico;
    }

    getFecha_limite() {
        return this.fecha_limite;
    }

    setFecha_limite(fecha_limite) {
        this.fecha_limite = fecha_limite;
    }

    getObservaciones_temporales() {
        return this.observaciones_temporales;
    }

    setObservaciones_temporales(observaciones_temporales) {
        this.observaciones_temporales = observaciones_temporales;
    }

    getCreador() {
        return this.creador;
    }

    setCreador(creador) {
        this.creador = creador;
    }
}

module.exports = transferOfertaServicio;