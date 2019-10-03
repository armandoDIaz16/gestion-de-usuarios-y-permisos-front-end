import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { CrearConvocatoriaComponent } from "./crear-convocatoria/crear-convocatoria.component";


const ROUTES: Routes= [
    {
      path:'convocatorias',
      component:CrearConvocatoriaComponent
    }

];
@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: []

})
export class ServicioRoutingModule { }
