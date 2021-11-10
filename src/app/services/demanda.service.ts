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

  constructor(private http: HttpClient, private usuarioService: UsuarioService, private fileUploadService: FileUploadService) { }

  obtenerDemanda() {
    return this.http.get<{ ok: boolean, demanda: any }>(`${base_url}/demandas/demanda/136`, this.usuarioService.headers)
      .pipe(
        map((resp) => resp)
      );
  }

  crearDemanda(body: Object) {
    return this.http.post<{ ok: boolean, Demanda: Demanda }>(`${base_url}/demandas`, body, this.usuarioService.headers)
      .pipe(
        map((resp) => { return resp; })
      );
  }

  mapearDemandas(demandas: any): Demanda[] {
    return demandas.map(

      demanda => new Demanda(
        demanda._id, 
        demanda.titulo, 
        demanda.descripcion, 
        demanda.imagen, 
        demanda.ciudad,
        demanda.objetivo, 
        demanda.areaServicio, 
        demanda.periodoDefinicionIni, 
        demanda.periodoDefinicionFin,
        demanda.periodoEjecucionIni,
        demanda.periodoEjecucionFin, 
        demanda.fechaFin, 
        demanda.observacionesTemporales, 
        demanda.necesidad_social,
        demanda.titulacion_local, 
        demanda.creador, 
        demanda.comunidadBeneficiaria, 
        demanda.createdAt,
        demanda.updatedAt || '')
    );
  }
  cargarDemanda(id: string) {
    return this.http.get<{ ok: boolean, demanda: Demanda }>(`${base_url}/demandas/${id}`, this.usuarioService.headers)
      .pipe(
        map((resp: { ok: boolean, demanda: Demanda }) => resp.demanda)
      );
  }ññ

  cargarDemandas(skip: number, limit: number, filtros: Object) {
    return this.http.get<{ total: Number, filtradas: Number, demandas: Demanda[] }>(`${base_url}/demandas?skip=${skip}&limit=${limit}&filtros=${encodeURIComponent(JSON.stringify(filtros))}`, this.usuarioService.headers)
      .pipe(
        map(resp => { return { total: resp.total, filtradas: resp.filtradas, demandas: this.mapearDemandas(resp.demandas) }; })
      );
  }

  obtenerAreasServicio() {
    return this.http.get<{ ok: boolean, areaServicio: any }>(`${base_url}/demandas/areasservicio`, this.usuarioService.headers)
      .pipe(
        map((resp) => resp)
      );
  }
  obtenerNecesidades() {
    return this.http.get<{ ok: boolean, necesidadSocial: any }>(`${base_url}/demandas/necesidadsocial`, this.usuarioService.headers)
      .pipe(
        map((resp) => resp)
      );
  }
  obtenerTitulaciones() {
    return this.http.get<{ ok: boolean, titulacionLocal: any }>(`${base_url}/demandas/titulacionlocal`, this.usuarioService.headers)
      .pipe(
        map((resp) => resp)
      );
  }
}