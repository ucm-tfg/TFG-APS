let fs = require('fs');
const path = require("path");
const dao_tentativa = require("./../database/services/daos/daoTentativa");
const dao_usuario = require("./../database/services/daos/daoUsuario");
const transferOfertaServicio = require("../database/services/transfers/TOfertaServicio");
const transferDemandaServicio = require("../database/services/transfers/TDemandaServicio");
const { date } = require('faker');
const { compare } = require('bcryptjs');
var TProfesorInterno = require("../database/services/transfers/TProfesorInterno");


String.prototype.removeStopWords = function () {

    var word, stop_word, regex_str, regex, string_clean = this.valueOf().replace(/['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g, ""), data, stop_words;
    //data = fs.readFileSync(path.resolve(__dirname, "../../palabras.txt"), 'utf-8');
    //stop_words = (data.split("\r\n"));
    stop_words = new Array(
        'a',
        'acá',
        'ahí',
        'al',
        'algo',
        'algún',
        'algúna',
        'algúno',
        'algúnas',
        'algúnos',
        'allá',
        'allí',
        'ambos',
        'ante',
        'antes',
        'aquel',
        'aquella',
        'aquello',
        'aquellos',
        'aquellas',
        'aquí',
        'arriba',
        'así',
        'atrás',
        'aun',
        'aunque',
        'bien',
        'cada',
        'casi',
        'como',
        'con',
        'cual',
        'cuales',
        'cualquier',
        'cualquiera',
        'cualquieras',
        'cuan',
        'cuando',
        'cuanto',
        'cuanta',
        'cuantos',
        'cuantas',
        'de',
        'del',
        'demás',
        'desde',
        'donde',
        'dos',
        'el',
        'él',
        'ella',
        'ello',
        'ellas',
        'ellos',
        'en',
        'eres',
        'esa',
        'ese',
        'eso',
        'esos',
        'esta',
        'estas',
        'este',
        'esto',
        'estos',
        'etc',
        'ha',
        'hasta',
        'la',
        'lo',
        'los',
        'las',
        'me',
        'mi',
        'mis',
        'mía',
        'mias',
        'mientras',
        'muy',
        'ni',
        'nosotras',
        'nosotros',
        'nuestra',
        'nuestro',
        'nuestras',
        'nuestros',
        'os',
        'otra',
        'otro',
        'otros',
        'otras',
        'para',
        'pero',
        'pues',
        'que',
        'qué',
        'si',
        'sí',
        'siempre',
        'siendo',
        'sin',
        'sino',
        'so',
        'sobre',
        'sr',
        'sra',
        'sres',
        'sta',
        'su',
        'sus',
        'te',
        'tu',
        'tus',
        'un',
        'una',
        'unos',
        'unas',
        'usted',
        'ustedes',
        'vosotras',
        'vosotros',
        'vuestra',
        'vuestro',
        'vuestras',
        'vuestros',
        'y',
        'ya',
        'yo',
        'a',
        'algo',
        'algunas',
        'algunos',
        'apuesta inicial',
        'antes',
        'como',
        'estafa',
        'contra',
        'cual',
        'cuando',
        'del',
        'desde',
        'donde',
        'durante',
        'mi',
        'el',
        'ella',
        'ellas',
        'ellos',
        'en',
        'entre',
        'era',
        'erais',
        'eran',
        'eras',
        'eres',
        'es',
        'esa',
        'esas',
        'ese',
        'eso',
        'esos',
        'esta',
        'estaba',
        'estabais',
        'estaban',
        'estabas',
        'estad',
        'estada',
        'estadas',
        'estado',
        'estados',
        'estamos',
        'estoy',
        'estar',
        'estaremos',
        'estará',
        'estarán',
        'estarás',
        'estaré',
        'estaréis',
        'Estarías',
        'estaríais',
        'Estaríamos',
        'estarían',
        'estarías',
        'estas',
        'este',
        'estemos',
        'esto',
        'estos',
        'estoy',
        'estuve',
        'estaba',
        'estaris',
        'estuvieran',
        'estuvieras',
        'estaba',
        'estuviese',
        'estuvieseis',
        'estuviesen',
        'estuvieses',
        'estuvimos',
        'estuviste',
        'estuvisteis',
        'estuviéramos',
        'estuviésemos',
        'estuvo',
        'está',
        'estábamos',
        'estáis',
        'están',
        'estás',
        'esté',
        'estéis',
        'estén',
        'estés',
        'tal',
        'casa',
        'quere',
        'quiero',
        'quieren',
        'quieres',
        'hola',
        'Buenas',
        'Buenos dias',
        'Buenos días',
        'Buenas noches',
        'buenas tardes',
        'fue',
        'fuera',
        'fuerais',
        'ser',
        'fueras',
        'fueron',
        'fue',
        'fueis',
        'fuesen',
        'fueses',
        'fui',
        'fuimos',
        'fuiste',
        'fuisteis',
        'fuéramos',
        'fuésemos',
        'decir',
        'ah',
        'habida',
        'habidas',
        'ha habido',
        'habidos',
        'habiendo',
        'habremos',
        'habrá',
        'habrán',
        'habrás',
        'habré',
        'habréis',
        'habría',
        'habríais',
        'habríamos',
        'habrían',
        'habrías',
        'habéis',
        'había',
        'habíais',
        'habíamos',
        'habian',
        'habías',
        'han',
        'tiene',
        'hasta',
        'heno',
        'haya',
        'hayamos',
        'hayan',
        'hayas',
        'hayáis',
        'él',
        'hemos',
        'hube',
        'hubiera',
        'hubiera',
        'hubieran',
        'hubieras',
        'hubieron',
        'has',
        'hayis',
        'hubiesen',
        'hubieses',
        'hubimos',
        'hubiste',
        'hubisteis',
        'hubiéramos',
        'hubiésemos',
        'hubo',
        'la',
        'las',
        'le',
        'les',
        'lo',
        'los',
        'yo',
        'mi',
        'mal',
        'Mucho',
        'muchos',
        'muy',
        'más',
        'mi',
        'desaparecido en combate',
        'mías',
        'mío',
        'míos',
        'nada',
        'ni',
        'no',
        'nos',
        'nosotras',
        'nosotros',
        'nuestra',
        'nuestras',
        'nuestro',
        'nuestros',
        'o',
        'os',
        'otra',
        'otras',
        'otro',
        'otros',
        'paraca',
        'pero',
        'poco',
        'por',
        'porque',
        'que',
        'quien',
        'quienes',
        'se',
        'mar',
        'seamos',
        'sean',
        'mares',
        'seremos',
        'será',
        'serán',
        'serás',
        'seco',
        'seréis',
        'sería',
        'seríais',
        'seríamos',
        'Serian',
        'serías',
        'seáis',
        'sido',
        'siendo',
        'pecado',
        'sobre',
        'Asi es',
        'somos',
        'hijo',
        'soja',
        'su',
        'sus',
        'suya',
        'suyas',
        'suyo',
        'suyos',
        'si',
        'también',
        'tanto',
        'te',
        'tendremos',
        'tendrá',
        'Tendrán',
        'tendrás',
        'tendré',
        'tendréis',
        'tener',
        'tendremosis',
        'tendremos',
        'tendrían',
        'tendrías',
        'tened',
        'tenemos',
        'tenga',
        'tengamos',
        'tengan',
        'tengas',
        'tengo',
        'tengáis',
        'tenida',
        'tenidas',
        'tenido',
        'tenidos',
        'teniendo',
        'tenéis',
        'tenía',
        'teníais',
        'teníamos',
        'tenían',
        'tenías',
        'ti',
        'tiene',
        'tienen',
        'tienes',
        'que hacer',
        'todos',
        'tu',
        'tus',
        'tuve',
        'tuviera',
        'tuvierais',
        'tuvieran',
        'tuvieras',
        'tuvieron',
        'tuviese',
        'tuvieseis',
        'tuviesen',
        'tuvieses',
        'tuvimos',
        'tuviste',
        'tuvisteis',
        'tuviéramos',
        'tuviésemos',
        'tuvo',
        'tuya',
        'tuyas',
        'tuyo',
        'tuyos',
        'tú',
        'Naciones Unidas',
        'una',
        'uno',
        'unos',
        'vosotras',
        'vosotros',
        'tu',
        'vuestras',
        'vuestro',
        'vuestros',
        'y',
        'ya',
        'yo',
        'él',
        'éramos'
    );

    // Divide todas las palabras individuales de la frase
    words = string_clean.match(/[^\s]+|\s+[^\s+]$/g)

    for (let v of words) {
        for (let w of stop_words) {

            word = v.replace(/\s+|[^a-z]+/ig, "");
            stop_word = w;

            if (word.toLowerCase() == stop_word) {

                regex_str = "^\\s*" + stop_word + "\\s*$";
                regex_str += "|^\\s*" + stop_word + "\\s+";
                regex_str += "|\\s+" + stop_word + "\\s*$";
                regex_str += "|\\s+" + stop_word + "\\s+";
                regex = new RegExp(regex_str, "ig");

                string_clean = string_clean.replace(regex, " ");
            }
        }
    }
    return string_clean.replace(/^\s+|\s+$/g, "");
}

function matchingPNLDescription(descriptionDemanda, descriptionOferta) {
    let arrayMatchWords = [];
    let keywordsDemanda = descriptionDemanda.removeStopWords().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    let keywordsOferta = descriptionOferta.removeStopWords().normalize('NFD').replace(/[\u0300-\u036f]/g, "");;
    let arraykeywordsDemanda = keywordsDemanda.split(" ");
    let arraykeywordsOferta = keywordsOferta.split(" ");
    let count = 0;

    for (let i of arraykeywordsDemanda) {
        for (let j of arraykeywordsOferta) {
            if (i.toLowerCase() === j || j.toLowerCase() == i) {
                let word = arrayMatchWords.indexOf(i.toLowerCase());
                if (word === -1) {
                    arrayMatchWords.push(i);
                }

            }
        }
    }
    if (arraykeywordsDemanda.length <= arraykeywordsOferta.length) {
        count = arraykeywordsDemanda.length;
    }
    else {
        count = arraykeywordsOferta.length;
    }
    return arrayMatchWords.length / count;
}


async function emparejar(oferta, demanda){
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

     return comprobacionAreasServicioConocimiento + comprobacion_AreasServicioDemanda_TitulacionesProfesor + comprobacion_AreasServicioOferta_TitulacionesDemanda;
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
            if(titulacion1 === titulacionesDemanda[i]){
                coincidencias++;
                titulacionesDemanda.splice(i, 1);
                encontrado = true;
            }
            i++;
        }
    });
    // console.log("las coincidencias son ", coincidencias);
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
            console.log("año academico de la oferta", anio_academico);
            console.log("año academico de la demanda ", ejecucion_demanda_ini.getFullYear());
            console.log("Segunda mitad del año académico de la oferta", anio_academico+1);
            return -1000;
        }
        else if((anio_academico != ejecucion_demanda_fin.getFullYear()) && (anio_academico + 1 != ejecucion_demanda_fin.getFullYear())){
            console.log("no coinciden los años");
            return -1000;
        }
        // console.log("El proyecto empezaría ", ejecucion_demanda_ini);
        // console.log("El proyecto acabaría ", ejecucion_demanda_fin);
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
                return -1000;//Devuelvo 0 porque no lo considero anti matching, sino que se podría renegociar durante la propia etapa de partenariado
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
                return -1000;//Devuelvo 0 porque no lo considero anti matching, sino que se podría renegociar durante la propia etapa de partenariado
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
                return -1000;//Devuelvo 0 porque no lo considero anti matching, sino que se podría renegociar durante la propia etapa de partenariado
            }
        }
    }
}

