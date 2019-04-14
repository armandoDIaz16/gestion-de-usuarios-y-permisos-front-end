import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Buttons Routing
import { AsesoriaRoutingModule } from './asesoria-routing.module';

// Component
import { Form_alumnoComponent } from './form_alumno/form_alumno.component'
import { AperturaComponent } from './apertura/apertura.component';
import { GeneralidadesComponent } from './generalidades/generalidades.component';

// Angular

@NgModule({
  imports: [
    CommonModule,
    AsesoriaRoutingModule,
    BsDropdownModule.forRoot(),
    FormsModule
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
    Form_alumnoComponent,
    AperturaComponent, 
    GeneralidadesComponent
  ]
})
export class AsesoriaModule {}
