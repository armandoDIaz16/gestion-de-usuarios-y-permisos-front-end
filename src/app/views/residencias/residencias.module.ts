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
import { Banco_vistaComponent } from './banco_vista/banco_vista.component';
import { Banco_seleccionComponent } from './banco_seleccion/banco_seleccion.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { BancoEdicionComponent } from './banco_edicion/banco_edicion.component';
import { BancoAprobacionComponent } from './banco_aprobacion/banco_aprobacion.component';

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
    CorreosComponent,
    Banco_vistaComponent,
    Banco_seleccionComponent,
    ProyectosComponent,
    BancoEdicionComponent,
    BancoAprobacionComponent
  ]
})
export class ResidenciasModule { }