function matchDefinitivo(oferta, demanda, pesoFechas, pesoTitulaciones, pesoAreaServicio, pesoDescripcion, pesoTemp){
    compatibilidad = 0.0;
    compatibilidad =  (negociaciones(oferta, demanda)*pesoFechas);//Aqui va un peso 
    titulacionesDemanda = demanda.getTitulacionlocal_demandada();
    profesoresOferta = oferta.getProfesores();
    titulacionesOferta = [];
    profesoresOferta.forEach(prof=>{
        for(let item of prof["titulacion_local"])
        titulacionesOferta.push(item);
    });
    compatibilidad += (comprobarTitulaciones(titulacionesOferta, titulacionesDemanda)*pesoTitulaciones);//Aqui va otro peso
    return emparejar(oferta, demanda).then(function(coincidencias){
        compatibilidad = compatibilidad+(coincidencias*pesoAreaServicio);//Aqui otro peso
        descripcion_oferta = oferta.getDescripcion();
        descripcion_demanda = demanda.getDescripcion();
        compatibilidad += (matchingPNLDescription(descripcion_demanda, descripcion_oferta)*pesoDescripcion);//aqui otro peso
        temp_oferta = oferta.getObservaciones_temporales();
        temp_demanda = demanda.getObservaciones_temporales();
        compatibilidad += (matchingPNLDescription(temp_demanda, temp_oferta)*pesoTemp);//aqui otro peso
        return compatibilidad;
    });
    
}

module.exports = {
    comprobarAreasServicio,
    comprobarTitulaciones,
    comprobarAreaServicioConocimiento,
    comprobarAreaServicioTitulaciones,
    emparejar,
    matchingPNLDescription,
    negociaciones,
    matchDefinitivo
}