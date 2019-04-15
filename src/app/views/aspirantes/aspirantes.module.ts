import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Buttons Routing
import { AspirantesRoutingModule } from './aspirantes-routing.module';

// Component
import { FormularioComponent } from './formulario/formulario.component';
import { AdministradorComponent } from './administrador/formulario.component';
import { AltasComponent } from './administrador/altas/altas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatriculaComponent } from './matricula/matricula.component';
import { ReimpresiónComponent } from './reimpresión/reimpresión.component';
import { ReferenciaComponent } from './referencia/referencia.component';
import { MatriculadosComponent } from './matriculados/matriculados.component';
import { VigenciaDePagosComponent } from './vigencia_de_pagos/vigencia_de_pagos.component';
import { GruposComponent } from './grupos/grupos.component';
import { PagoSinFormalizarComponent } from './pago_sin_formalizar/pago_sin_formalizar.component';
import { SinPagoRegistradoComponent } from './sin_pago_registrado/sin_pago_registrado.component';
import { ReporteCompletoComponent } from './reporte_completo/reporte_completo.component';
import { AceptadosComponent } from './aceptados/aceptados.component';
import { PeriodoComponent } from './periodo/periodo.component';

// Angular

@NgModule({
  imports: [
    CommonModule,
    AspirantesRoutingModule,
    BsDropdownModule.forRoot(),
    FormsModule
  ],
  declarations: [
    FormularioComponent,
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
    SinPagoRegistradoComponent,
    ReporteCompletoComponent,
    AceptadosComponent,
    PeriodoComponent
  ]
})
export class AspirantesModule {}
