const knex = require("../../config");
const daoUsuario = require("./daoUsuario");
const transferDemandaServicio = require("../transfers/TDemandaServicio");

function crearDemanda(demanda) {
    return crearAnuncio(demanda)
      .then(function (id_anuncio) {
        return knex("demanda_servicio")
          .insert({
            id: id_anuncio[0],
            creador: demanda.getCreador(),
            ciudad: demanda.getCiudad(),
            finalidad: demanda.getFinalidad(),
            periodo_definicion_ini: demanda.getPeriodo_definicion_ini(),
            periodo_definicion_fin: demanda.getPeriodo_definicion_fin(),
            periodo_ejecucion_ini: demanda.getPeriodo_ejecucion_ini(),
            periodo_ejecucion_fin: demanda.getPeriodo_ejecucion_fin(),
            fecha_fin: demanda.getFecha_fin(),
            observaciones_temporales: demanda.getObservaciones_temporales(),
            necesidad_social: demanda.getNecesidad_social(),
            comunidad_beneficiaria: demanda.getComunidad_Beneficiaria()
          })
          .then(function () {
            let titulaciones = demanda.getTitulacionlocal_demandada();
            console.log("Las titulaciones a insertar son ", titulaciones);
            let fieldsToInsert = {
              id_titulacion: titulaciones,
              id_demanda: id_anuncio[0],
            };
            if (Array.isArray(titulaciones)) {
              console.log("Ahora se va a proceder a insertar el array de titulaciones ", titulaciones);
              fieldsToInsert = titulaciones.map((titulacion) => ({
                id_titulacion: titulacion,
                id_demanda: id_anuncio[0],
              }));
            }
            return knex("titulacionlocal_demanda")
              .insert(fieldsToInsert)
              .then(() => {
                console.log(
                  "Se ha introducido la demanda con id ",
                  id_anuncio[0]
                );
              });
          })
          .catch((err) => {
            console.log(err);
            console.log(
              "Se ha producido un error al crear en la base de datos la demanda de servicio ",
              id_anuncio[0]
            );
            return knex("anuncio_servicio").where("id", id_anuncio[0]).del();
          });
      })
      .catch((err) => {
        console.log(err);
        console.log(
          "Se ha producido un error al crear en la base de datos la demanda de servicio con id ",
          demanda.getId()
        );
      });
  }

  function obtenerListaAreasServicio() {
    return knex("area_servicio")
      .select("*")
      .then((areas) => {
        return areas;
      })
      .catch((err) => {
        console.log(err);
        console.log(
          "Se ha producido un error al intentar obtener todas las areas de servicio"
        );
      });
  }

  // Devuelve la demanda que tenga el id = "id_demanda"
