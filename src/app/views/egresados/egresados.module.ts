import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Buttons Routing
import { EgresadosRoutingModule } from './egresados-routing.module';

// Component
import {EncuestaComponent} from './encuesta/encuesta.component';
import {AdministradorComponent} from './administrador/administrador.component';
import { ReportesComponent } from './reportes/reportes.component';


@NgModule({
  imports: [
    CommonModule,
    EgresadosRoutingModule,
    BsDropdownModule.forRoot(),
    FormsModule
  ],
  declarations: [
    EncuestaComponent,
    AdministradorComponent,
    ReportesComponent
  ]
})
export class EgresadosModule { }
