import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { BancoproyectosComponent } from './bancoproyectos/bancoproyectos.component';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Buttons Routing
import { ResidenciasRoutingModule } from './residencias-routing.module';

// Angular

@NgModule({
  imports: [
    CommonModule,
    ResidenciasRoutingModule,
    BsDropdownModule.forRoot(),
    FormsModule
  ],
  declarations: [
    BancoproyectosComponent
  ]
})
export class ResidenciasModule { }
