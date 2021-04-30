import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { FileUploadService } from '../../../services/file-upload.service';
import { Partenariado } from '../../../models/partenariado.model';

import { RAMAS } from '../../../models/rama.model';
import { CIUDADES } from '../../../models/ciudad.model';
import { PartenariadoService } from '../../../services/partenariado.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-partenariado-crear-profesor',
  templateUrl: './partenariado-profesor-crear.component.html',
  styleUrls: ['./partenariado-profesor-crear.component.scss']
})
export class PartenariadoCrearProfesorComponent implements OnInit {

  public formSubmitted = false;
  public formSending = false;
  

  public parteneriado_id: string = null;
  public partenariado : Partenariado;
  public imagenSubir: File;
  public imagenPreview: any = null;

  public crearPartenariadoProfesorForm: FormGroup;

  public RAMAS = RAMAS;
  public CIUDADES = CIUDADES;
  public USUARIOS;

  constructor( public fb: FormBuilder, public partenariadoService: PartenariadoService, public usuarioService: UsuarioService, public fileUploadService: FileUploadService, public router: Router, public activatedRoute: ActivatedRoute) {
  }

  async ngOnInit() {
    await this.cargarPartenariado();

    this.crearPartenariadoProfesorForm = this.fb.group({
      estado: [this.partenariado.estado || 'Abierta', Validators.required],
      titulo: [this.partenariado.titulo || '', Validators.required],
      descripcion: [this.partenariado.descripcion || '', Validators.required],
      rama: [this.partenariado.rama || '', Validators.required],
      ciudad: [this.partenariado.ciudad || '', Validators.required],
      proponedor: [this.partenariado.proponedor?.uid || this.usuarioService.usuario.uid, Validators.required],
      terminos_aceptados: [false, Validators.requiredTrue],
    });
  }

  async cargarPartenariado() {
    this.partenariado = new Partenariado('','', '','','','',null,null,null,null,'', null,'',null,'',false, '', '','','',null, [], [], null, null,null,null, '');
  }

  observableEnviarPartenariado() {
    return this.partenariadoService.crearPartenariadoProfesor(this.crearPartenariadoProfesorForm.value);
  }

  enviarIni() {

    this.formSubmitted = true;

    if(this.crearPartenariadoProfesorForm.invalid) {
      return;
    }

    this.formSending = true;
    this.observableEnviarPartenariado()
          .subscribe( resp => {
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
            if(err.error.errors) {
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

    if(invalido) {
      switch (campo) {
        case 'terminos_aceptados':
          return 'Es obligatorio aceptar las condiciones de uso';
          break;

        default:
          return `El campo ${ campo } es obligatorio`;
          break;
      }
    }

    return '';
  }

  subirFichero( file: File ) {
    if( !file ) { return; }

    this.fileUploadService
        .subirFichero(file, 'archivos', 'partenariados', this.partenariado._id)
        .then( resp => {
          const {ok, msg, upload_id} = resp;
          if(ok) {
            this.cargarPartenariado();
            Swal.fire('Ok', 'Fichero subido correctamente', 'success');
          } else {
            Swal.fire('Error', msg, 'error');
          }
        });
  }

  borrarFichero( id: string ) {

    if(id == '') {
        Swal.fire('Error', 'No hay ninguna imagen definida para la iniciativa.', 'error');
        return;
    }

    this.fileUploadService
        .borrarFichero(id)
        .then( resp => {
          const {ok, msg } = resp;
          if(ok) {
            this.cargarPartenariado();
            Swal.fire('Ok', 'Fichero borrado correctamente', 'success');
          } else {
            Swal.fire('Error', msg, 'error');
          }
        });
        (<HTMLInputElement>document.getElementById("file-upload-2")).value="";
  }

  cambiarImagen( file: File ) {

    if( !file ) { return; }

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
        .then( resp => {
          const {ok, msg, upload_id} = resp;
          if(ok) {
            this.cargarPartenariado();
            Swal.fire('Ok', 'Imagen de partenariado actualizada correctamente', 'success');
          } else {
            Swal.fire('Error', msg, 'error');
          }

          this.imagenSubir = null;
          this.imagenPreview = null;
        });
  }

  borrarImagen() {

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
  }


}
