import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Demanda } from '../models/demanda.model';
import { map } from 'rxjs/operators';
import { UsuarioService } from './usuario.service';
import { FileUploadService } from './file-upload.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DemandaService {

  constructor( private http: HttpClient, private usuarioService: UsuarioService, private fileUploadService: FileUploadService) { }


  crearDemanda(body: Object) {
    return this.http.post<{ ok: boolean, Demanda: Demanda}>(`${ base_url }/demandas`, body, this.usuarioService.headers)
                    .pipe(
                      map( (resp) => { return resp; } )
                    );
  }

  obtenerAreasServicio(){
    return this.http.get<{ ok: boolean, areasServicio: any}>(`${ base_url }/demandas/areasservicio`,this.usuarioService.headers)
    .pipe(
      map( (resp) => resp)
    );
  }
  obtenerNecesidades(){
    return this.http.get<{ ok: boolean, Necesidades: any}>(`${ base_url }/demandas/necesidades`,this.usuarioService.headers)
    .pipe(
      map( (resp) => resp)
    );
  }
  obtenerTitulaciones(){
    return this.http.get<{ ok: boolean, Titulaciones: any}>(`${ base_url }/demandas/titulaciones`,this.usuarioService.headers)
    .pipe(
      map( (resp) => resp)
    );
  }
}