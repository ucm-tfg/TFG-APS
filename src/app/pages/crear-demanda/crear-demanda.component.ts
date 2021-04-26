import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ROL_ENTIDAD, ROL_PROFESOR, ROL_ESTUDIANTE } from './../../../../server/models/rol.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { DemandaService } from 'src/app/services/demanda.service';
import { Demanda } from 'src/app/models/demanda.model';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { SobreApsUnedContactaComponent } from 'src/app/pages/sobre-aps-uned-contacta/sobre-aps-uned-contacta.component';

//HACER EN EL HTML UNA FUNCION FECHAS NO VALIDAS COMO LA DEL PERFIL,
@Component({
  selector: 'app-crear-demanda',
  templateUrl: './crear-demanda.component.html',
  styleUrls: ['./crear-demanda.component.scss']
})
export class crearDemandaComponent implements OnInit {


  public formSubmitted = false;
  public areaList: any ;
  public necesidadList: any;
  public titulacionList: any;

  
  constructor(public fb: FormBuilder, public usuarioService: UsuarioService, public fileUploadService: FileUploadService, public router: Router, private DemandaService: DemandaService, public Demanda: Demanda) { 
    
  }

  public createDemandForm = this.fb.group({
    titulo: new FormControl('', 
      Validators.required),
    descripcion: new FormControl('', Validators.required),
    areaServicio: new FormControl('',
      Validators.required),
    ciudad: new FormControl('',
      Validators.required
    ),
    finalidad: new FormControl('', Validators.required),
    fechaDefinicionIni: new FormControl('', Validators.required),
    fechaDefinicionFin: new FormControl('', Validators.required),
    fechaEjecucionIni: new FormControl('', Validators.required),
    fechaEjecucionFin: new FormControl('', Validators.required),
    fechaFin: new FormControl('', Validators.required),
    necesidadSocial: new FormControl(''),
    comunidadBeneficiaria: new FormControl(''),
    titulacionLocal: new FormControl('')
  }, {
    validators: [
    ]
  });


  ngOnInit(): void {
    this.obtenerAreasServicio();
    this.obtenerNecesidades();
    this.obtenerTitulaciones();
  }


  async  obtenerAreasServicio() {
     return this.DemandaService.obtenerAreasServicio()
        .subscribe( (resp: any) => {
          console.log(resp)
          this.areaList =resp.areaList
          return this.areaList;
        });
  }

  async  obtenerNecesidades() {
    return this.DemandaService.obtenerNecesidades()
       .subscribe( (resp: any) => {
         console.log(resp)
         this.necesidadList =resp.necesidadList
         return this.necesidadList;
       });
 }

 async  obtenerTitulaciones() {
  return this.DemandaService.obtenerTitulaciones()
     .subscribe( (resp: any) => {
       console.log(resp)
       this.titulacionList =resp.titulacionList
       return this.titulacionList;
     });
}

  get getTitulo() {
    return this.createDemandForm.get('titulo')
  }

  get getDescripcion() {
    return this.createDemandForm.get('descripcion')
  }
  get getPortada() {
    return this.createDemandForm.get('portada')
  }
  get getAreaServicio() {
    return this.createDemandForm.get('areaServicio')
  }
  get getCiudad() {
    return this.createDemandForm.get('ciudad')
  }
  get getFinalidad() {
    return this.createDemandForm.get('finalidad')
  }
  get getFechaDefinicionIni() {
    return this.createDemandForm.get('fechaDefinicionIni')
  }
  get getFechaDefinicionFin() {
    return this.createDemandForm.get('fechaDefinicionFin')
  }
  get getFechaEjecucionIni() {
    return this.createDemandForm.get('fechaEjecucionIni')
  }
  get getFechaEjecucionFin() {
    return this.createDemandForm.get('fechaEjecucionFin')
  }
  get getFechaFin() {
    return this.createDemandForm.get('fechaFin')
  }
  get getObservacionTemporal() {
    return this.createDemandForm.get('observacionTemporal')
  }
  
  get getNecesidadSocial() {
    return this.createDemandForm.get('necesidadSocial')
  }
  get getComunidadBeneficiaria(){
    return this.createDemandForm.get('comunidadBeneficiaria')
  }
  get getTitulacionLocal(){
    return this.createDemandForm.get('titulacionLocal')
  }
  

  create(): void {
    this.formSubmitted = true;

    if (this.createDemandForm.invalid) {
      return;
    }
  }

   noAreaMatch() {
    let accept=true;
          for (let a of this.areaList) {
            if (a.nombre === this.createDemandForm.get('areaServicio').value || this.createDemandForm.get('areaServicio').value === '')
              accept = false;
          }
          return accept;

  } 
  noNecesidadMatch() {
    let accept=true;
          for (let n of this.necesidadList) {
            if (n.nombre === this.createDemandForm.get('necesidadSocial').value || this.createDemandForm.get('necesidadSocial').value === '')
              accept = false;
          }
          return accept;

  } 
  noTitulacionMatch() {
    let accept=true;
          for (let t of this.titulacionList) {
            if (t.nombre === this.createDemandForm.get('titulacionLocal').value || this.createDemandForm.get('titulacionLocal').value === '')
              accept = false;
          }
          return accept;

  } 
  validarFechas(fechaDefinicionIni: Date, fechaDefinicionFin: Date, fechaEjecucionIni: Date, fechaEjecucionFin: Date, fechaFin: Date, customError = 'mismatch'){
    return (FormGroup: FormGroup) =>{
      if(fechaDefinicionIni >= fechaDefinicionFin){
        return { [customError]: true };
      }
      else if(fechaEjecucionIni >= fechaEjecucionFin){
        return { [customError]: true };
      }
      else if(fechaDefinicionIni >= fechaEjecucionIni){
        return { [customError]: true };
      }
    }
  }


  async cargarDemanda() {
    this.Demanda = new Demanda('', '', '', '', '', '', [],'','','','','','',[],[],null, '','','');
  }
   subirFichero( file: File ) {
    if( !file ) { return; }

    this.fileUploadService
        .subirFichero(file, 'archivos', 'demanda', this.Demanda.id)
        .then( resp => {
          const {ok, msg, upload_id} = resp;
          if(ok) {
            this.cargarDemanda();
            Swal.fire('Ok', 'Fichero subido correctamente', 'success');
          } else {
            Swal.fire('Error', msg, 'error');
          }
        });
  }
}
