import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from "ngx-bootstrap";



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




// Angular

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    AsesoriaRoutingModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    NgxPaginationModule,
  ],
  declarations: [
    /*     FormularioComponent,
        AdministradorComponent,
        AltasComponent,
        DashboardComponent,
        MatriculaComponent,
        ReimpresiónComponent,
        ReferenciaComponent,
        MatriculadosComponent,
        VigenciaDePagosComponent,
        GruposComponent,
        PagoSinFormalizarComponent,
        SinPagoRegistradoComponent,*/
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
  ],
  exports: [
    ModalModule
  ]
})
export class AsesoriaModule { }
