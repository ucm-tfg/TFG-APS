import { Component, OnInit } from '@angular/core';
import { OfertaService } from 'src/app/services/oferta.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import {Oferta} from '../../models/oferta.model';
import Swal from 'sweetalert2';

import { CUATRIMESTRE } from '../../models/cuatrimestre.model';
import { Profesor } from '../../models/profesor.model';
import { AREA_SERVICIO } from '../../models/areaServicio.model';
import { OfertaCrearGuard } from 'src/app/guards/oferta-crear.guard';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ofertas', // Selector para definir objetos de la clase
    templateUrl: './ofertas.component.html',
    styleUrls: ['./ofertas.component.scss']
})

export class OfertasComponent implements OnInit{

    public CUATRIMESTRES = CUATRIMESTRE;
    public PROFESORES = Profesor;
    public AREA_SERVICIO = AREA_SERVICIO;
    
    
    //public ANIO_ACADEMICOS = ANIO_ACADEMICO;
    //public FECHAS_LIMIT = FECHA_LIMIT;
    //public OBSERVACIONES = OBSERVACIONES;

    public skip: number = 0;
    public limit: number = 5;
    public pagina_actual: number = 1;

    public totalOfertas: number = 0;
    public ofertas: Oferta[];

    public terminoBusqueda: string = '';
    public totalOfertasBuscadas: number = 0;


    public cargando: boolean = false;
    public cargandoTimeOut;


    public filterProfesores = {};
    public filterAreaServicio = {};
    public filterCuatrimestre = {};
    public filterCreador = '';

    constructor( public ofertaCrearGuard: OfertaCrearGuard, public ofertaService: OfertaService, public usuarioService: UsuarioService, private router: Router ){
        CUATRIMESTRE.forEach(cuatrimestre => {this.filterCuatrimestre[cuatrimestre] = false;});
        //this.profesores.forEach(profesor => {this.filterProfesores[profesor] = false;})
        AREA_SERVICIO.forEach(areaServicio => {this.filterAreaServicio[areaServicio] = false;});
        if(this.router.url === '/mis-ofertas'){
            this.filterCreador = this.usuarioService.usuario.uid;
        }
    }
    
    get prevLimit() {
        return -1 * this.limit;
    }
    
    get nextLimit() {
        return this.limit;
    }

    get firstPageRecord() {
        const minResultados = Math.min(this.totalOfertas, this.totalOfertasBuscadas);
        
        if(minResultados === 0) {
            return 0;
        }
        return this.skip + 1;
    }

    ngOnInit(): void {
        this.cargarOfertas();
    }
    
    cambiarPagina( per_page: number ) {
        this.skip += per_page;
        
        if(this.skip < 0) { this.skip = 0; }
        if(this.skip >= Math.min(this.totalOfertas, this.totalOfertasBuscadas)) { this.skip -= per_page; }
    
        this.cargarOfertas();
    }

    getFiltros() {
        return {
            terminoBusqueda: this.terminoBusqueda,
            profesores: this.filterProfesores,
            cuatrimestre: this.filterCuatrimestre,
            areaServicio: this.filterAreaServicio,
            creador: this.filterCreador,
        };
    }

    cargarOfertas() {
        this.ofertaService.cargarOfertas(this.skip, this.limit, this.getFiltros())
            .subscribe( ({total, filtradas, ofertas}) => {
              this.totalOfertas = total.valueOf();
              this.totalOfertasBuscadas = filtradas.valueOf();
              this.ofertas = ofertas;
              this.cargando = false;
            });
      }
}