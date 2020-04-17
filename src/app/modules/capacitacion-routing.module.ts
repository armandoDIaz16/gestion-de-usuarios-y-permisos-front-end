import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { PeriodosComponent } from '../components/capacitacion_docente/periodos.component';
import { CursosComponent } from '../components/capacitacion_docente/cursos.component';
import { BienvenidoComponent } from '../components/capacitacion_docente/bienvenido.component';
import { CapturaCursoComponent } from '../components/capacitacion_docente/captura-curso.component';
import { InstructorCvComponent } from '../components/capacitacion_docente/instructor-cv.component';
import {RegistroFichaTecnicaComponent} from '../components/capacitacion_docente/registro-ficha-tecnica.component';
import {ListaDeParticipantesComponent} from '../components/capacitacion_docente/lista-de-participantes.component';
import {MaterialDelCursoComponent} from '../components/capacitacion_docente/material-del-curso.component';
import {VerFichaTecnicaComponent} from '../components/capacitacion_docente/ver-ficha-tecnica.component';
import {VerCursoParticipanteComponent} from '../components/capacitacion_docente/ver-curso-participante.component';

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
                  title: 'Registro de curso'
              }
          },
          {
              path: '7b44125ec5b3b7b61b000cdee93c6796/:id', // captura_cursos
              component: CapturaCursoComponent,
              data: {
                  title: 'Modifica curso'
              }
          },
          {
              path: 'de3ec0aa2234aa1e3ee275bbc715c6c9/:id', // cv
              component: InstructorCvComponent,
              data: {
                  title: 'CV'
              }
          },
          {
              path: 'a8061fb3c2160acc4b456babcf74fe82/:idcurso', // registro_ficha_tecnica
              component: RegistroFichaTecnicaComponent,
              data: {
                  title: 'Ficha Técnica del Curso'
              }
          },
          {
              path: 'a9f4d4caa23c7f2d8ccf466f12c53cb4/:idcurso', // ver_curso_participante
               component: VerCursoParticipanteComponent, // todo pendiente utilizar componente
              data: {
                  title: 'Información del Curso'
              }
          },
          {
              path: 'c3bfaea0f0bb5f3ebdc7a12e50013ca5/:idcurso', // material_del_curso
              component: MaterialDelCursoComponent,
              data: {
                  title: 'Material del Curso'
              }
          },
          {
              path: '0629dad63eedea217bbbf202c19ed531/:idcurso', // lista_de_participantes
              component: ListaDeParticipantesComponent,
              data: {
                  title: 'Lista de Participantes'
              }
          },
          {
              path: '55522b2cdc0af2da326c79a3cbb63f47/:idcurso', // ver_ficha_tecnica
              component: VerFichaTecnicaComponent,
              data: {
                  title: 'Ficha Técnica del Curso'
              }
          },

      ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapacitacionRoutingModule {}
