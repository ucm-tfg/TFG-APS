import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { FileUploadService } from '../../../services/file-upload.service';
import { Partenariado } from '../../../models/partenariado.model';

import { RAMAS } from '../../../models/rama.model';
import { CIUDADES } from '../../../models/ciudad.model';
import { PartenariadoService } from '../../../services/partenariado.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Oferta } from 'src/app/models/oferta.model';
import { OfertaService } from 'src/app/services/oferta.service';
import { DemandaService } from 'src/app/services/demanda.service';
import { first } from 'rxjs/operators';
import { Demanda } from 'src/app/models/demanda.model';

@Component({
  selector: 'app-partenariado-crear-profesor',
  templateUrl: './partenariado-profesor-crear.component.html',
  styleUrls: ['./partenariado-profesor-crear.component.scss']
})
export class PartenariadoCrearProfesorComponent implements OnInit {

  public formSubmitted = false;
  public formSending = false;


  public parteneriado_id: string = null;
  public partenariado: Partenariado;
  public oferta: Oferta;
  public demanda: Demanda;
  public imagenSubir: File;
  public imagenPreview: any = null;

  public crearPartenariadoProfesorForm: FormGroup;

  public RAMAS = RAMAS;
  public CIUDADES = CIUDADES;
  public USUARIOS;

  constructor(public fb: FormBuilder, public demandaService: DemandaService, public ofertaService: OfertaService, public partenariadoService: PartenariadoService, public usuarioService: UsuarioService, public fileUploadService: FileUploadService, public router: Router, public activatedRoute: ActivatedRoute) {
  }

  async ngOnInit() {
    await this.cargarPartenariado();
    await this.obtenerOferta();
    await this.obtenerDemanda();

    this.crearPartenariadoProfesorForm = this.fb.group({
      anioAcademico :[ this.oferta.anio_academico],
      titulo: [this.demanda.titulo + " | " + this.oferta.titulo || '', Validators.required],
      descripcion: [this.demanda.descripcion + " | " + this.oferta.descripcion || '', Validators.required],
      proponedor: [this.partenariado.proponedor?.uid || this.usuarioService.usuario.uid, Validators.required],
      terminos_aceptados: [false, Validators.requiredTrue],
      entidad: [this.demanda.creador || '', Validators.required],
      necesidadSocial : [this.demanda.necesidad_social],
      finalidad : [this.demanda.objetivo, Validators.required],
      comunidadBeneficiaria : [this.demanda.comunidadBeneficiaria],
      cuatrimestre: [this.oferta.cuatrimestre, Validators.required],
      responsable : [this.oferta.creador],
      ciudad : [this.demanda.ciudad],
      externo : new FormControl(''),
      asignaturaObjetivo : [this.oferta.asignatura_objetivo],
      titulacionesLocales: [this.demanda.titulacion_local],
      ofertaAreaServicio :[this.oferta.area_servicio],
      demandaAreaServicio:[this.demanda.area_servicio],
      fechaInicio :new FormControl(''),
      fechaFin:new FormControl(''),
      profesores: new FormControl(''),

    });
  }



  async cargarPartenariado() {
    this.partenariado = new Partenariado('', '', '', '', '', '', '', '', null, null, null, null, null, null);
    //,null,null,null,'', null,'',null,'',false, '', '','','',null, [], [], null, null,null,null, '');
  }

  async obtenerOferta() {

    await this.ofertaService.obtenerOferta().pipe(first()).toPromise().then((resp: any) => {
      let value = resp.oferta;
      console.log(value)
      this.oferta = new Oferta(value.id, value.titulo, value.descripcion, value.imagen, value.created_at, value.upload_at, value.cuatrimestre,
         value.anio_academico, value.fecha_limite, value.observaciones_temporales, value.creador, value.area_servicio, value.asignatura_objetivo, null)
        ;
    });
  }

