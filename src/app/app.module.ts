import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ValidateEqualModule } from 'ng-validate-equal';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

// Routes
import { AppRoutingModule } from './app-routing.module';

// Main root component
import { AppComponent } from './app.component';

// libraries
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

// pipes
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

// components no pages
import { NewsletterSubscribeComponent } from './components/newsletter-subscribe/newsletter-subscribe.component';

// shared
import { NavbarComponent } from './pages/shared/navbar/navbar.component';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { BreadcrumbsComponent } from './pages/shared/breadcrumbs/breadcrumbs.component';

// Components auth pages - Login, Register
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './auth/profile/profile.component';

// Component gestor pages
import { GestionUsuariosComponent } from './pages/gestor/gestion-usuarios/gestion-usuarios.component';

// Components regular pages
import { HomeComponent } from './pages/home/home.component';
import { CarouselComponent } from './pages/home/carousel/carousel.component';

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
import { OfertasComponent } from './pages/ofertas/ofertas.component';
//import { OfertasVerComponent } from './pages/ofertas-ver/ofertas-ver.component';
import { OfertasCrearComponent } from './pages/ofertas-crear/ofertas-crear.component';
//import { OfertasEditarComponent } from './pages/ofertas-editar/ofertas-editar.component';

//demandas
import { crearDemandaComponent } from './pages/crear-demanda/crear-demanda.component';
import { DemandasComponent } from './pages/demandas/demandas.component';

// partenariados
import { PartenariadosComponent } from './pages/partenariados/partenariados.component';
import { PartenariadosVerComponent } from './pages/partenariados-ver/partenariados-ver.component';
import { PartenariadoCrearProfesorComponent } from './pages/partenariados-crear/partenariado-profesor-crear/partenariado-profesor-crear.component';

// proyectos
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { ProyectosVerComponent } from './pages/proyectos-ver/proyectos-ver.component';

// gestor pages
import { GestionUsuariosEditarComponent } from './pages/gestor/gestion-usuarios-editar/gestion-usuarios-editar.component';
import { GestorEmailsComponent } from './pages/gestor/gestor-emails/gestor-emails.component';
import { GestorNewsletterComponent } from './pages/gestor/gestor-newsletter/gestor-newsletter.component';

// varios y error pages
import { CondicionesComponent } from './pages/condiciones/condiciones.component';
import { Code404Component } from './errors/code404/code404.component';

//Utils
import { NgxTagsModule} from "ngx-tags-input-box";


// Go!
@NgModule({
  declarations: [

    // main root component
    AppComponent,

    // pipes
    SafeHtmlPipe,

    // regular components
    NewsletterSubscribeComponent,

    // shared by all pages
    NavbarComponent,
    FooterComponent,
    BreadcrumbsComponent,

    // auth
    LoginComponent,
    RegisterComponent,
    ProfileComponent,

    // gestor
    GestionUsuariosComponent,

    // regular pages
    HomeComponent,
    CarouselComponent,
    QueEsApsComponent,

    ComoParticiparEstudiantesComponent,
    ComoParticiparProfesoresComponent,
    ComoParticiparSociosComunitariosComponent,

    SobreApsUnedQuienesSomosComponent,
    SobreApsUnedHistoriaComponent,
    SobreApsUnedContactaComponent,

    // iniciativas
    IniciativasComponent,
    IniciativasVerComponent,
    IniciativasCrearComponent,
    IniciativasEditarComponent,

    
    // ofertas
    OfertasCrearComponent,
    OfertasComponent,
    
    // partenariados
    PartenariadosComponent,
    PartenariadosVerComponent,
    PartenariadoCrearProfesorComponent,

    // proyectos
    ProyectosComponent,

    //demandas
    crearDemandaComponent,
    DemandasComponent,

    // gestor
    GestionUsuariosEditarComponent,
    GestorEmailsComponent,
    GestorNewsletterComponent,

    // varios
    CondicionesComponent,
    Code404Component,
    ProyectosVerComponent,

    //utils

  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    NgxMatSelectSearchModule,


    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // libraries
    FontAwesomeModule,

    // app routing
    AppRoutingModule,

    ValidateEqualModule,

    //Utils
    NgxTagsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
