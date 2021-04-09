const dao_tentativa = require("./../database/services/daos/daoTentativa");
const dao_usuario = require("./../database/services/daos/daoUsuario");

async function emparejar(idOferta, idDemanda){
    var demanda = await dao_tentativa.obtenerDemandaServicio(idDemanda);
    var oferta = await dao_tentativa.obtenerOfertaServicio(idOferta);
    var areasServicio_demanda = demanda.getArea_servicio();
    var areasServicio_oferta = oferta.getArea_servicio();
    var creador = await dao_usuario.obtenerProfesorInterno(oferta.getCreador());
    var areasConocimiento = creador.getAreaConocimiento();
    var titulaciones_profesor = creador.getTitulacionLocal();
    var titulaciones_demanda = demanda.getTitulacionlocal_demandada();

    // Cambiar el nombre de las variables
    var comprobacionAreasServicioConocimiento 
    = await comprobarAreaServicioConocimiento(areasServicio_demanda, areasConocimiento);
    
    var comprobacion_AreasServicioDemanda_TitulacionesProfesor
     = await comprobarAreaServicioTitulaciones(areasServicio_demanda, titulaciones_profesor);
    console.log(comprobacion_AreasServicioDemanda_TitulacionesProfesor);

     var comprobacion_AreasServicioOferta_TitulacionesDemanda
     = await comprobarAreaServicioTitulaciones(areasServicio_oferta, titulaciones_demanda);
     console.log(comprobacion_AreasServicioOferta_TitulacionesDemanda);
}
/*
Compara todas las areas de servicio de la demanda y de la oferta, y devuelve el número de coincidencias.
*/
function comprobarAreasServicio(areasOferta, areasDemanda){
    var coincidencias = 0;
    areasOferta.forEach(area1 =>{
        var i=0;
        var encontrado = false;
        while(i < areasDemanda.length && !encontrado){
            if(area1 === areasDemanda[i]){
                coincidencias++;
                areasDemanda.splice(i, 1);
                encontrado = true;
            }
            i++;
        }
    });
    return coincidencias;
}

/*
Devuelve la cantidad de titulaciones que coinciden de la oferta y la demanda.
*/
function comprobarTitulaciones(titulacionesOferta, titulacionesDemanda){
    var coincidencias = 0;
    titulacionesOferta.forEach(titulacion1 =>{
        var i=0;
        var encontrado = false;
        while(i < titulacionesDemanda.length && !encontrado){
            if(titulacion1 === titulacionesDemanda[i]['nombre']){
                coincidencias++;
                titulacionesDemanda.splice(i, 1);
                encontrado = true;
            }
            i++;
        }
    });
    return coincidencias;
}

function comprobarAreaServicioConocimiento(areasServicio, areasConocimiento){
    return dao_tentativa.obtenerAreaServicioConocimientoPorArea(areasServicio).then((result) =>{
        var coincidencias = 0;
        result.forEach(datos => {
        if(areasConocimiento.find(element => element === datos['area_conocimiento']) != undefined ){
            coincidencias++;
        }
        });
        return coincidencias;
    })
    .catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al comprobar las areas de servicio y las de conocimiento");
      });
}

function comprobarAreaServicioTitulaciones(areasServicio, titulaciones){
    return dao_tentativa.obtenerAreaServicioTitulacionPorArea(areasServicio).then((result) =>{
        var coincidencias = 0;
        result.forEach(datos => {
        if(titulaciones.find(element => element === datos['titulacion']) != undefined ){
            coincidencias++;
        }
        });
        return coincidencias;
    })
    .catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al comprobar las areas de servicio y las titulaciones");
      });
}

module.exports = {
    comprobarAreasServicio,
    comprobarTitulaciones,
    comprobarAreaServicioConocimiento,
    comprobarAreaServicioTitulaciones,
    emparejar
}