const transferColaboracion = require('../transfers/transferColaboracion');
const mysql = require ('mysql');
const transferPartenariado = require('../transfers/transferPartenariado');
const transferProyecto = require('../transfers/transferProyecto');
const knex = require('../../config');
const { ModuleResolutionKind } = require('typescript');

function crearPartenariado(partenariado){
    return crearColaboracion (partenariado).then((id) => {
        return knex('partenariado').insert({
            id: id, 
            id_demanda: partenariado.getId_Demanda(), 
            id_oferta: partenariado.getId_Oferta(), 
            estado: partenariado.getEstado(),
            _v:partenariado.getV()
        })
        .catch((err) => {
            console.log(err);
            console.log("Se ha producido un error al crear el partenariado que tiene id ", id);
            return knex('colaboracion').where('id', id).del();
        })
        .finally(() => {
            knex.destroy();
        });
    })
    .catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar crear un partenariado ");
    })
    .finally(() => {
        knex.destroy();
    });
}
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

function obtenerPartenariado(id){
    return obtenerColaboracion(id).then((colaboracion) => {
        return knex('partenariado').where({ id: id }).select('*').then((partenariado) => {
            return new transferPartenariado(
                id = colaboracion.getId(),
                titulo = colaboracion.getTitulo(),
                descripcion = colaboracion.getDescripcion(),
                admite_externos = colaboracion.getAdmite(),
                responsable = colaboracion.getResponsable(),
                profesores = colaboracion.getProfesores(),
                id_demanda = partenariado.getId_Demanda(),
                id_oferta = partenariado.getId_Oferta(),
                estado = partenariado.getEstado,
                _v = partenariado.getV()
                );
        })
        .catch((err) => {
            console.log(err);
        tconsole.log("Se ha producido un error al intentar obtener el partenariado con id ", id);
        })
        .finally(() => {
            knex.destroy();
        });
    })
    .catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar obtener la colaboración con id ", id);
    })
    .finally(() => {
        knex.destroy();
    });
}

function eliminarPartenariado(id){
    return  eliminarColaboracion().then(() => {
        return knex('partenariado').where('id', id).del().then(() => {
            console.log("Se ha eliminado correctamente el partenariado con id ", id);
        })
        .catch((err) => {
            console.log(err);
            console.log("Se ha producido un error al intentar eliminar el partenariado con id ", id);
        })
    })
    .catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar eliminar la colaboracion con id ", id);
    })
    .finally(() => {
        knex.destroy();
    });
}

function actualizarPartenariado(partenariado){
    return obtenerColaboracion(partenariado.getId()).then((copia_colaboracion) =>{
    return actualizarColaboracion(partenariado).then(() => {
        return knex('partenariado').where('id', partenariado.getId()).update({
            id_demanda: partenariado.getId_Demanda(),
            id_oferta: partenariado.getId_Oferta(),
            estado: partenariado.getEstado(),
            _v: partenariado.getV()
        })
        .catch((err) => {
            console.log(err);
            console.log("Se ha producido un error al intentar actualizar el partenariado con id ", partenariado.getId());
            // Restatura el estado original de la colaboración
            return actualizarColaboracion(copia_colaboracion)
            .catch((err) => {
                console.log(err);
                console.log("Se ha producido un error al intentar restablecer la colaboracion con id ", partenariado.getId());
            })
            .finally(() => {
                knex.destroy();
            });
        })
        .finally(() => {
            knex.destroy();
        });
    })
    .catch((err) => {
        console.log(err);
        console.log("Se ha producido un error al intentar actualizar la colaboracion con id ", partenariado.getId());
    })
    .finally(() => {
        knex.destroy();
    });
});
}
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