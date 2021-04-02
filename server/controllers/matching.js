const dao_tentativa = require("./../database/services/daos/daoTentativa");
const dao_usuario = require("./../database/services/daos/daoUsuario");

async function emparejar(idOferta, idDemanda){
    var demanda = await dao_tentativa.obtenerDemandaServicio(idDemanda);
    var oferta = await dao_tentativa.obtenerOfertaServicio(idOferta);
    var areasServicio = demanda.getArea_servicio();
    var creador = await dao_usuario.obtenerProfesorInterno(oferta.getCreador());
    var areasConocimiento = creador.getAreaConocimiento();
    console.log("Area de servicio", areasServicio);
    console.log("Area de conocimiento", areasConocimiento);
    
    var comprobacion1 = await comprobarAreaServicioConocimiento(areasServicio, areasConocimiento);
    return comprobacion1;
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

module.exports = {
    comprobarAreasServicio,
    comprobarTitulaciones,
    comprobarAreaServicioConocimiento,
    emparejar
}