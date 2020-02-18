import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { PeriodosComponent } from '../components/capacitacion_docente/periodos.component';
import { CursosComponent } from '../components/capacitacion_docente/cursos.component';
import { BienvenidoComponent } from '../components/capacitacion_docente/bienvenido.component';
import { CapturaCursoComponent } from '../components/capacitacion_docente/captura-curso.component';

const routes: Routes = [
  {
      path: '',
      data: {
          title: 'Sistema de Capacitación Docente'
      },
      children: [
          {
              path: '787eb37068bf4a5b174c44f75d22cc51', // bienvenido
              component: BienvenidoComponent,
              data: {
                  title: 'Bienvenido'
              }
          },
          {
              path: 'e990c920d0d77fa0937fce0bc4e5a67b', // periodos
              component: PeriodosComponent,
              data: {
                  title: 'Periodos'
              }
          },
          {
              path: 'fdf484eeeb011a5fb52cf33751b4e22f', // cursos
              component: CursosComponent,
              data: {
                  title: 'Cursos'
              }
          },
          {
              path: '7b44125ec5b3b7b61b000cdee93c6796', // captura_cursos
              component: CapturaCursoComponent,
              data: {
                  title: 'Captura cursos'
              }
          },
      ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapacitacionRoutingModule {}
