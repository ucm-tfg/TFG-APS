const transferAnuncioServicio = require('./transferAnuncioServicio');

class transferOfertaServicio extends transferAnuncioServicio{
    asignatura_objetivo;
    cuatrimestre;
    anio_academico;
    fecha_limite;
    observaciones_temporales;
    creador;
    area_servicio;
    mensajes;
    uploads;
    profesores;

    constructor( id_oferta, titulo, descripcion, imagen, created_at, updated_at, _v, asignatura_objetivo,
         cuatrimestre, anio_academico, fecha_limite, observaciones_temporales, creador, area_servicio, mensajes,
         uploads, profesores) 
    {
        super(id_oferta, titulo, descripcion, imagen, created_at, updated_at, _v);
        this.asignatura_objetivo = asignatura_objetivo;
        this.cuatrimestre = cuatrimestre;
        this.anio_academico = anio_academico;
        this.fecha_limite = fecha_limite;
        this.observaciones_temporales = observaciones_temporales;
        this.creador = creador;
        this.area_servicio = area_servicio;
        this.mensajes = mensajes;
        this.uploads = uploads;
        this.profesores = profesores;
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

    getProfesores() {
        return this.profesores;
    }

    setProfesores(profesores) {
        this.profesores = profesores;
    }
}

module.exports = transferOfertaServicio;