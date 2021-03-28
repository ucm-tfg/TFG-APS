const { leftJoin } = require("../database/config");
const dao_tentativa = require("./../database/services/daos/daoTentativa");

/*
Compara todas las areas de servicio de la demanda y de la oferta, y devuelve el número de coincidencias.
*/
function comprobarAreasServicio(idOferta, idDemanda){
    return dao_tentativa.obtenerAreaServicio(idOferta).then((areas_oferta) => {
        return dao_tentativa.obtenerAreaServicio(idDemanda).then((areas_demanda) => {
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

module.exports = {
    comprobarAreasServicio
}