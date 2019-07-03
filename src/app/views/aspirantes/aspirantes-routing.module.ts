import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DatosComponent } from './datos/datos.component';
import { GraficasComponent } from './graficas/graficas.component';
import { ArchivosComponent } from './archivos/archivos.component';
import { PrefichasPagadasComponent } from './prefichas_pagadas/prefichas_pagadas.component';
import { ListaGruposComponent } from './lista_grupos/lista_grupos.component';
import { PrefichasComponent } from './prefichas/prefichas.component';
import { PeriodoComponent } from './periodo/periodo.component';
import { CrearGruposComponent } from './crear_grupos/crear_grupos.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Aspitantes'
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'datos',
        component: DatosComponent,
        data: {
          title: 'Datos'
        }
      },
      {
        path: 'prefichas',
        component: PrefichasComponent,
        data: {
          title: 'Prefichas'
        }
      },
      {
        path: 'prefichas_pagadas',
        component: PrefichasPagadasComponent,
        data: {
          title: 'Prefichas pagadas'
        }
      },
      {
        path: 'lista_grupos',
        component: ListaGruposComponent,
        data: {
          title: 'Lista grupos'
        }
      },
      {
        path: 'crear_grupos',
        component: CrearGruposComponent,
        data: {
          title: 'Crear grupos'
        }
      },
      {
        path: 'archivos',
        component: ArchivosComponent,
        data: {
          title: 'Archivos'
        }
      },
      {
        path: 'graficas',
        component: GraficasComponent,
        data: {
          title: 'Graficas'
        }
      },
      {
        path: 'periodo',
        component: PeriodoComponent,
        data: {
          title: 'Periodo'
        }
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AspirantesRoutingModule {}
