import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
// @ts-ignore
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap';



// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Buttons Routing
import { AsesoriaRoutingModule } from './asesoria-routing.module';

// Component
import { Form_alumnoComponent } from './form_alumno/form_alumno.component';
import { Form_asesorComponent } from './form_asesor/form_asesor.component';
import { AperturaComponent } from './apertura/apertura.component';
import { GeneralidadesComponent } from './generalidades/generalidades.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AsignacionComponent } from './asignacion/asignacion.component';
import { MateriasComponent } from './materias/materias.component';
import { FormatoAlmnoComponent } from './formatoAlmno/formatoAlmno.component';
import { FormatoAsesorComponent } from './formatoAsesor/formatoAsesor.component';
import { ReportesComponent } from './reportes/reportes.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { ConstanciasComponent } from './constancias/constancias.component';
import { FormatosComponent } from './formatos/formatos.component';
import { CronogramaComponent } from './cronograma/cronograma.component';
import { ReportesCoordComponent } from './reportesCoor/reportesCoor.component';
import { NotificacionesAsesComponent } from './notificacionesAses/notificacionesAses.component';
import { AsignacionAseComponent } from './asignacionAse/asignacionAse.component';
import { NotificacionesAlmComponent } from './notificacionesAlm/notificacionesAlm.component';
import { ErrorModule } from '../../components/error/error.module';





// Angular

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    AsesoriaRoutingModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    NgxPaginationModule,
    ErrorModule
  ],
  declarations: [
    Form_asesorComponent,
    Form_alumnoComponent,
    AperturaComponent,
    GeneralidadesComponent,
    PerfilComponent,
    AsignacionComponent,
    SolicitudesComponent,
    MateriasComponent,
    FormatoAlmnoComponent,
    FormatoAsesorComponent,
    ReportesComponent,
    NotificacionesComponent,
    ConstanciasComponent,
    FormatosComponent,
    CronogramaComponent,
    ReportesCoordComponent,
    NotificacionesAsesComponent,
    AsignacionAseComponent,
    NotificacionesAlmComponent
  ],
  exports: [
    ModalModule
  ]
})
export class AsesoriaModule { }
