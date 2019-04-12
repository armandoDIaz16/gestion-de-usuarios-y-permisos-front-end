import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Buttons Routing
import {CapacitacionRoutingModule} from './capacitacion-routing.module';


// Component
import {ProponerCursoComponent} from './proponer_curso/proponer_curso.component';

// Angular

@NgModule({
  imports: [
    CommonModule,
    CapacitacionRoutingModule,
    BsDropdownModule.forRoot(),
    FormsModule
  ],
  declarations: [
    ProponerCursoComponent

  ]
})
export class CapacitacionModule { }