function obtenerDemandaServicio(id_demanda) {
    return obtenerAnuncioServicio(id_demanda)
      .then(function (anuncio) {
        return knex("demanda_servicio")
          .where({ id: id_demanda })
          .select("*")
          .then(function (demanda) {
            return knex("necesidad_social")
              .where({ id: demanda[0]["necesidad_social"] })
              .select("nombre")
              .then(function (necesidad_social) {
                return daoUsuario
                  .obtenerSocioComunitario(demanda[0]["creador"])
                  .then((socio) => {
                    return obtenerTitulacionLocal(id_demanda).then(function (
                      titulaciones
                    ) {
                      titulaciones_ref = [];
                      for (titulacion of titulaciones) {
                        titulaciones_ref.push(titulacion["nombre"]);
                      }
                      necesidad_social = necesidad_social[0]["nombre"];
                      return new transferDemandaServicio(
                        demanda[0]["id"],
                        anuncio.getTitulo(),
                        anuncio.getDescripcion(),
                        anuncio.getImagen(),
                        anuncio.getCreated_at(),
                        anuncio.getUpdated_at(),
                        socio.getNombreSocioComunitario(),
                        demanda[0]["ciudad"],
                        demanda[0]["finalidad"],
                        demanda[0]["periodo_definicion_ini"],
                        demanda[0]["periodo_definicion_fin"],
                        demanda[0]["periodo_ejecucion_ini"],
                        demanda[0]["periodo_ejecucion_fin"],
                        demanda[0]["fecha_fin"],
                        demanda[0]["observaciones_temporales"],
                        necesidad_social,
                        titulaciones_ref,
                        anuncio.getArea_servicio(),
                        anuncio.dummy
                      );
                    });
                  });
              });
          });
      })
      .catch((err) => {
        console.log(err);
        console.log(
          "Se ha producido un error al intentar obtener de la base de datos la demanda de servicio con id ",
          id_demanda
        );
      });
  }


  function obtenerTodasDemandasServicio() {
    return knex("anuncio_servicio")
      .join("demanda_servicio", "anuncio_servicio.id", "=", "demanda_servicio.id")
      .join(
        "necesidad_social",
        "demanda_servicio.necesidad_social",
        "=",
        "necesidad_social.id"
      )
      .join("socio_comunitario", "demanda_servicio.creador", "=", "socio_comunitario.id")
      .join(
        "datos_personales_externo",
        "socio_comunitario.datos_personales_Id",
        "=",
        "datos_personales_externo.id"
      )
      .select(
        "anuncio_servicio.id",
        "anuncio_servicio.titulo",
        "anuncio_servicio.descripcion",
        "anuncio_servicio.imagen",
        "anuncio_servicio.created_at",
        "anuncio_servicio.updated_at",
        "demanda_servicio.ciudad",
        "demanda_servicio.finalidad",
        "demanda_servicio.fecha_fin",
        "demanda_servicio.observaciones_temporales",
        "demanda_servicio.periodo_definicion_ini",
        "demanda_servicio.periodo_definicion_fin",
        "demanda_servicio.periodo_ejecucion_ini",
        "demanda_servicio.periodo_ejecucion_fin",
        "necesidad_social.nombre as necesidad",
        "datos_personales_externo.nombre",
        "datos_personales_externo.apellidos"
      )
      .then((datos_demandas) => {
        return knex("areaservicio_anuncioservicio")
          .join(
            "area_servicio",
            "areaservicio_anuncioservicio.id_area",
            "=",
            "area_servicio.id"
          )
          .select(
            "areaservicio_anuncioservicio.id_anuncio",
            "area_servicio.nombre as area"
          )
          .then((areas) => {
            return knex("titulacionlocal_demanda")
              .join(
                "titulacion_local",
                "titulacionlocal_demanda.id_titulacion",
                "=",
                "titulacion_local.id"
              )
              .select(
                "titulacionlocal_demanda.id_demanda",
                "titulacion_local.nombre as titulacion"
              )
              .then((titulaciones) => {
                let transfer_demandas = [];
                datos_demandas.forEach((datos) => {
                  let nombre = datos["nombre"];
                  let apellidos = datos["apellidos"];
                  let creador = { nombre, apellidos };
                  let areas_servicio = [];
                  areas.forEach((area) => {
                    if (area["id_anuncio"] === datos["id"]) {
                      areas_servicio.push(area["area"]);
                    }
                  });
                  let titulaciones_objetivo = [];
                  titulaciones.forEach((titulacion) => {
                    if (titulacion["id_demanda"] === datos["id"]) {
                      titulaciones_objetivo.push(titulacion["titulacion"]);
                    }
                  });
                  let transfer_demanda = new transferDemandaServicio(
                    datos["id"],
                    datos["titulo"],
                    datos["descripcion"],
                    datos["imagen"],
                    datos["created_at"],
                    datos["updated_at"],
                    creador,
                    datos["ciudad"],
                    datos["finalidad"],
                    datos["periodo_definicion_ini"],
                    datos["periodo_definicion_fin"],
                    datos["periodo_ejecucion_ini"],
                    datos["periodo_ejecucion_fin"],
                    datos["fecha_fin"],
                    datos["observaciones_temporales"],
                    datos["necesidad"],
                    titulaciones_objetivo,
                    areas_servicio
                  );
                  transfer_demandas.push(transfer_demanda);
                });
                return transfer_demandas;
              });
          });
      })
      .catch((err) => {
        console.log(err);
        console.log(
          "Se ha producido un error al intentar obtener de la base de datos todas las ofertas de servicio "
        );
      });
  }

  function actualizarDemanda(demanda) {
    return obtenerAnuncioServicio(demanda.getId()).then((copia_anuncio) => {
      return actualizarAnuncio(demanda)
        .then(function (id_anuncio) {
          return knex("demanda_servicio")
            .where("id", demanda.getId())
            .update({
              creador: demanda.getCreador(),
              ciudad: demanda.getCiudad(),
              finalidad: demanda.getFinalidad(),
              periodo_definicion_ini: demanda.getPeriodo_definicion_ini(),
              periodo_definicion_fin: demanda.getPeriodo_definicion_fin(),
              periodo_ejecucion_ini: demanda.getPeriodo_ejecucion_ini(),
              periodo_ejecucion_fin: demanda.getPeriodo_ejecucion_fin(),
              fecha_fin: demanda.getFecha_fin(),
              observaciones_temporales: demanda.getObservaciones_temporales(),
              necesidad_social: demanda.getNecesidad_social(),
            })
            .then(function () {
              return knex("titulacionlocal_demanda")
                .where("id_demanda", demanda.getId())
                .del()
                .then(() => {
                  let titulaciones = demanda.getTitulacionlocal_demandada();
                  let fieldsToInsert = {
                    id_titulacion: titulaciones,
                    id_demanda: demanda.getId(),
                  };
                  if (Array.isArray(titulaciones)) {
                    fieldsToInsert = titulaciones.map((titulacion) => ({
                      id_titulacion: titulacion,
                      id_demanda: demanda.getId(),
                    }));
                  }
                  return knex("titulacionlocal_demanda")
                    .insert(fieldsToInsert)
                    .then(() => {
                      console.log(
                        "Se ha actualizado la demanda con id ",
                        demanda.getId()
                      );
                    });
                });
            })
            .catch((err) => {
              console.log(err);
              let nombre_areas = copia_anuncio.getArea_servicio();
              return obtenerIdsAreas(nombre_areas).then((ids_areas) => {
                copia_anuncio.setArea_servicio(ids_areas);
                return actualizarAnuncio(copia_anuncio).then(() => {
                  console.log(
                    "Se ha producido un error al intentar actualizar en la base de datos la demanda de servicio con id ",
                    demanda.getId()
                  );
                });
              });
            });
        })
        .catch((err) => {
          console.log(err);
          console.log(
            "Se ha producido un error al intentar actualizar en la base de datos la demanda de servicio con id ",
            demanda.getId()
          );
        });
    });
  }

  function eliminarDemanda(id_demanda) {
    return knex("demanda_servicio")
      .where("id", id_demanda)
      .del()
      .then((result) => {
        return eliminarAnuncio(id_demanda).then(() => {
          if (result > 0) {
            console.log(
              "Se ha eliminado de la base de datos la demanda con id ",
              id_demanda
            );
          } else {
            console.log("No existe la demanda de servicio con id ", id_demanda);
          }
        });
      })
      .catch((err) => {
        console.log(err);
        console.log(
          "Se ha producido un error al intentar eliminar de la base de datos la demanda de servicio con id ",
          id_demanda
        );
      });
  }

  function obtenerTitulacionLocal(id_demanda) {
    return knex("titulacionlocal_demanda")
      .where({ id_demanda: id_demanda })
      .select("id_titulacion")
      .then(function (id_titulaciones) {
        titulaciones = [];
        for (id_titulacion of id_titulaciones) {
          titulaciones.push(id_titulacion["id_titulacion"]);
        }
        return knex
          .select("id")
          .select("nombre")
          .from("titulacion_local")
          .whereIn("id", titulaciones);
      })
      .catch((err) => {
        console.log(
          "No se ha encontrado titulación perteneciente a la demanda de servicio con id ",
          id_demanda
        );
        throw err;
      });
  }

function obtenerListaTitulacionLocal() {
    return knex("titulacion_local")
      .select("*")
      .then((areas) => {
        return areas;
      })
      .catch((err) => {
        console.log(err);
        console.log(
          "Se ha producido un error al intentar obtener todas las titulaciones locales"
        );
      });
}

module.exports = {
    crearDemanda,
    obtenerDemandaServicio,
    obtenerTodasDemandasServicio,
    actualizarDemanda,
    eliminarDemanda,
    obtenerTitulacionLocal,
    obtenerListaTitulacionLocal,
    obtenerListaAreasServicio
}