  async obtenerDemanda() {
    await this.demandaService.obtenerDemanda().pipe(first()).toPromise().then((resp: any) => {
      let value = resp.demanda;
      console.log(value)
      this.demanda = new Demanda(value.id, value.titulo, value.descripcion, value.imagen, value.ciudad, value.finalidad, value.area_servicio,
        value.periodoDefinicionIni, value.periodoDefinicionFin, value.periodoEjecucionIni, value.periodoEjecucionFin,
        value.fechaFin, value.observacionesTemporales, value.necesidad_social, value.titulacionlocal,
        value.creador, value.comunidadBeneficiaria, value.created_at, value.upload_at);
    });

  }

  observableEnviarPartenariado() {
    return this.partenariadoService.crearPartenariadoProfesor(this.crearPartenariadoProfesorForm.value);
  }

  enviarIni() {

    this.formSubmitted = true;

    if (this.crearPartenariadoProfesorForm.invalid) {
      return;
    }

    this.formSending = true;
    this.observableEnviarPartenariado()
      .subscribe(resp => {
        this.parteneriado_id
          ? Swal.fire('Ok', 'Partenariado actualizado correctamente', 'success')
          : Swal.fire('Ok', 'Partenariado actualizado correctamente', 'success');

        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/partenariadoCrear']);

        this.formSubmitted = false;
        this.formSending = false;
      }, err => {
        console.log(err);

        let msg = [];
        if (err.error.errors) {
          Object.values(err.error.errors).forEach(error_entry => {
            msg.push(error_entry['msg']);
          });
        } else {
          msg.push(err.error.msg);
        }

        Swal.fire('Error', msg.join('<br>'), 'error');
        this.formSubmitted = false;
        this.formSending = false;
      });


  }


  campoNoValido(campo): String {

    let invalido = this.crearPartenariadoProfesorForm.get(campo) && this.crearPartenariadoProfesorForm.get(campo).invalid;

    if (invalido) {
      switch (campo) {
        case 'terminos_aceptados':
          return 'Es obligatorio aceptar las condiciones de uso';
          break;

        default:
          return `El campo ${campo} es obligatorio`;
          break;
      }
    }

    return '';
  }

  subirFichero(file: File) {
    if (!file) { return; }

    this.fileUploadService
      .subirFichero(file, 'archivos', 'partenariados', this.partenariado._id)
      .then(resp => {
        const { ok, msg, upload_id } = resp;
        if (ok) {
          this.cargarPartenariado();
          Swal.fire('Ok', 'Fichero subido correctamente', 'success');
        } else {
          Swal.fire('Error', msg, 'error');
        }
      });
  }

  borrarFichero(id: string) {

    if (id == '') {
      Swal.fire('Error', 'No hay ninguna imagen definida para la iniciativa.', 'error');
      return;
    }

    this.fileUploadService
      .borrarFichero(id)
      .then(resp => {
        const { ok, msg } = resp;
        if (ok) {
          this.cargarPartenariado();
          Swal.fire('Ok', 'Fichero borrado correctamente', 'success');
        } else {
          Swal.fire('Error', msg, 'error');
        }
      });
    (<HTMLInputElement>document.getElementById("file-upload-2")).value = "";
  }

  cambiarImagen(file: File) {

    if (!file) { return; }

    this.imagenSubir = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imagenPreview = reader.result;
    }
  }

  actualizarImagen() {
    this.fileUploadService
      .subirFichero(this.imagenSubir, 'default', 'iniciativas', this.partenariado._id)
      .then(resp => {
        const { ok, msg, upload_id } = resp;
        if (ok) {
          this.cargarPartenariado();
          Swal.fire('Ok', 'Imagen de partenariado actualizada correctamente', 'success');
        } else {
          Swal.fire('Error', msg, 'error');
        }

        this.imagenSubir = null;
        this.imagenPreview = null;
      });
  }

  /* borrarImagen() {

    if(this.partenariado.imagen == '') {
        Swal.fire('Error', 'No hay ninguna imagen definida para la iniciativa.', 'error');
        return;
    }

    this.fileUploadService
        .borrarFichero(this.partenariado.imagen)
        .then( resp => {
          const {ok, msg } = resp;
          if(ok) {
            this.cargarPartenariado();
            Swal.fire('Ok', 'Imagen de partenariado borrada correctamente', 'success');
          } else {
            Swal.fire('Error', msg, 'error');
          }
        });
        (<HTMLInputElement>document.getElementById("file-upload")).value="";
  } */


}
