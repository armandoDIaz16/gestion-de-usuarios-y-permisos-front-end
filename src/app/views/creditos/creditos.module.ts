import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxPaginationModule } from 'ngx-pagination';


// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';


import { LineamientosComponent} from './lineamientos.component';
import { LineamientosFormComponent} from './lineamientosForm.component';
import { GestionActividadesComponent} from './gestionActividades.component';
import { GestionActividadesFormComponent } from './gestion-actividades-form.component';
import { ActividadesComponent} from './actividades.component';
import { DetalleActividadComponent} from './detalleActividad.component';
import { SeguimientoAlumnoComponent } from './seguimientoAlumno.component';
import { ActividadesResponsableComponent } from './actividadesResponsable.component';
import { ListaAsistenciaResponsableComponent } from './listaAsistenciaResponsable.component';
import { AsistentesResponsableComponent } from './asistentesResponsable.component';
import { ActividadesAsistenteComponent } from './actividadesAsistente.component';
import { RegistroAsistenciasComponent } from './registroAsistencias.component';
import { CreditosPorValidarComponent } from './creditosPorValidar.component';
import { CreditosValidadosComponent } from './creditosValidados.component';
import { DetalleActividadAdminComponent } from './detalleActividadAdmin.component';
import { UsuariosComiteAcademicoFormComponent } from './usuariosComiteAcademico-Form.component';
import { registroAdministrativosComponent } from './registroAdministrativos.component';
import { UsuarioJefeCarreraComponent } from './usuarioJefeCarrera-form.component';
import { UsuarioResponsableActFormComponent} from './usuarioResponsableAct-form.component';
// Dropdowns Component


// Buttons Routing
import { CreditosRoutingModule } from './creditos-routing.module';
 import { from } from 'rxjs';

// Angular

@NgModule({
  imports: [
    CommonModule,
    CreditosRoutingModule,
    FormsModule,
    TabsModule,
    BsDropdownModule.forRoot(),
    NgxPaginationModule,
  ],
  declarations: [
    LineamientosComponent,
    LineamientosFormComponent,
    GestionActividadesComponent,
    GestionActividadesFormComponent,
    ActividadesComponent,
    DetalleActividadComponent,
    SeguimientoAlumnoComponent,
    ActividadesResponsableComponent,
    ListaAsistenciaResponsableComponent,
    AsistentesResponsableComponent,
    ActividadesAsistenteComponent,
    RegistroAsistenciasComponent,
    CreditosPorValidarComponent,
    CreditosValidadosComponent,
    DetalleActividadAdminComponent,
    UsuariosComiteAcademicoFormComponent,
    registroAdministrativosComponent,
    UsuarioJefeCarreraComponent,
    UsuarioResponsableActFormComponent
  ]
})
export class CreditosModule { }
