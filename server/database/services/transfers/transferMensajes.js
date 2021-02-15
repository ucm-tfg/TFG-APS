class transferMensajes {
    id;
    texto;
    fecha;
    usuario;
    constructor(id, texto, fecha, usuario){
        this.id = id;
        this.texto = texto;
        this.fecha = fecha;
        this.usuario = usuario;
    }
    getId(){
        return this.id;
    }
    setId(id_mensaje){
        this.id = id_mensaje;
    }
    getTexto(){
        return this.texto;
    }
    setTexto(texto_mensaje){
        this.texto = texto_mensaje;
    }
    getFecha(){
        return this.fecha;
    }
    setFecha(fecha_mensaje){
        this.fecha = fecha_mensaje;
    }
    getUsuario(){
        return this.usuario;
    }
    setUsuario(usuario_mensaje){
        this.usuario = usuario_mensaje;
    }
}
module.exports = transferMensajes