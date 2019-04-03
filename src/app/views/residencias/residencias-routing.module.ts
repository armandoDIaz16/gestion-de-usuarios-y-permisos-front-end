import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BancoproyectosComponent } from './bancoproyectos/bancoproyectos.component';


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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidenciasRoutingModule {}
