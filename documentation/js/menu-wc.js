'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">portal-aps documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-cb880cb0feaca63e4634a23442833ae09c7a1e66e2a90ad900cd9d0f43b8747bb7443bc5dfa7e8debeb4dccd8dff887c33310efc2295fa42e565ef7c123e2eef"' : 'data-target="#xs-components-links-module-AppModule-cb880cb0feaca63e4634a23442833ae09c7a1e66e2a90ad900cd9d0f43b8747bb7443bc5dfa7e8debeb4dccd8dff887c33310efc2295fa42e565ef7c123e2eef"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-cb880cb0feaca63e4634a23442833ae09c7a1e66e2a90ad900cd9d0f43b8747bb7443bc5dfa7e8debeb4dccd8dff887c33310efc2295fa42e565ef7c123e2eef"' :
                                            'id="xs-components-links-module-AppModule-cb880cb0feaca63e4634a23442833ae09c7a1e66e2a90ad900cd9d0f43b8747bb7443bc5dfa7e8debeb4dccd8dff887c33310efc2295fa42e565ef7c123e2eef"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BreadcrumbsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BreadcrumbsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CarouselComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarouselComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CheckboxNotificacionesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckboxNotificacionesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Code404Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Code404Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ComoParticiparEstudiantesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ComoParticiparEstudiantesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ComoParticiparProfesoresComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ComoParticiparProfesoresComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ComoParticiparSociosComunitariosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ComoParticiparSociosComunitariosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CondicionesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CondicionesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DemandasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DemandasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DemandasVerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DemandasVerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FaqComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FaqComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GestionUsuariosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GestionUsuariosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GestionUsuariosEditarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GestionUsuariosEditarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GestorEmailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GestorEmailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GestorNewsletterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GestorNewsletterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IniciativaRespaldadaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IniciativaRespaldadaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IniciativasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IniciativasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IniciativasCrearComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IniciativasCrearComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IniciativasEditarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IniciativasEditarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IniciativasVerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IniciativasVerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewsletterSubscribeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsletterSubscribeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OfertaCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfertaCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OfertasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfertasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OfertasCrearComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfertasCrearComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OfertasVerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfertasVerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PartenariadoCrearProfesorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PartenariadoCrearProfesorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PartenariadosCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PartenariadosCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PartenariadosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PartenariadosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PartenariadosVerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PartenariadosVerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProyectosCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProyectosCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProyectosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProyectosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProyectosVerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProyectosVerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QueEsApsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QueEsApsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResumenComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResumenEstudianteExternoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumenEstudianteExternoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResumenEstudianteInternoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumenEstudianteInternoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResumenOficinaApsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumenOficinaApsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResumenProfesorExternoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumenProfesorExternoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResumenProfesorInternoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumenProfesorInternoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResumenSocioComunitarioComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumenSocioComunitarioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ServicioOfertadoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServicioOfertadoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SobreApsUnedContactaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SobreApsUnedContactaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SobreApsUnedHistoriaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SobreApsUnedHistoriaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SobreApsUnedQuienesSomosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SobreApsUnedQuienesSomosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SugerirOfertaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SugerirOfertaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/crearDemandaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >crearDemandaComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-cb880cb0feaca63e4634a23442833ae09c7a1e66e2a90ad900cd9d0f43b8747bb7443bc5dfa7e8debeb4dccd8dff887c33310efc2295fa42e565ef7c123e2eef"' : 'data-target="#xs-pipes-links-module-AppModule-cb880cb0feaca63e4634a23442833ae09c7a1e66e2a90ad900cd9d0f43b8747bb7443bc5dfa7e8debeb4dccd8dff887c33310efc2295fa42e565ef7c123e2eef"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-cb880cb0feaca63e4634a23442833ae09c7a1e66e2a90ad900cd9d0f43b8747bb7443bc5dfa7e8debeb4dccd8dff887c33310efc2295fa42e565ef7c123e2eef"' :
                                            'id="xs-pipes-links-module-AppModule-cb880cb0feaca63e4634a23442833ae09c7a1e66e2a90ad900cd9d0f43b8747bb7443bc5dfa7e8debeb4dccd8dff887c33310efc2295fa42e565ef7c123e2eef"' }>
                                            <li class="link">
                                                <a href="pipes/SafeHtmlPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SafeHtmlPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Demanda.html" data-type="entity-link" >Demanda</a>
                            </li>
                            <li class="link">
                                <a href="classes/Iniciativa.html" data-type="entity-link" >Iniciativa</a>
                            </li>
                            <li class="link">
                                <a href="classes/Mail.html" data-type="entity-link" >Mail</a>
                            </li>
                            <li class="link">
                                <a href="classes/Newsletter.html" data-type="entity-link" >Newsletter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Oferta.html" data-type="entity-link" >Oferta</a>
                            </li>
                            <li class="link">
                                <a href="classes/Partenariado.html" data-type="entity-link" >Partenariado</a>
                            </li>
                            <li class="link">
                                <a href="classes/Profesor.html" data-type="entity-link" >Profesor</a>
                            </li>
                            <li class="link">
                                <a href="classes/Proyecto.html" data-type="entity-link" >Proyecto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Upload.html" data-type="entity-link" >Upload</a>
                            </li>
                            <li class="link">
                                <a href="classes/Usuario.html" data-type="entity-link" >Usuario</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DemandaService.html" data-type="entity-link" >DemandaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileUploadService.html" data-type="entity-link" >FileUploadService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HomeService.html" data-type="entity-link" >HomeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IniciativaService.html" data-type="entity-link" >IniciativaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailerService.html" data-type="entity-link" >MailerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OfertaService.html" data-type="entity-link" >OfertaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PartenariadoService.html" data-type="entity-link" >PartenariadoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProyectoService.html" data-type="entity-link" >ProyectoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsuarioService.html" data-type="entity-link" >UsuarioService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UtilsService.html" data-type="entity-link" >UtilsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/DemandaCrearGuard.html" data-type="entity-link" >DemandaCrearGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/GestorGuard.html" data-type="entity-link" >GestorGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/GuestGuard.html" data-type="entity-link" >GuestGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/IniciativaCrearGuard.html" data-type="entity-link" >IniciativaCrearGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/IniciativaEditarGuard.html" data-type="entity-link" >IniciativaEditarGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/OfertaCrearGuard.html" data-type="entity-link" >OfertaCrearGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/OfertaVerGuard.html" data-type="entity-link" >OfertaVerGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/PartenariadoCrearProfesorGuard.html" data-type="entity-link" >PartenariadoCrearProfesorGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/PartenariadoVerGuard.html" data-type="entity-link" >PartenariadoVerGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/ProfesorGuard.html" data-type="entity-link" >ProfesorGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/ProtectedGuard.html" data-type="entity-link" >ProtectedGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AutoCompleteModel.html" data-type="entity-link" >AutoCompleteModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginForm.html" data-type="entity-link" >LoginForm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterForm.html" data-type="entity-link" >RegisterForm</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});