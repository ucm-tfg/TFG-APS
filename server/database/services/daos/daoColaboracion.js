const transferColaboracion = require('../transfers/transferColaboracion');
const mysql = require ('mysql');
const transferPartenariado = require('../transfers/transferPartenariado');
const transferProyecto = require('../transfers/transferProyecto');
const knex = require('../../config');
const { ModuleResolutionKind } = require('typescript');

function CrearColaboracion(titulo, descripcion, admite_externos, responsable, profesores){//Revisar porque cuando falla no se borra
    return knex('colaboracion').insert({
        titulo: titulo, descripcion: descripcion, admite_externos: admite_externos, responsable: responsable
    }).then((id_colab) =>{
        const fieldsToInsert = profesores.map(profesor => ({ id_profesor: profesor, id_colaboracion: id_colab }));
        return knex('profesor_colaboracion').insert(fieldsToInsert).then(()=>{
            return id_colab;
        });
       // }
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar crear la colaboracion con id ", id_colab);
        return knex('colaboracion').where({
            id: id_colab
        }).del().then((result)=>{
            if(result > 0){
                console.log("Se ha eliminado de la base de datos la colaboracion con id ", id_colab);
            }else{
                console.log("No existe el la colaboracion con id ", id_colab);
            }
        }).catch((err) => {
            console.log(err);
            console.log("Se ha producido un error al intentar eliminar la colaboracion con id ", id_colab);
        }).finally(()=>{
            knex.destroy();
        });
    }).finally(()=>{
        knex.destroy();
    });
}
function ObtenerColaboracion(id_colab){
    return knex('colaboracion').where({
        id: id_colab
    }).select('*').then((colab) =>{
        return knex('profesor_colaboracion').where({
            id_colaboracion: id_colab
        }).select('id_profesor').then((profe) =>{
            //console.log("los datos obtenidos de colaboracion son ", colab);
            p = [];
            for(prof of profe){
                p2 = Object.assign({}, prof);
                p.push(p2['id_profesor']);
            }
           // console.log("los datos obtenidos de profesor_colaboracion son ", p);
            return new transferColaboracion(
                id_colab,
                colab[0]['titulo'],
                colab[0]['descripcion'],
                colab[0]['admite_externos'],
                colab[0]['responsable'],
                p
            );
        }).catch((err) => {
            console.log(err);
            console.log("Se ha producido un error al intentar obtener los profesores que trabajan en la colaboracion  ", id_colab);
        }).finally(()=>{
            knex.destroy();
        });

    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar obtener la colaboracion con id ", id_colab);
    }).finally(()=>{
        knex.destroy();
    });// hacer join con tabla de mensajes para sollucionar porblema de cuello de botella.
}

/*function ObtenerColaboracion(id_colab){
    return knex('colaboracion').where({
        id: id_colab
    }).join('profesor_colaboracion', 'id_colaboracion', '=', 'id').select('colaboracion.id', 'colaboracion.titulo', 'colaboracion.descripcion',
    'colaboracion.admite_externos', 'colaboracion.responsable', 'profesor_colaboracion.id_profesor').then((colab) =>{
        console.log(colab);
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar obtener la colaboracion con id ", id_colab);
    }).finally(()=>{
        knex.destroy();
    });// hacer join con tabla de mensajes para sollucionar porblema de cuello de botella.
}*/
function ActualizarColaboracion(colaboracion){
    copia = ObtenerColaboracion(colaboracion.getId());
    return knex('colaboracion').where('id', colaboracion.getId()).update({
        titulo: colaboracion.getTitulo(),
        descripcion: colaboracion.getDescripcion(),
        admite_externos: colaboracion.getAdmite(),
        responsable: colaboracion.getResponsable()
    }).then(() =>{
        return knex('profesor_colaboracion').where('id_colaboracion', colaboracion.getId()).del().then(() =>{
            const fieldsToInsert = colaboracion.getProfesores().map(profes =>({id_profesor: profes, id_colaboracion: colaboracion.getId()}));
            return knex('profesor_colaboracion').insert(fieldsToInsert).then(()=>{
            });
        });
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar actualizar la colaboracion con id ", colaboracion.getId());
        ActualizarColaboracion(copia);
        console.log(" se procederá a su restauracion");
    }).finally(()=>{
        knex.destroy();
    });
}
function EliminarColaboracion(id_colab){
    return knex('colaboracion').where({
        id: id_colab
    }).del().then((result)=>{
        if(result > 0){
            console.log("Se ha eliminado de la base de datos la colaboracion con id ", id_colab);
        }else{
            console.log("No existe la colaboracion con id ", id_colab);
        }
    }).catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar eliminar la colaboracion con id ", id_colab);
    }).finally(()=>{
        knex.destroy();
    });
}

module.exports = {knex, CrearColaboracion, ObtenerColaboracion, ActualizarColaboracion, EliminarColaboracion}