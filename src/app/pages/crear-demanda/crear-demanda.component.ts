import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ROL_ENTIDAD, ROL_PROFESOR, ROL_ESTUDIANTE } from './../../../../server/models/rol.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Iniciativa } from 'src/app/models/iniciativa.model';
import { HomeService } from "../../services/home.service";
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { SobreApsUnedContactaComponent } from 'src/app/pages/sobre-aps-uned-contacta/sobre-aps-uned-contacta.component';


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

  
  constructor(public fb: FormBuilder, public usuarioService: UsuarioService, public fileUploadService: FileUploadService, public router: Router, private registerService: HomeService) { 
    
  }

  public registerForm = this.fb.group({
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
      this.validarNecesidad(),
      this.validarTitulacion(),
      this.validarFechas(),
      this.validarAreas()
    ]
  });


  ngOnInit(): void {
    this.obtenerUniversidades();
  }


  async  obtenerUniversidades() {
     return this.registerService.obtenerUniversidades()
        .subscribe( (resp: any) => {
          console.log(resp)
          this.codeList =resp.codeList
          return this.codeList;
        });
  }

  get getTitulo() {
    return this.registerForm.get('titulo')
  }

  get GetDescripcion() {
    return this.registerForm.get('descripcion')
  }

  get GetAreaServicio() {
    return this.registerForm.get('areaServicio')
  }
  get getCiudad() {
    return this.registerForm.get('ciudad')
  }
  get getFinalidad() {
    return this.registerForm.get('finalidad')
  }
  get getFechaDefinicionIni() {
    return this.registerForm.get('nombreEntidad')
  }
  get getFechaDefinicionFin() {
    return this.registerForm.get('nombre')
  }
  get getFechaEjecucionIni() {
    return this.registerForm.get('nombre')
  }
  get getFechaEjecucionFin() {
    return this.registerForm.get('nombre')
  }
  get getTitulacion() {
    return this.registerForm.get('titulacion')
  }
  
  get getApellidos() {
    return this.registerForm.get('apellidos')
  }
  public roles = this.getRoles();
  

  register(): void {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.usuarioService
      .crearUsuario(this.registerForm.value)
      .subscribe(resp => {
        this.router.navigate(['/']);
      }, err => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }


  getRoles() {
    return [
      { id: ROL_ENTIDAD, name: 'Entidad' },
      { id: ROL_PROFESOR, name: 'Profesor' },
      { id: ROL_ESTUDIANTE, name: 'Estudiante' },
    ];
  }

  match(firstControlName: string | (string | number)[], secondControlName: string | (string | number)[], customError = 'mismatch') {
    return (fg: FormGroup) => {
      console.log(fg.get(firstControlName).value === fg.get(secondControlName).value ? null : { [customError]: true });
      
      return fg.get(firstControlName).value === fg.get(secondControlName).value ? null : { [customError]: true };
    };

  }

   noListMatch() {
    let accept=true;
          for (let v of this.codeList) {
            if (v.nombre === this.registerForm.get('universidad').value || this.registerForm.get('universidad').value === '')
              accept = false;
          }
          return accept;

  } 

  passwordsNoCoinciden(): Boolean {
    return this.formSubmitted && (this.registerForm.get('password').value !== this.registerForm.get('password_2').value);
  }

  validacionPasswordsNoCoinciden() {
    return (formGroup: FormGroup) => {
      if (this.passwordsNoCoinciden()) {
        formGroup.get('password').setErrors({ required: true });
      } else {
        formGroup.get('password').setErrors(null);
      }
    }
  }

  passwordsVacias(): Boolean {
    return this.formSubmitted && (this.registerForm.get('password').value === '');
  }

  validacionPasswordsVacias() {
    return (formGroup: FormGroup) => {
      if (this.passwordsVacias()) {
        formGroup.get('password_2').setErrors({ required: true });
      } else {
        formGroup.get('password_2').setErrors(null);
      }
    }
  }

  validarCampoSegunPerfil(campo: string | (string | number)[], roles: string | any[]) {
    return (formGroup: FormGroup) => {
      const control_rol = formGroup.get('rol');
      const campo_bajo_validacion = formGroup.get(campo);

      if (campo_bajo_validacion.value === '' && roles.includes(control_rol.value)) {
        campo_bajo_validacion.setErrors({ required: true });
      } else {
        campo_bajo_validacion.setErrors(null);
      }
    }
  }

  validarUniversidad() {
    return this.validarCampoSegunPerfil('universidad', [ROL_ESTUDIANTE, ROL_PROFESOR]);
  }

  validarTitulacion() {
    return this.validarCampoSegunPerfil('titulacion', [ROL_ESTUDIANTE, ROL_PROFESOR]);
  }

  validarSector() {
    return this.validarCampoSegunPerfil('sector', [ROL_ENTIDAD]);
  }

  validarNombreEntidad() {
    return this.validarCampoSegunPerfil('nombreEntidad', [ROL_ENTIDAD]);
  }
}
