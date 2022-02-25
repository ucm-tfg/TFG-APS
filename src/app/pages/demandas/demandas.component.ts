import { Component, OnInit } from '@angular/core';
import { DemandaService } from 'src/app/services/demanda.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import {Demanda} from '../../models/demanda.model';
import Swal from 'sweetalert2';

import { AREA_SERVICIO } from '../../models/areaServicio.model';
import { NECESIDAD_SOCIAL } from '../../models/necesidadSocial.model';
import { ENTIDAD_DEMANDANTE} from '../../models/entidadDemandante.model';
import { DemandaCrearGuard } from 'src/app/guards/demanda-crear.guard';
import { Router } from '@angular/router';

@Component({
    selector: 'app-demandas', // Selector para definir objetos de la clase
    templateUrl: './demandas.component.html',
    styleUrls: ['./demandas.component.scss']
})

export class DemandasComponent implements OnInit{

    public AREA_SERVICIO = AREA_SERVICIO;
    public NECESIDAD_SOCIAL = NECESIDAD_SOCIAL;
    public ENTIDAD_DEMANDANTE = ENTIDAD_DEMANDANTE;
    
    public limit = 5;
    public paginaActual = 1;
    public offset = 0;
    
    public totalDemandas = 0;
    public demandas: Demanda[];

    public terminoBusqueda = '';
    public totalDemandasBuscadas = 0;

    public cargando = false;
    public cargandoTimeOut;


    public filterNecesidadSocial = {};
    public filterAreaServicio = {};
    public filterEntidadDemandante = {};
    public filterCreador = '';

    constructor( 
        public demandaCrearGuard: DemandaCrearGuard,
        public demandaService: DemandaService,
        public usuarioService: UsuarioService,
        private router: Router ){
            //this.profesores.forEach(profesor => {this.filterProfesores[profesor] = false;})
            //NECESIDAD_SOCIAL.forEach(necesidadSocial => {this.filterNecesidadSocial[necesidadSocial] = false;});
            //ENTIDAD_DEMANDANTE.forEach(entidadDemandante => {this.filterEntidadDemandante[entidadDemandante] = false;});
            AREA_SERVICIO.forEach(areaServicio => {this.filterAreaServicio[areaServicio] = false;});
        if(this.router.url === '/mis-demandas'){
            this.filterCreador = this.usuarioService.usuario.uid;
        }
    }
    
    prevPage():void{
        const newOffset = this.offset - this.limit;
        this.offset = newOffset < 0 ? 0 : newOffset;
    }

    nextPage(): void {
        const newOffset = this.offset + this.limit;
        this.offset = newOffset >= this.totalDemandas ? this.offset : newOffset;
    }

    get firstPageRecord(): number {
        const minResults = Math.min(this.totalDemandas, this.totalDemandasBuscadas);
        return (minResults === 0) ? 0: this.offset + 1;
    }

    get lastPageRecord(): number {
        return this.totalDemandas;
    }

    ngOnInit(): void {
        this.cargarDemandas();
    }

    cambiarPagina(): void {
        this.cargarDemandas();
    }

    getFiltros() {
        return {
            terminoBusqueda: this.terminoBusqueda,
            entidadDemandante: this.filterEntidadDemandante,
            necesidadSocial: this.filterNecesidadSocial,
            areaServicio: this.filterAreaServicio,
            creador: this.filterCreador,
        };
    }

    cargarDemandas() {
        this.demandaService
        .cargarDemandas(this.offset, this.limit, this.getFiltros())
        .subscribe( ({total, filtradas, demandas}) => {
            this.totalDemandas = total.valueOf();
            this.totalDemandasBuscadas = filtradas.valueOf();
            this.demandas = demandas;
            this.cargando = false;
        });
    }
}