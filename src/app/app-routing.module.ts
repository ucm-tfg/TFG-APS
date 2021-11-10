import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// guards
import { GuestGuard } from './guards/guest.guard';
import { AuthGuard } from './guards/auth.guard';
import { ProtectedGuard } from './guards/protected.guard';
import { GestorGuard } from './guards/gestor.guard';
import { IniciativaCrearGuard } from './guards/iniciativa-crear.guard';
import { OfertaCrearGuard } from './guards/oferta-crear.guard';
import { IniciativaEditarGuard } from './guards/iniciativa-editar.guard';
import { PartenariadoVerGuard } from './guards/partenariado-ver.guard';
import { PartenariadoCrearProfesorGuard} from './guards/partenariado-crear-profesor.guard'
import {DemandaCrearGuard} from './guards/demanda-crear.guard';

// auth routes
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './auth/profile/profile.component';

// gestor routes

import { OfertasComponent } from './pages/ofertas/ofertas.component';
import { DemandasComponent } from './pages/demandas/demandas.component';
import { GestionUsuariosComponent } from './pages/gestor/gestion-usuarios/gestion-usuarios.component';
import { GestionUsuariosEditarComponent } from './pages/gestor/gestion-usuarios-editar/gestion-usuarios-editar.component';
import { GestorEmailsComponent } from './pages/gestor/gestor-emails/gestor-emails.component';
import { GestorNewsletterComponent } from './pages/gestor/gestor-newsletter/gestor-newsletter.component';

// pages routes
import { HomeComponent } from './pages/home/home.component';
import { QueEsApsComponent } from './pages/que-es-aps/que-es-aps.component';

import { ComoParticiparEstudiantesComponent } from './pages/como-participar-estudiantes/como-participar-estudiantes.component';
import { ComoParticiparProfesoresComponent } from './pages/como-participar-profesores/como-participar-profesores.component';
import { ComoParticiparSociosComunitariosComponent } from './pages/como-participar-socioscomunitarios/como-participar-socioscomunitarios.component';

import { SobreApsUnedQuienesSomosComponent } from './pages/sobre-aps-uned-quienes-somos/sobre-aps-uned-quienes-somos.component';
import { SobreApsUnedHistoriaComponent } from './pages/sobre-aps-uned-historia/sobre-aps-uned-historia.component';
import { SobreApsUnedContactaComponent } from './pages/sobre-aps-uned-contacta/sobre-aps-uned-contacta.component';

// iniciativas
import { IniciativasComponent } from './pages/iniciativas/iniciativas.component';
import { IniciativasVerComponent } from './pages/iniciativas-ver/iniciativas-ver.component';
import { IniciativasCrearComponent } from './pages/iniciativas-crear/iniciativas-crear.component';
import { IniciativasEditarComponent } from './pages/iniciativas-editar/iniciativas-editar.component';

// ofertas

// import { OfertasComponent } from './pages/ofertas/ofertas.component';
// import { OfertasVerComponent } from './pages/ofertas-ver/ofertas-ver.component';
import { OfertasCrearComponent } from './pages/ofertas-crear/ofertas-crear.component';
// import { OfertasEditarComponent } from './pages/ofertas-editar/ofertas-editar.component';

//demanda

import {crearDemandaComponent} from './pages/crear-demanda/crear-demanda.component'
//import {verDemandaComponent} from './pages/ver-demanda/ver-demanda.component'
//import {editarDemandaComponent} from './pages/editar-demanda/editar-demanda.component'

// partenariados
import { PartenariadosComponent } from './pages/partenariados/partenariados.component';
import { PartenariadosVerComponent } from './pages/partenariados-ver/partenariados-ver.component';
import { PartenariadoCrearProfesorComponent } from './pages/partenariados-crear/partenariado-profesor-crear/partenariado-profesor-crear.component';

// proyectos
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { ProyectosVerComponent } from './pages/proyectos-ver/proyectos-ver.component';

// varios y error pages routes
import { CondicionesComponent } from './pages/condiciones/condiciones.component';
import { Code404Component } from './errors/code404/code404.component';



