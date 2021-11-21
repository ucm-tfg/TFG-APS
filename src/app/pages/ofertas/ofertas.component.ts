import {Component, OnInit} from '@angular/core';
import {OfertaService} from 'src/app/services/oferta.service';
import {UsuarioService} from 'src/app/services/usuario.service';
import {Oferta} from '../../models/oferta.model';

import {Profesor} from '../../models/profesor.model';
import {OfertaCrearGuard} from 'src/app/guards/oferta-crear.guard';
import {Router} from '@angular/router';

@Component({
    selector: 'app-ofertas',
    templateUrl: './ofertas.component.html',
    styleUrls: ['./ofertas.component.scss']
})

export class OfertasComponent implements OnInit {

    public PROFESORES = Profesor;

    public skip = 0;
    public limit = 5;
    public paginaActual = 1;

    public totalOfertas = 0;
    public ofertas: Oferta[];

    public terminoBusqueda = '';
    public totalOfertasBuscadas = 0;


    public cargando = false;
    public cargandoTimeOut;


    public filterProfesores = {};
    public filterAreaServicio = {};
    public filterCuatrimestre = {};
    public filterCreador = '';

    constructor(
        public ofertaCrearGuard: OfertaCrearGuard,
        public ofertaService: OfertaService,
        public usuarioService: UsuarioService,
        private router: Router) {
        if (this.router.url === '/mis-ofertas') {
            this.filterCreador = this.usuarioService.usuario.uid;
        }
    }

    get prevLimit(): number {
        return -1 * this.limit;
    }

    get nextLimit(): number {
        return this.limit;
    }

    get firstPageRecord(): number {
        const minResults = Math.min(this.totalOfertas, this.totalOfertasBuscadas);
        return (minResults === 0) ? 0 : this.skip + 1;
    }

    get lastPageRecord(): number {
        return this.totalOfertas;
    }

    ngOnInit(): void {
        this.cargarOfertas();
    }

    cambiarPagina(perPage: number): void {
        this.skip += perPage;

        if (this.skip < 0) {
            this.skip = 0;
        }
        if (this.skip >= Math.min(this.totalOfertas, this.totalOfertasBuscadas)) {
            this.skip -= perPage;
        }

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

    cargarOfertas(): void {
        this.ofertaService.cargarOfertas(this.skip, this.limit, this.getFiltros())
            .subscribe(({total, filtradas, ofertas}) => {
                this.totalOfertas = total.valueOf();
                this.totalOfertasBuscadas = filtradas.valueOf();
                this.ofertas = ofertas;
                this.cargando = false;
            });
    }
}
