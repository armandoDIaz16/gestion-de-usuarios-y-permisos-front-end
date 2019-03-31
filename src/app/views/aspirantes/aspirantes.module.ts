import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { FormularioComponent } from './formulario/formulario.component';
import { AdministradorComponent } from './administrador/formulario.component';
import { AltasComponent } from './administrador/altas/altas.component';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Buttons Routing
import { AspirantesRoutingModule } from './aspirantes-routing.module';

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
    AltasComponent
  ]
})
export class AspirantesModule { }
