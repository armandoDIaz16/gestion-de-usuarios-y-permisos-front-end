import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Form_asesorComponent } from './form_asesor/form_asesor.component';
import { Form_alumnoComponent } from './form_alumno/form_alumno.component'
import { GeneralidadesComponent } from './generalidades/generalidades.component';
import { AperturaComponent } from './apertura/apertura.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AsignacionComponent } from './asignacion/asignacion.component';
import { MateriasComponent } from './materias/materias.component';
import { FormatoAlmnoComponent } from './formatoAlmno/formatoAlmno.component';
import { FormatoAsesorComponent } from './formatoAsesor/formatoAsesor.component';
import { ReportesComponent } from './reportes/reportes.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { ConstanciasComponent } from './constancias/constancias.component';
import { FormatosComponent } from './formatos/formatos.component';
import { CronogramaComponent } from './cronograma/cronograma.component';
import { ReportesCoordComponent } from './reportesCoor/reportesCoor.component';
import { NotificacionesAsesComponent } from './notificacionesAses/notificacionesAses.component';
import { AsignacionAseComponent } from './asignacionAse/asignacionAse.component';
import { NotificacionesAlmComponent } from './notificacionesAlm/notificacionesAlm.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Asesoria Academica'
    },
    children: [
      {
        path: '7260be0e3082e1b921913eb9ad0837df', //formatos
        component: FormatosComponent,
        data: {
          title: 'Formatos PAAE'
        }
      },
      {
        path: 'f0e8b0879997801fd0e04c8e0f6390c4', //notificacion_alumno
        component: NotificacionesAlmComponent,
        data: {
          title: 'Notificaciones Alumno'
        }
      },
      {
        path: '2717584bb9f796a3ec7a233792daa129', //asignacion_asesores
        component: AsignacionAseComponent,
        data: {
          title: 'Lista Alumnos'
        }
      },
      {
        path: 'bb88b163f9f5662e3427178c7081a835', //notificacion_asesores
        component: NotificacionesAsesComponent,
        data: {
          title: 'Notificaciones Asesor'
        }
      },
      {
        path: 'e034eb433ed198a789e3c2f7a2066b1f', //reportes_coordinador
        component: ReportesCoordComponent,
        data: {
          title: 'Reportes'
        }
      },
      {
        path: '625d69d053916d80fff62985adc219cb', //Cronograma
        component: CronogramaComponent,
        data: {
          title: 'Cronograma'
        }
      },
      {
        path: '4abc9fdf01d0176ad44990e73e76fd36', //constancias
        component: ConstanciasComponent,
        data: {
          title: 'Constancias'
        }
      },
      {
        path: '08e4efa85b9242a11994d9e7a9943cfd', //notificaciones
        component: NotificacionesComponent,
        data: {
          title: 'Notificaciones'
        }
      },
      {
        path: '37c9114fff6e88edb562e92b8358cb8b', //formatos_asesores
        component: FormatoAsesorComponent,
        data: {
          title: 'Formato Asesor'
        }
      },
      {
        path: '4184a6435b97c7e0d7ff3484d0c86bf9', //formatos_alumno
        component: FormatoAlmnoComponent,
        data: {
          title: 'Formatos Alumno'
        }
      },
      {
        path: '1747db730b311d6934e628227bc5822c', //materias
        component: MateriasComponent,
        data: {
          title: 'Materias'
        }
      },
      {
        path: '8606b80c44b0ebb62d4bdbdb3dc62ae9', //asignacion
        component: AsignacionComponent,
        data: {
          title: 'Asignación'
        }
      },
      {
        path: 'dfdca9641e416f4156e3d584cc2f437e', //solicitudes
        component: SolicitudesComponent,
        data: {
          title: 'Lista de solicitudes'
        }
      },
      {
        path: '7461692f60535a469f8527625a0e4aff', //perfil_de_asesor
        component: PerfilComponent,
        data: {
          title: 'Perfil'
        }
      },
      {
        path: 'f098877037f139b5cacecb5da50ec240', //solicitud_asesor
        component: Form_asesorComponent,
        data: {
          title: 'Solicitud Asesor'
        }
      },
      {
        path: 'ed325e99553efb6c20af9e32234a65d8', //solicitud_alumno
        component: Form_alumnoComponent,
        data: {
          title: 'Solicitud Asesoria'
        }
      },
      {
        path: '2873ce9d61fb6a049621820184375958', //apertura
        component: AperturaComponent,
        data: {
          title: 'Apertura'
        }
      },
      {
        path: '3a67539fc9aaa0b0a5a14a15622ac68a', //generalidades
        component: GeneralidadesComponent,
        data: {
          title: 'General'
        }
      },
      {
        path: '0b382923b48a141421a9c559fa981ff5', //reportes
        component: ReportesComponent,
        data: {
          title: 'Reportes'
        }
      }
    ]
  }];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class AsesoriaRoutingModule {}