const routes: Routes = [

  // aplico authguard a todos los paths para intentar obtener el token siempre
  {path: '', canActivate:[AuthGuard], children: [

    // login routes
    { path: 'login', canActivate:[GuestGuard], component: LoginComponent, data: { titulo: 'Login' }  },
    { path: 'registro', canActivate:[GuestGuard], component: RegisterComponent, data: { titulo: 'Registro' }  },
    { path: 'perfil', canActivate:[ProtectedGuard], component: ProfileComponent, data: { titulo: 'Perfil' }  },

    // gestor routes
    {path: 'gestor', canActivate:[GestorGuard], children: [
      { path: 'gestion-usuarios', component: GestionUsuariosComponent, data: { titulo: 'Zona admin - Gestión de Usuarios' }  },
      { path: 'gestion-usuarios/editar/:uid', component: GestionUsuariosEditarComponent, data: { titulo: 'Zona admin - Editar Usuario' }  },
      { path: 'gestion-emails', component: GestorEmailsComponent, data: { titulo: 'Zona admin - Gestión de Emails' }  },
      { path: 'gestion-suscripciones', component: GestorNewsletterComponent, data: { titulo: 'Zona admin - Gestión de Suscripciones a newsletter' }  },
    ]},

    // pages routes
    { path: '', component: HomeComponent, data: { titulo: 'Portal ApS' } },
    { path: 'que-es-ApS', component: QueEsApsComponent, data: { titulo: '¿Qué es ApS?' } },

    { path: 'como-participar/estudiantes', component: ComoParticiparEstudiantesComponent, data: { titulo: 'Cómo participar - Estudiantes' } },
    { path: 'como-participar/profesores', component: ComoParticiparProfesoresComponent, data: { titulo: 'Cómo participar - Profesores' } },
    { path: 'como-participar/socioscomunitarios', component: ComoParticiparSociosComunitariosComponent, data: { titulo: 'Cómo participar - Socios comunitarios' } },

    { path: 'sobre-ApS-UNED/quienes-somos', component: SobreApsUnedQuienesSomosComponent, data: { titulo: 'Sobre ApS UNED - Quiénes Somos' } },
    { path: 'sobre-ApS-UNED/historia', component: SobreApsUnedHistoriaComponent, data: { titulo: 'Sobre ApS UNED - Historia' } },
    { path: 'sobre-ApS-UNED/contacta', component: SobreApsUnedContactaComponent, data: { titulo: 'Sobre ApS UNED - Contacta' } },

    // Iniciativas
    { path: 'iniciativas', component: IniciativasComponent, data: { titulo: 'Iniciativas' } },
    { path: 'mis-iniciativas', component: IniciativasComponent, data: { titulo: 'Mis Iniciativas' } },
    { path: 'iniciativas/ver/:id', component: IniciativasVerComponent, data: { titulo: 'Ver Iniciativa' } },
    { path: 'iniciativas/editar/:id', canActivate:[IniciativaEditarGuard], component: IniciativasEditarComponent, data: { titulo: 'Editar Iniciativa' } },
    { path: 'iniciativas/crear', canActivate:[IniciativaCrearGuard], component: IniciativasCrearComponent, data: { titulo: 'Crear Iniciativa' } },

    // Ofertas
    // { path: 'mis-ofertas', component: OfertasComponent, data: { titulo: 'Mis Ofertas' } },
    // { path: 'ofertas/ver/:id', component: OfertasVerComponent, data: { titulo: 'Ver Oferta' } },
    // { path: 'ofertas/editar/:id', canActivate:[OfertaEditarGuard], component: OfertasEditarComponent, data: { titulo: 'Editar Oferta' } },
    { path: 'ofertas/crear', canActivate:[OfertaCrearGuard], component: OfertasCrearComponent, data: { titulo: 'Crear Oferta' } },
    { path: 'ofertas', component: OfertasComponent, data: { titulo: 'Ofertas' } },

    //demandas
    { path: 'demandas', component: DemandasComponent, data: { titulo: 'Demandas' } },
    { path: 'testdem', component: DemandasComponent, data: { titulo: 'Demandas' } },
    // { path: 'mis-demandas', component: demandasComponent, data: { titulo: 'Mis Demandas' } },
    // { path: 'demandas/ver/:id', component: DemandasVerComponent, data: { titulo: 'Ver Demandas' } },
    // { path: 'demandas/editar/:id', canActivate:[DemandaEditarGuard], component: DemandaEditarComponent, data: { titulo: 'Editar Demanda' } },
    { path: 'demandas/crear', canActivate:[DemandaCrearGuard], component: crearDemandaComponent, data: { titulo: 'Crear Demanda' } },

    // Partenariados
    { path: 'partenariados', component: PartenariadosComponent, data: { titulo: 'Partenariados' } },
    { path: 'mis-partenariados', component: PartenariadosComponent, data: { titulo: 'Mis Partenariados' } },
    { path: 'partenariados/ver/:id', canActivate:[PartenariadoVerGuard], component: PartenariadosVerComponent, data: { titulo: 'Ver Partenariado' } },
    { path: 'partenariados/crear', canActivate:[PartenariadoCrearProfesorGuard], component: PartenariadoCrearProfesorComponent, data: { titulo: 'Crear Partenariado' } },


    // Proyectos
    { path: 'proyectos', component: ProyectosComponent, data: { titulo: 'Proyectos' } },
    { path: 'mis-proyectos', component: ProyectosComponent, data: { titulo: 'Mis Proyectos' } },
    { path: 'proyectos/ver/:id', component: ProyectosVerComponent, data: { titulo: 'Ver Proyecto' } },

    // varios
    { path: 'registro/condiciones-de-uso', component: CondicionesComponent, data: { titulo: 'Condiciones de uso' } },
    { path: '**', component: Code404Component, data: { titulo: 'Página no encontrada' } },
  ]}


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
