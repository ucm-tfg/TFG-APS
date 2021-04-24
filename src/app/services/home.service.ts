import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';

import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  cargarDatosHome() {
    return this.http.get<{ ok: boolean, datos: Object}>(`${ base_url }/home`, this.usuarioService.headers)
                    .pipe(
                      map( (resp) => resp )
                    );
  }
  obtenerUniversidades(){
    return this.http.get<{ ok: boolean, universidades: any}>(`${ base_url }/home/universidades`,this.usuarioService.headers)
                    .pipe(
                     map( (resp) => resp)
                    );
  }

  obtenerAreasServicio(){
    return this.http.get<{ ok: boolean, areasServicio: any}>(`${ base_url }/home/areasServicio`,this.usuarioService.headers)
                    .pipe(
                      map( (resp) => resp)
                    );
  }
  obtenerNecesidades(){
    return this.http.get<{ ok: boolean, necesidades: any}>(`${ base_url }/home/necesidades`,this.usuarioService.headers)
                    .pipe(
                      map( (resp) => resp)
                    );
  }
  obtenerTitulaciones(){
    return this.http.get<{ ok: boolean, titulaciones: any}>(`${ base_url }/home/titulaciones`,this.usuarioService.headers)
                    .pipe(
                      map( (resp) => resp)
                    );
  }
}
