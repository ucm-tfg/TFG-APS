import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Oferta } from 'src/app/models/oferta.model';
import { OfertaService } from 'src/app/services/oferta.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ofertas-crear',
  templateUrl: './ofertas-crear.component.html',
  styleUrls: ['./ofertas-crear.component.scss']
})
export class OfertasCrearComponent implements OnInit {

  public formSubmitted = false;
  public formSending = false;

  public oferta_id: string = null;
  public oferta: Oferta;
  public imagenSubir: File;
  public imagenPreview: any = null;
  public areasServicio: any ;
  public crearOfertaForm: FormGroup;
  public aux_area: string;
  public htmlStr: string;
  public USUARIOS;

  constructor( public fb: FormBuilder, public ofertaService: OfertaService, public usuarioService: UsuarioService, public fileUploadService: FileUploadService, public router: Router, public activatedRoute: ActivatedRoute) {
    if(this.usuarioService.usuario.esGestor) {
      this.usuarioService.cargarUsuarios(0, 99999999, {terminoBusqueda: ''}).subscribe( ({total, filtradas, usuarios}) => {
        this.USUARIOS = usuarios.filter( usuario => ['ROL_ENTIDAD', 'ROL_PROFESOR', 'ROL_GESTOR'].includes(usuario.rol));
      });
    }
  }

  async ngOnInit() {
    this.obtenerAreasServicio();
    await this.cargarOferta();
    this.crearOfertaForm = this.fb.group({
      titulo: [this.oferta.titulo || '', Validators.required],
      descripcion: [this.oferta.descripcion || '', Validators.required],
      creador: [this.oferta.creador?.uid || this.usuarioService.usuario.uid, Validators.required],
      // terminos_aceptados: [false, Validators.requiredTrue],
      area_servicio: [this.oferta.area_servicio || '', Validators.required],
      asignatura: [this.oferta.asignatura_objetivo || '', Validators.required],
      fecha_limite: [this.oferta.fecha_limite || '', Validators.required],
      cuatrimestre: [this.oferta.cuatrimestre || '', Validators.required],
      anio_academico: [this.oferta.anio_academico || '', Validators.required],
      observaciones: this.oferta.observaciones ,

    });
    
  }

  async cargarOferta() {
    this.oferta = new Oferta('', '', '', '', '', '', '',  '',  '', null, null,[], [], []);
  }

  async  obtenerAreasServicio() {
    return this.ofertaService.obtenerAreasServicio()
       .subscribe( (resp: any) => {
        //  console.log(resp)
         this.areasServicio =resp.areasServicio
         return this.areasServicio;
       });
 }

  observableEnviarOferta() {
    return this.ofertaService.crearOferta(this.crearOfertaForm.value);
  }

  obtenerIdAreaServicio(){
    var area_seleccionada = this.crearOfertaForm.get('area_servicio').value;
    let pos_area = 0;
    while(pos_area < this.areasServicio.length && this.areasServicio[pos_area].nombre != area_seleccionada){
      pos_area++;
    }
    return pos_area;
  }

