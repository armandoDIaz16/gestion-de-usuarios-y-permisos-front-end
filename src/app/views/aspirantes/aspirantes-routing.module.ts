import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioComponent } from './formulario/formulario.component';
import { AdministradorComponent } from './administrador/formulario.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Aspirantes'
    },
    children: [
      {
        path: '',
        redirectTo: 'aspirantes'
      },
      {
        path: 'formulario',
        component: FormularioComponent,
        data: {
          title: 'Formulario'
        }
      },
      {
        path: 'administrador',
        component: AdministradorComponent,
        data: {
          title: 'Administrador'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AspirantesRoutingModule {}
