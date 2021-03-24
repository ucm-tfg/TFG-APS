const transferOfertaServicio = require("../transfers/TOfertaServicio");
const transferDemandaServicio = require("../transfers/TDemandaServicio");
const { date } = require('faker');

function negociaciones(oferta, demanda){
    definicion_demanda = demanda.getPeriodo_definicion_ini();
    definicion_oferta = oferta.getFecha_limite();
    anio_academico = oferta.getAnio_academico();
    if(definicion_demanda > definicion_oferta){
        console.log("tarde");
        return -1000;//para que el peso sea mucho mayor y asi directamente sea el anti-match
    }
    else{
        //aqui habria que ver el mes de la fecha de fin para ver a que cuatrimestre corresponde
        ejecucion_demanda_ini = demanda.getPeriodo_ejecucion_ini();
        ejecucion_demanda_fin = demanda.getPeriodo_ejecucion_fin();
        if((anio_academico != ejecucion_demanda_ini.getFullYear()) && (anio_academico + 1 != ejecucion_demanda_ini.getFullYear())){
            console.log("no coinciden los años");
            console.log("año academico ", anio_academico);
            console.log("año demanda ", ejecucion_demanda_ini.getFullYear());
            console.log("año academico + 1", anio_academico+1);
            return -1000;
        }
        else if((anio_academico != ejecucion_demanda_fin.getFullYear()) && (anio_academico + 1 != ejecucion_demanda_fin.getFullYear())){
            console.log("no coinciden los años");
            return -1000;
        }
        console.log("El proyecto empezaría ", ejecucion_demanda_ini);
        console.log("El proyecto acabaría ", ejecucion_demanda_fin);
        if(ejecucion_demanda_ini.getMonth() >= 6 && ejecucion_demanda_ini.getMonth() < 8){
            console.log("Es verano");
            return -1000;//partiendo del hecho de que en verano no hay clases
        }
        else if((ejecucion_demanda_ini.getMonth() >= 1 && ejecucion_demanda_ini.getMonth() < 6) && ejecucion_demanda_fin.getMonth() < 6){
            console.log("Segundo cuatrimestre");
            if(oferta.getCuatrimestre() == 2){
                console.log("cuadra todo");
                return 1;
            }
            else {
                console.log("cuatrimestres no coinciden");
                return 0;//Devuelvo 0 porque no lo considero anti matching, sino que se podría renegociar durante la propia etapa de partenariado
            }
        }
        else if(ejecucion_demanda_ini.getMonth() >= 8 && ((ejecucion_demanda_fin.getMonth() <= 11 && ejecucion_demanda_fin.getMonth() >= 8) || ejecucion_demanda_fin.getMonth() == 0)){
            console.log("Primer cuatrimestre");
            if(oferta.getCuatrimestre() == 1){
                console.log("cuadra todo");
                return 1;
            }
            else {
                console.log("cuatrimestres no coinciden");
                return 0;//Devuelvo 0 porque no lo considero anti matching, sino que se podría renegociar durante la propia etapa de partenariado
            }
        }
        else {
            console.log("Anual")
            if(oferta.getCuatrimestre() == 3){//he tomado anual como el 3 debido a que cuatrimestre es un int
                console.log("cuadra todo");
                return 1;
            }
            else {
                console.log("cuatrimestres no coinciden");
                return 0;//Devuelvo 0 porque no lo considero anti matching, sino que se podría renegociar durante la propia etapa de partenariado
            }
        }
    }
}

module.exports= {negociaciones};