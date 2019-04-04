import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BancoproyectosComponent } from './bancoproyectos/bancoproyectos.component';
import { DocumentacionComponent } from './documentacion/documentacion.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Residencias'
    },
    children: [
      {
        path: '',
        redirectTo: 'residencias'
      },
      {
        path: 'bancoproyectos',
        component: BancoproyectosComponent,
        data: {
          title: 'Banco'
        }
      },
      {
        path: 'documentacion',
        component: DocumentacionComponent,
        data: {
          title: 'Documentacion'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidenciasRoutingModule {}
