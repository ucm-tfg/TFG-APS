const transferColaboracion = require('../transfers/transferColaboracion');
const mysql = require ('mysql');
const transferPartenariado = require('../transfers/transferPartenariado');
const transferProyecto = require('../transfers/transferProyecto');
const knex = require('../../config');

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