  enviarOferta() {
    this.formSubmitted = true;


    if(this.crearOfertaForm.invalid) {
      return;
    }

    this.formSending = true;
    let encontrado= this.obtenerIdAreaServicio();
    if(encontrado >= this.areasServicio.length){
      let msg = [];
      msg.push('El area de servicio seleccionado no es correcto');
      Swal.fire('Error', msg.join('<br>'), 'error');
      this.formSubmitted = false;
      this.formSending = false;
    }
    this.aux_area = this.crearOfertaForm.get('area_servicio').value;
    let cuatrimestre = this.crearOfertaForm.get('cuatrimestre').value;
    if(cuatrimestre == 'primero'){
      this.crearOfertaForm.get('cuatrimestre').setValue(1);
    }else if(cuatrimestre == 'segundo'){
      this.crearOfertaForm.get('cuatrimestre').setValue(2);
    }else {
      this.crearOfertaForm.get('cuatrimestre').setValue(0);
    }
    this.crearOfertaForm.get('area_servicio').setValue(this.areasServicio[encontrado].id);
    this.observableEnviarOferta()
          .subscribe( resp => {
            this. oferta_id
              ? Swal.fire('Ok', 'Oferta actualizada correctamente', 'success')
              : Swal.fire('Ok', 'Oferta creada correctamente', 'success');

            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate(['/ofertas']);
            // this.crearOfertaForm.get('area_servicio').setValue(this.aux_area);
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

  noListMatch() {
    let accept=true;
    // console.log(this.areasServicio);
          for (let v of this.areasServicio) {
            if (v.nombre === this.crearOfertaForm.get('area_servicio').value || this.crearOfertaForm.get('area_servicio').value === '')
              accept = false;
          }
          return accept;

  }

  campoNoValido(campo): String {

    let invalido = this.crearOfertaForm.get(campo) && this.crearOfertaForm.get(campo).invalid;

    if(invalido) {
      // switch (campo) {
      //   case 'terminos_aceptados':
      //     return 'Es obligatorio aceptar las condiciones de uso';
      //     break;

      //   default:
          return `El campo ${ campo } es obligatorio`;
      //     break;
      // }
    }
    
    return '';
  }

  subirFichero( file: File ) {
    // if( !file ) { return; }


    // this.fileUploadService
    //     .subirFichero(file, 'archivos', 'iniciativas', this.iniciativa._id)
    //     .then( resp => {
    //       const {ok, msg, upload_id} = resp;
    //       if(ok) {
    //         this.cargarIniciativa();
    //         Swal.fire('Ok', 'Fichero subido correctamente', 'success');
    //       } else {
    //         Swal.fire('Error', msg, 'error');
    //       }
    //     });
  }

  borrarFichero( id: string ) {

    // if(id == '') {
    //     Swal.fire('Error', 'No hay ninguna imagen definida para la iniciativa.', 'error');
    //     return;
    // }

    // this.fileUploadService
    //     .borrarFichero(id)
    //     .then( resp => {
    //       const {ok, msg } = resp;
    //       if(ok) {
    //         this.cargarIniciativa();
    //         Swal.fire('Ok', 'Fichero borrado correctamente', 'success');
    //       } else {
    //         Swal.fire('Error', msg, 'error');
    //       }
    //     });
    //     (<HTMLInputElement>document.getElementById("file-upload-2")).value="";
  }

  cambiarImagen( file: File ) {

    // if( !file ) { return; }

    // this.imagenSubir = file;

    // const reader = new FileReader();
    // reader.readAsDataURL(file);

    // reader.onloadend = () => {
    //   this.imagenPreview = reader.result;
    // }
  }

  actualizarImagen() {
    // this.fileUploadService
    //     .subirFichero(this.imagenSubir, 'default', 'iniciativas', this.iniciativa._id)
    //     .then( resp => {
    //       const {ok, msg, upload_id} = resp;
    //       if(ok) {
    //         this.cargarIniciativa();
    //         Swal.fire('Ok', 'Imagen de iniciativa actualizada correctamente', 'success');
    //       } else {
    //         Swal.fire('Error', msg, 'error');
    //       }

    //       this.imagenSubir = null;
    //       this.imagenPreview = null;
    //     });
  }

  borrarImagen() {

  //   if(this.iniciativa.imagen == '') {
  //       Swal.fire('Error', 'No hay ninguna imagen definida para la iniciativa.', 'error');
  //       return;
  //   }

  //   this.fileUploadService
  //       .borrarFichero(this.iniciativa.imagen)
  //       .then( resp => {
  //         const {ok, msg } = resp;
  //         if(ok) {
  //           this.cargarIniciativa();
  //           Swal.fire('Ok', 'Imagen de iniciativa borrada correctamente', 'success');
  //         } else {
  //           Swal.fire('Error', msg, 'error');
  //         }
  //       });
  //       (<HTMLInputElement>document.getElementById("file-upload")).value="";
  }


}
