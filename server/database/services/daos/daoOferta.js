const knex = require("../../config");
const daoUsuario = require("./daoUsuario");
const transferOfertaServicio = require("../transfers/TOfertaServicio");
const transferAnuncioServicio = require("../transfers/TAnuncioServicio");

//INSERTAR------------------------------------------------------------------------------------------------
function crearAnuncio(anuncio) {
    return knex("anuncio_servicio")
      .insert({
        titulo: anuncio.getTitulo(),
        descripcion: anuncio.getDescripcion(),
        imagen: anuncio.getImagen(),
        dummy: anuncio.dummy,
      })
      .then((id_anuncio) => {
        let areasServicio = anuncio.getArea_servicio();
        let fieldsToInsert = { id_area: areasServicio, id_anuncio: id_anuncio };
        if (Array.isArray(areasServicio)) {
          console.log("Se va a proceder a insertar las areas de servicio");
          fieldsToInsert = areasServicio.map((area) => ({
            id_area: area,
            id_anuncio: id_anuncio,
          }));
          return knex("areaservicio_anuncioservicio")
            .insert(fieldsToInsert)
            .then(() => {
              console.log("Se han insertado las areas de servicio")
              return id_anuncio;
            });
        } else {
          return knex("areaservicio_anuncioservicio")
            .insert({ id_area: areasServicio, id_anuncio: id_anuncio })
            .then(() => {
              return id_anuncio;
            });
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(
          "Se ha producido un error al intentar crear el anuncio con titulo ",
          titulo
        );
      });
  }
  
  function crearOferta(oferta) {
    return crearAnuncio(oferta)
      .then(function (id_anuncio) {
        return knex("oferta_servicio")
          .insert({
            id: id_anuncio[0],
            cuatrimestre: oferta.getCuatrimestre(),
            anio_academico: oferta.getAnio_academico(),
            fecha_limite: oferta.getFecha_limite(),
            observaciones_temporales: oferta.getObservaciones_temporales(),
            creador: oferta.getCreador(),
          })
          .then(function (result) {
            id = id_anuncio[0];
            asignaturas = oferta.getAsignatura_objetivo();
            let fieldsToInsert = {
              id_oferta: id_anuncio[0],
              nombre: asignaturas,
            };
            if (Array.isArray(asignaturas)) {
              fieldsToInsert = asignaturas.map((asignatura) => ({
                id_oferta: id_anuncio[0],
                nombre: asignatura,
              }));
            }
            return knex("asignatura")
              .insert(fieldsToInsert)
              .then(() => {
                let profesores = oferta.getProfesores();
                let fieldsToInsert2 = {
                  id_profesor: profesores,
                  id_oferta: id_anuncio[0],
                };
                if (Array.isArray(profesores)) {
                  fieldsToInsert2 = profesores.map((profesor) => ({
                    id_profesor: profesor,
                    id_oferta: id_anuncio[0],
                  }));
                }
                return knex("profesorinterno_oferta")
                  .insert(fieldsToInsert2)
                  .then(() => {
                    console.log(
                      "Se ha introducido la oferta con id ",
                      id_anuncio[0]
                    );
                  });
              });
          })
          .catch((err) => {
            console.log(err);
            console.log(
              "Se ha producido un error al crear en la base de datos la oferta de servicio ",
              id_anuncio[0]
            );
            return knex("anuncio_servicio").where("id", id_anuncio[0]).del();
          });
      })
      .catch((err) => {
        console.log(err);
        console.log(
          "Se ha producido un error al crear en la base de datos la oferta de servicio"
        );
      });
  }

  // Devuelve la oferta que tenga el id = "id_oferta"
function obtenerOfertaServicio(id_oferta) {
    return obtenerAnuncioServicio(id_oferta)
      .then(function (anuncio) {
        return knex("oferta_servicio")
          .where({ id: id_oferta })
          .select("*")
          .then(function (oferta) {
            return knex("profesorinterno_oferta")
              .where({ id_oferta: id_oferta })
              .select("id_profesor")
              .then((datos_profesores) => {
                let arrayProfesores = [];
                datos_profesores.forEach((profesor) => {
                  arrayProfesores.push(profesor["id_profesor"]);
                });
                return daoUsuario
                  .obtenerProfesorInterno(oferta[0]["creador"])
                  .then((responsable) => {
                    return daoUsuario
                      .obtenerProfesoresInternos(arrayProfesores)
                      .then(function (profesores) {
                        return obtenerAsignaturaObjetivo(id_oferta).then(
                          (asignaturas) => {
                            asignaturas_ref = [];
                            for (asignatura of asignaturas) {
                              asignaturas_ref.push(asignatura["nombre"]);
                            }
                            return new transferOfertaServicio(
                              oferta[0]["id"],
                              anuncio.getTitulo(),
                              anuncio.getDescripcion(),
                              anuncio.getImagen(),
                              anuncio.getCreated_at(),
                              anuncio.getUpdated_at(),
                              asignaturas_ref,
                              oferta[0]["cuatrimestre"],
                              oferta[0]["anio_academico"],
                              oferta[0]["fecha_limite"],
                              oferta[0]["observaciones_temporales"],
                              { id: responsable.getId(), 
                                nombre: responsable.getNombre(), 
                                apellidos: responsable.getApellidos()
                              },
                              anuncio.getArea_servicio(),
                              profesores,
                              oferta[0]["dummy"]
                            );
                          }
                        );
                      });
                  });
              });
          });
      })
      .catch((err) => {
        console.log(err);
        console.log(
          "Se ha producido un error al intentar obtener de la base de datos la oferta de servicio con id ",
          id_oferta
        );
      });
  }

  /*
  function obtenerOfertas(){
    return knex("oferta_servicio")
              .from("oferta_servicio")
              .select("*")
              .then((rows) => {
                let transfer_oferta = [];
                rows.forEach()

                }
              })
  }
  */
  //LEER TODOS LOS ELEMENTOS------------------------------------------------------------------------------------------------
function obtenerTodasOfertasServicio() {
    return knex("anuncio_servicio")
      .join("oferta_servicio", "anuncio_servicio.id", "=", "oferta_servicio.id")
      .join(
        "profesor_interno",
        "oferta_servicio.creador",
        "=",
        "profesor_interno.id"
      )
      .join(
        "datos_personales_interno",
        "profesor_interno.datos_personales_Id",
        "=",
        "datos_personales_interno.id"
      )
      .select(
        "anuncio_servicio.id",
        "anuncio_servicio.titulo",
        "anuncio_servicio.descripcion",
        "anuncio_servicio.imagen",
        "anuncio_servicio.created_at",
        "anuncio_servicio.updated_at",
        "oferta_servicio.cuatrimestre",
        "oferta_servicio.anio_academico",
        "oferta_servicio.fecha_limite",
        "oferta_servicio.observaciones_temporales",
        "datos_personales_interno.nombre",
        "datos_personales_interno.apellidos"
      )
      .then((datos_ofertas) => {
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
            return knex
              .select("*")
              .from("asignatura")
              .then((asignaturas) => {
                let transfer_ofertas = [];
                datos_ofertas.forEach((datos) => {
                  let nombre = datos["nombre"];
                  let apellidos = datos["apellidos"];
                  let creador = { nombre, apellidos };
                  let areas_servicio = [];
                  areas.forEach((area) => {
                    if (area["id_anuncio"] === datos["id"]) {
                      areas_servicio.push(area["area"]);
                    }
                  });
                  let asignaturas_objetivo = [];
                  asignaturas.forEach((asignatura) => {
                    if (datos["id"] === asignatura["id_oferta"]) {
                      asignaturas_objetivo.push(asignatura["nombre"]);
                    }
                  });
                  let transfer_oferta = new transferOfertaServicio(
                    datos["id"],
                    datos["titulo"],
                    datos["descripcion"],
                    datos["imagen"],
                    datos["created_at"],
                    datos["updated_at"],
                    asignaturas_objetivo,
                    datos["cuatrimestre"],
                    datos["anio_academico"],
                    datos["fecha_limite"],
                    datos["observaciones_temporales"],
                    creador,
                    areas_servicio
                  );
                  transfer_ofertas.push(transfer_oferta);
                });
                return transfer_ofertas;
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

  function actualizarOfertaServicio(oferta) {
    return obtenerAnuncioServicio(oferta.getId()).then((copia_anuncio) => {
      return actualizarAnuncio(oferta)
        .then(function () {
          return knex("oferta_servicio")
            .where("id", oferta.getId())
            .update({
              cuatrimestre: oferta.getCuatrimestre(),
              anio_academico: oferta.getAnio_academico(),
              fecha_limite: oferta.getFecha_limite(),
              observaciones_temporales: oferta.getObservaciones_temporales(),
              creador: oferta.getCreador(),
            })
            .then(function (result) {
              return knex("asignatura")
                .where("id_oferta", oferta.getId())
                .del()
                .then(() => {
                  asignaturas = oferta.getAsignatura_objetivo();
                  let fieldsToInsert = {
                    id_oferta: oferta.getId(),
                    nombre: asignaturas,
                  };
                  if (Array.isArray(asignaturas)) {
                    fieldsToInsert = asignaturas.map((asignatura) => ({
                      id_oferta: oferta.getId(),
                      nombre: asignatura,
                    }));
                  }
                  return knex("asignatura")
                    .insert(fieldsToInsert)
                    .then(() => {
                      return knex("profesorinterno_oferta")
                        .where("id_oferta", oferta.getId())
                        .del()
                        .then(() => {
                          profesores = oferta.getProfesores();
                          let fieldsToInsert2 = {
                            id_profesor: profesores,
                            id_oferta: oferta.getId(),
                          };
                          if (Array.isArray(profesores)) {
                            fieldsToInsert2 = profesores.map((profesor) => ({
                              id_profesor: profesor,
                              id_oferta: oferta.getId(),
                            }));
                          }
                          return knex("profesorinterno_oferta")
                            .insert(fieldsToInsert2)
                            .then(() => {
                              console.log(
                                "Se ha actualizado la oferta con id ",
                                oferta.getId()
                              );
                            });
                        });
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
                    "Se ha producido un error al intentar actualizar en la base de datos la oferta de servicio con id ",
                    oferta.getId()
                  );
                });
              });
            });
        })
        .catch((err) => {
          console.log(err);
          console.log(
            "Se ha producido un error al intentar actualizar en la base de datos la oferta de servicio con id ",
            oferta.getId()
          );
        });
    });
  }

  function eliminarOferta(id_oferta) {
    return knex("oferta_servicio")
      .where("id", id_oferta)
      .del()
      .then((result) => {
        return eliminarAnuncio(id_oferta).then(() => {
          if (result > 0) {
            console.log(
              "Se ha eliminado de la base de datos la oferta con id ",
              id_oferta
            );
          } else {
            console.log("No existe la oferta de servicio con id ", id_oferta);
          }
        });
      })
      .catch((err) => {
        console.log(err);
        console.log(
          "Se ha producido un error al intentar eliminar de la base de datos la oferta de servicio con id ",
          id_oferta
        );
      });
  }
  //ACTUALIZAR--------------------------------------------------------------------------------------------------
function actualizarAnuncio(anuncio) {
    return knex("anuncio_servicio")
      .where("id", anuncio.getId())
      .update({
        titulo: anuncio.getTitulo(),
        descripcion: anuncio.getDescripcion(),
        imagen: anuncio.getImagen(),
      })
      .then(() => {
        return knex("areaservicio_anuncioservicio")
          .where("id_anuncio", anuncio.getId())
          .del()
          .then(() => {
            let areasServicio = anuncio.getArea_servicio();
            let fieldsToInsert = {
              id_area: areasServicio,
              id_anuncio: anuncio.getId(),
            };
            if (Array.isArray(areasServicio)) {
              fieldsToInsert = areasServicio.map((area) => ({
                id_area: area,
                id_anuncio: anuncio.getId(),
              }));
            }
            return knex("areaservicio_anuncioservicio").insert(fieldsToInsert);
          });
      })
      .catch((err) => {
        console.log(err);
        console.log(
          "Se ha producido un error al intentar actualizar el anuncio con titulo ",
          titulo
        );
      });
  }

  //ELIMINAR UN ELEMENTO---------------------------------------------------------------------------------------------------
function eliminarAnuncio(id) {
    return knex("anuncio_servicio")
      .where("id", id)
      .del()
      .then((result) => {
        if (result > 0) {
          console.log(
            "Se ha eliminado de la base de datos el anuncio con id ",
            id
          );
        } else {
          console.log("No existe el anuncio de servicio con id ", id);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(
          "Se ha producido un error al intentar eliminar de la base de datos el anuncio de servicio con id ",
          id
        );
      });
  }

  
  //LEER UN ELEMENTO----------------------------------------------------------------------------------------------------
function obtenerAnuncioServicio(id_anuncio) {
    return knex("anuncio_servicio")
      .where({ id: id_anuncio })
      .select("*")
      .then((anuncio) => {
        return obtenerAreaServicio(id_anuncio).then((areas_servicio) => {
          areas = [];
          for (area of areas_servicio) {
            areas.push(area["nombre"]);
          }
          return new transferAnuncioServicio(
            id_anuncio,
            anuncio[0]["titulo"],
            anuncio[0]["descripcion"],
            anuncio[0]["imagen"],
            anuncio[0]["created_at"],
            anuncio[0]["updated_at"],
            areas,
            anuncio[0]["dummy"]
          );
        });
      });
  }

  // MÉTODOS AUXILIARES----------------------------------------------------------------------------------------------------
function obtenerAsignaturaObjetivo(id_oferta) {
    return knex("asignatura")
      .where({ id_oferta: id_oferta })
      .select("nombre")
      .catch((err) => {
        console.log(
          "No se ha encontrado la asignatura objetivo perteneciente a la oferta de servicio con id ",
          id_demanda
        );
        throw err;
      });
  }


  // Obtiene el area de servicio correspondiente al id de un anuncio de servicio
function obtenerAreaServicio(id_anuncio) {
    return knex("areaservicio_anuncioservicio")
      .where({ id_anuncio: id_anuncio })
      .select("id_area")
      .then(function (id_areas) {
        areas = [];
        for (id_area of id_areas) {
          areas.push(id_area["id_area"]);
        }
        return knex.select("*").from("area_servicio").whereIn("id", areas);
      })
      .catch((err) => {
        console.log(
          "No se ha encontrado el area de servicio perteneciente al anuncio de servicio con id ",
          id_anuncio
        );
        throw err;
      });
  }
  
  

  function obtenerIdsAreas(nombre_areas) {
    return knex("area_servicio")
      .whereIn("nombre", nombre_areas)
      .select("id")
      .then((ids) => {
        let ids_areas = [];
        ids.forEach((id) => {
          ids_areas.push(id["id"]);
        });
        return ids_areas;
      })
      .catch((err) => {
        console.log(err);
        console.log(
          "Se ha producido un error al intentar obtener las ids a partir de los nombres de area"
        );
      });
  }
  
  function obtenerAreasServicio(id_anuncio) {
    return knex("areaservicio_anuncioservicio")
      .join(
        "area_servicio",
        "areaservicio_anuncioservicio.id_area",
        "=",
        "area_servicio.id"
      )
      .where({ id_anuncio: id_anuncio })
      .select("area_servicio.nombre")
      .then((areas) => {
        var nombres_areas = [];
        areas.forEach((area) => {
          nombres_areas.push(area["nombre"]);
        });
        return nombres_areas;
      })
      .catch((err) => {
        console.log(err);
        console.log(
          "Se ha producido un error al intentar obtener el area de servicio del anuncio ",
          id_anuncio
        );
      });
  }
  
  function obtenerListaAreasServicio() {
    return knex("area_servicio")
      .select("id")
      .select("nombre")
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

  function obtenerCreadorOferta(id) {
    return knex("oferta_servicio")
      .where({ id: id })
      .select("creador")
      .then((creador) => {
        return creador[0]["creador"];
      })
      .catch((err) => {
        console.log(err);
        console.log(
          "Se ha producido un error al intentar obtener el creador de la oferta ",
          id
        );
      });
  }
  
  function obtenerAreaServicioConocimientoPorArea(servicios) {
    return knex
      .select("area_conocimiento")
      .from("matching_areas")
      .whereIn("area_servicio", servicios)
      .catch((err) => {
        console.log(err);
        console.log(
          "Se ha producido un error al intentar obtener datos de la tabla matching_areas"
        );
      });
  }
  
  function obtenerAreaServicioTitulacionPorArea(servicios) {
    return knex
      .select("titulacion")
      .from("matching_areaservicio_titulacion")
      .whereIn("area_servicio", servicios)
      .catch((err) => {
        console.log(err);
        console.log(
          "Se ha producido un error al intentar obtener datos de la tabla matching_areaservicio_titulacion"
        );
      });
  }

  module.exports = {
    crearAnuncio,
    crearOferta,
    obtenerOfertaServicio,
    obtenerTodasOfertasServicio,
    obtenerAnuncioServicio,
    actualizarOfertaServicio,
    eliminarOferta,
    actualizarAnuncio,
    eliminarAnuncio,
  };