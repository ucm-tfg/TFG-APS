const transferOfertaServicio = require("../transfers/TOfertaServicio");
const transferDemandaServicio = require("../transfers/TDemandaServicio");
const { date } = require('faker');

function negociaciones(oferta, demanda){
    definicion_demanda = demanda.getPeriodo_definicion_ini();
    definicion_oferta = oferta.getFecha_limite();
    //console.log("La fecha limite de la demanda ", definicion_demanda);
    //console.log("La fecha limite de la oferta es ", definicion_oferta);
    if(definicion_demanda > definicion_oferta){
        console.log("tarde");
        return -1;
    }
    else{
        //aqui habria que ver el mes de la fecha de fin para ver a que cuatrimestre corresponde
        ejecucion_demanda_ini = demanda.getPeriodo_ejecucion_ini();
        ejecucion_demanda_fin = demanda.getPeriodo_ejecucion_fin();
        d = new Date;
        console.log("Fecha de prueba ", d.getMonth());
        console.log("El proyecto empezaría ", ejecucion_demanda_ini);
        console.log("El proyecto acabaría ", ejecucion_demanda_fin);
        console.log("El proyecto empezaría ", ejecucion_demanda_ini.getMonth());
        console.log("El proyecto acabaría ", ejecucion_demanda_fin.getMonth());
        if(ejecucion_demanda_ini.getMonth() >= 6 && ejecucion_demanda_ini.getMonth() < 8){
            console.log("Es verano");
        }
        else if((ejecucion_demanda_ini.getMonth() >= 1 && ejecucion_demanda_ini.getMonth() < 6) && ejecucion_demanda_fin.getMonth() < 6){
            console.log("Segundo cuatrimestre");
        }
        else if(ejecucion_demanda_ini.getMonth() >= 8 && (ejecucion_demanda_fin.getMonth() <= 11 || ejecucion_demanda_fin.getMonth() == 0)){
            console.log("Primer cuatrimestre");
        }
        else {
            console.log("Anual")
        }
    }
}

module.exports= {negociaciones};