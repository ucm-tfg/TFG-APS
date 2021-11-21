import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Oferta } from '../models/oferta.model';
import { map } from 'rxjs/operators';
import { UsuarioService } from './usuario.service';
import { FileUploadService } from './file-upload.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  constructor( private http: HttpClient, private usuarioService: UsuarioService, private fileUploadService: FileUploadService) { }

obtenerOferta(){
  return this.http.get<{ ok: boolean, oferta: any}>(`${ base_url }/ofertas/100`,this.usuarioService.headers)
    .pipe(
      map( (resp) => resp)
    );
}

mapearOfertas( ofertas: any ): Oferta[] {
  return ofertas.map(
        oferta => new Oferta(oferta._id, oferta.titulo, oferta.descripcion, oferta.imagen, oferta.created_at,
              oferta.updated_at, oferta.cuatrimestre, oferta.anio_academico, oferta.fecha_limite, oferta.observaciones, oferta.creador, oferta.area_servicio, oferta.asignatura_objetivo, oferta.profesores || '')
     );
   }


cargarOferta(id: string) {
  return this.http.get<{ ok: boolean, oferta: Oferta}>(`${ base_url }/ofertas/${ id }`, this.usuarioService.headers)
                     .pipe(
                       map( (resp: {ok: boolean, oferta: Oferta}) => resp.oferta )
                     );
   }

cargarOfertas(skip: number, limit: number, filtros: Object) {
    return this.http.get<{ total: Number, filtradas: Number, ofertas: Oferta[]}>(`${ base_url }/ofertas?skip=${ skip }&limit=${ limit }&filtros=${ encodeURIComponent( JSON.stringify(filtros)) }`, this.usuarioService.headers)
                    .pipe(
                    map( resp => { return { total: resp.total, filtradas: resp.filtradas, ofertas: this.mapearOfertas(resp.ofertas) }; })
                  );
   }

  // respaldarIniciativa(iniciativa: Iniciativa) {
  //   return this.http.put<{ ok: boolean, iniciativa: Iniciativa}>(`${ base_url }/iniciativas/respaldar/${ iniciativa._id }`, {}, this.usuarioService.headers)
  //                   .pipe(
  //                     map( (resp) => { return resp; } )
  //                   );
  // }

  crearOferta(body: Object) {
    return this.http.post<{ ok: boolean, oferta: Oferta}>(`${ base_url }/ofertas`, body, this.usuarioService.headers)
                    .pipe(
                      map( (resp) => { return resp; } )
                    );
  }

  // actualizarIniciativa(iniciativa: Iniciativa, body: Object) {
  //   return this.http.put<{ ok: boolean, iniciativa: Iniciativa}>(`${ base_url }/iniciativas/${ iniciativa._id }`, body, this.usuarioService.headers)
  //                   .pipe(
  //                     map( (resp) => { return resp; } )
  //                   );
  // }



  // archivarIniciativa(iniciativa: Iniciativa) {
  //   return this.http.delete(`${ base_url }/iniciativas/${ iniciativa._id }`, this.usuarioService.headers);
  // }


  // desarchivarIniciativa(iniciativa: Iniciativa) {
  //   return this.http.put<{ ok: boolean, iniciativa: Iniciativa}>(`${ base_url }/iniciativas/reabrir/${ iniciativa._id }`, { estado: 'Abierta' }, this.usuarioService.headers)
  //                   .pipe(
  //                     map( (resp) => { return resp; } )
  //                   );
  // }


  obtenerAreasServicio(){
    return this.http.get<{ ok: boolean, areasServicio: any}>(`${ base_url }/ofertas/areasservicio`,this.usuarioService.headers)
    .pipe(
      map( (resp) => resp)
    );
  }
}