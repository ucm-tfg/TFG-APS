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
    public skip: number = 0;
    public limit: number = 5;
    public pagina_actual: number = 1;

    public totalDemandas: number = 0;
    public demandas: Demanda[];

    public terminoBusqueda: string = '';
    public totalDemandasBuscadas: number = 0;
    public testString: string ='hola';

    public cargando: boolean = false;
    public cargandoTimeOut;


    public filterNecesidadSocial = {};
    public filterAreaServicio = {};
    public filterEntidadDemandante = {};
    public filterCreador = '';

    constructor( public demandaCrearGuard: DemandaCrearGuard, public demandaService: DemandaService, public usuarioService: UsuarioService, private router: Router ){
        
        //this.profesores.forEach(profesor => {this.filterProfesores[profesor] = false;})
        // NECESIDAD_SOCIAL.forEach(necesidadSocial => {this.filterNecesidadSocial[necesidadSocial] = false;});
        // ENTIDAD_DEMANDANTE.forEach(entidadDemandante => {this.filterEntidadDemandante[entidadDemandante] = false;});
        // AREA_SERVICIO.forEach(areaServicio => {this.filterAreaServicio[areaServicio] = false;});
        // if(this.router.url === '/mis-demandas'){
        //     this.filterCreador = this.usuarioService.usuario.uid;
        // }
        this.testString = 'hola';
    }
    
    get prevLimit() {
        return -1 * this.limit;
    }
    
    get nextLimit() {
        return this.limit;
    }

    get firstPageRecord() {
        const minResultados = Math.min(this.totalDemandas, this.totalDemandasBuscadas);
        
        if(minResultados === 0) {
            return 0;
        }
        return this.skip + 1;
    }

    ngOnInit(): void {
        this.cargarDemandas();
    }
    
    cambiarPagina( per_page: number ) {
        this.skip += per_page;
        
        if(this.skip < 0) { this.skip = 0; }
        if(this.skip >= Math.min(this.totalDemandas, this.totalDemandasBuscadas)) { this.skip -= per_page; }
    
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
        this.demandaService.cargarDemandas(this.skip, this.limit, this.getFiltros())
            .subscribe( ({total, filtradas, demandas}) => {
              this.totalDemandas = total.valueOf();
              this.totalDemandasBuscadas = filtradas.valueOf();
              this.demandas = demandas;
              this.cargando = false;
            });
      }
}