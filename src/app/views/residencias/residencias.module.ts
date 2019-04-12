import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Buttons Routing
import { ResidenciasRoutingModule } from './residencias-routing.module';

// Component
import { BancoProyectosComponent } from './banco_proyectos/banco_proyectos.component';
import { DocumentacionComponent } from './documentacion/documentacion.component';
import { CorreosComponent } from './correos/correos.component';

// Angular

@NgModule({
  imports: [
    CommonModule,
    ResidenciasRoutingModule,
    BsDropdownModule.forRoot(),
    FormsModule
  ],
  declarations: [
    BancoProyectosComponent,
    DocumentacionComponent,
    CorreosComponent
  ]
})
export class ResidenciasModule { }
