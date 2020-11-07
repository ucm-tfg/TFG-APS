import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ROL_ENTIDAD, ROL_PROFESOR, ROL_ESTUDIANTE } from './../../../../server/models/rol.model';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    rol: ['', Validators.required ],
    email: ['', [Validators.required, Validators.email] ],
    password: ['', Validators.required ],
    password_2: ['', Validators.required ],
    nombre: ['', Validators.required ],
    apellidos: ['', Validators.required ],
    universidad: ['' ],
    titulacion: ['' ],
    sector: ['' ],
    terminos_aceptados: [false, Validators.requiredTrue ],
  }, {
    validators: [
      this.validacionPasswordsVacias(),
      this.validarRobustezContrasenia(),
      this.validacionPasswordsNoCoinciden(),
      this.validarUniversidad(),
      this.validarTitulacion(),
      this.validarSector(),
      this.validarEmailCorrecto(),
    ]
  });

  public roles = this.getRoles();

  constructor( private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
  }


  register(): void {
    this.formSubmitted = true;

    if(this.registerForm.invalid) {
      return;
    }

    this.usuarioService
          .crearUsuario( this.registerForm.value )
          .subscribe( resp => {
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

  passwordsNoCoinciden(): Boolean {
    return this.formSubmitted && (this.registerForm.get('password').value !== this.registerForm.get('password_2').value);
  }

  validacionPasswordsNoCoinciden() {
    return ( formGroup: FormGroup ) => {
      if(this.passwordsNoCoinciden()) {
        formGroup.get('password').setErrors({ required: true});
      } else {
        formGroup.get('password').setErrors(null);
      }
    }
  }

  passwordsVacias(): Boolean {
    return this.formSubmitted && (this.registerForm.get('password').value === '');
  }

  validacionPasswordsVacias() {
    return ( formGroup: FormGroup ) => {
      if(this.passwordsVacias()) {
        formGroup.get('password_2').setErrors({ required: true});
      } else {
        formGroup.get('password_2').setErrors(null);
      }
    }
  }




  campoNoValido(campo): String {

    // para mostrar diferentes nombres en el mensaje de error
    let campo_real = campo === 'facultad' ? 'titulacion' : campo;

    let invalido = this.formSubmitted && this.registerForm.get(campo_real) && this.registerForm.get(campo_real).invalid;

    if(invalido) {
      switch (campo) {
        case 'rol':
          return 'Debe elegir un tipo de perfil con el que será registrado en la aplicación: Estudiante, Profesor o Entidad';
          break;

        case 'email':
          return 'El campo correo electrónico es obligatorio y debe ser un correo válido';
          break;

        case 'titulacion':
          return `El campo titulación es obligatorio`;
          break;

        case 'facultad':
          return `El campo facultad/escuela es obligatorio`;
          break;

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

  validarCampoSegunPerfil(campo, roles) {
    return ( formGroup: FormGroup ) => {
      const control_rol = formGroup.get('rol');
      const campo_bajo_validacion = formGroup.get(campo);

      if(campo_bajo_validacion.value === '' && roles.includes(control_rol.value)) {
        campo_bajo_validacion.setErrors({ required: true});
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

  contraseniaNoRobusta(): Boolean {
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/);
    return this.formSubmitted && !regex.test(this.registerForm.get('password').value);
    
  }

  validarRobustezContrasenia(){
    return ( formGroup: FormGroup ) => {
      if(this.contraseniaNoRobusta()) {
        formGroup.get('password').setErrors({ required: true});
      } 
      else {
        formGroup.get('password').setErrors(null);
      }
    }
  }

  emailNoValido(): Boolean {
    const regex = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    return this.formSubmitted && !regex.test(this.registerForm.get('email').value);
    
  }

  validarEmailCorrecto(){
    return ( formGroup: FormGroup ) => {
      if(this.emailNoValido()) {
        formGroup.get('email').setErrors({ required: true});
      } 
      else {
        formGroup.get('email').setErrors(null);
      }
    }
  }

}
