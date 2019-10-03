import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Buttons Routing
import { ServicioRoutingModule  } from './servicio-routing.module';

//Component
import {CollapseModule, TooltipModule} from 'ngx-bootstrap';
import { CrearConvocatoriaComponent } from './crear-convocatoria/crear-convocatoria.component';

@NgModule({
  declarations: [
    CrearConvocatoriaComponent
  ],
  imports: [
    CommonModule,
    ServicioRoutingModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    CollapseModule,
    TooltipModule.forRoot()
  ]
})
export class ServicioSocialModule { }
