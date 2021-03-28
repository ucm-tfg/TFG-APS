const dao_tentativa = require("./../database/services/daos/daoTentativa");
const dao_usuario = require("./../database/services/daos/daoUsuario");

/*
Compara todas las areas de servicio de la demanda y de la oferta, y devuelve el número de coincidencias.
*/
function comprobarAreasServicio(idOferta, idDemanda){
    return dao_tentativa.obtenerAreasServicio(idOferta).then((areas_oferta) => {
        return dao_tentativa.obtenerAreasServicio(idDemanda).then((areas_demanda) => {
            var coincidencias = 0;
            areas_oferta.forEach(area1 =>{
                var i=0;
                var encontrado = false;
                while(i < areas_demanda.length && !encontrado){
                    if(area1 === areas_demanda[i]){
                        coincidencias++;
                        areas_demanda.splice(i, 1);
                        encontrado = true;
                    }
                    i++;
                }
            });
            return coincidencias;
        });
    });
}

/*
Devuelve la cantidad de titulaciones que coinciden de la oferta y la demanda.
*/
function comprobarTitulaciones(idOferta, idDemanda){
    return dao_tentativa.obtenerTitulacionLocal(idDemanda).then((titulaciones_demanda) => {
        return dao_tentativa.obtenerCreadorOferta(idOferta).then((profesor) => {
            return dao_usuario.obtenerTitulacionesProfesorInterno(profesor).then((titulaciones_oferta) => {
                var coincidencias = 0;
                titulaciones_oferta.forEach(titulacion1 =>{
                    var i=0;
                    var encontrado = false;
                    while(i < titulaciones_demanda.length && !encontrado){
                        if(titulacion1 === titulaciones_demanda[i]['nombre']){
                            coincidencias++;
                            titulaciones_demanda.splice(i, 1);
                            encontrado = true;
                        }
                        i++;
                    }
                });
                return coincidencias;
            });
        });
    });
}
module.exports = {
    comprobarAreasServicio,
    comprobarTitulaciones
}