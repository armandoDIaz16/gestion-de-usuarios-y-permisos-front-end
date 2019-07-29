import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';
//import { Chart } from 'chart.js';
import { ModalModule } from "ngx-bootstrap";


// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Buttons Routing
import { AspirantesRoutingModule } from './aspirantes-routing.module';

// Component
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficasComponent } from './graficas/graficas.component';
import { ArchivosComponent } from './archivos/archivos.component';
import { PrefichasPagadasComponent } from './prefichas_pagadas/prefichas_pagadas.component';
import { ListaGruposComponent } from './lista_grupos/lista_grupos.component';
import { PrefichasComponent } from './prefichas/prefichas.component';
import { PeriodoComponent } from './periodo/periodo.component';
import { DatosComponent } from './datos/datos.component';
import { CrearGruposComponent } from './crear_grupos/crear_grupos.component';

// Angular

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    AspirantesRoutingModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    NgxPaginationModule,
    ChartsModule
    //Chart
  ],
  declarations: [
    DashboardComponent,
    GraficasComponent,
    ArchivosComponent,
    PrefichasPagadasComponent,
    ListaGruposComponent,
    CrearGruposComponent,
    PrefichasComponent,
    PeriodoComponent,
    DatosComponent,
  ],
  exports: [
    ModalModule
]
})
export class AspirantesModule {}
