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
      title: 'Aspirantes'
    },
    children: [
      {
        path: 'formatos',
        component: FormatosComponent,
        data: {
          title: 'Formatos PAAE'
        }
      },
      {
        path: 'notificacion_alumno',
        component: NotificacionesAlmComponent,
        data: {
          title: 'Notificaciones Alumno'
        }
      },
      {
        path: 'asignacion_asesores',
        component: AsignacionAseComponent,
        data: {
          title: 'Lista Alumnos'
        }
      },
      {
        path: 'notificacion_asesores',
        component: NotificacionesAsesComponent,
        data: {
          title: 'Notificaciones Asesor'
        }
      },
      {
        path: 'reportes_coordinador',
        component: ReportesCoordComponent,
        data: {
          title: 'Reportes'
        }
      },
      {
        path: 'cronograma',
        component: CronogramaComponent,
        data: {
          title: 'Cronograma'
        }
      },
      {
        path: 'constancias',
        component: ConstanciasComponent,
        data: {
          title: 'Constancias'
        }
      },
      {
        path: 'notificaciones',
        component: NotificacionesComponent,
        data: {
          title: 'Notificaciones'
        }
      },
      {
        path: 'formatos_asesores',
        component: FormatoAsesorComponent,
        data: {
          title: 'Formato Asesor'
        }
      },
      {
        path: 'formatos_alumno',
        component: FormatoAlmnoComponent,
        data: {
          title: 'Formatos Alumno'
        }
      },
      {
        path: 'materias',
        component: MateriasComponent,
        data: {
          title: 'Materias'
        }
      },
      {
        path: 'asignacion',
        component: AsignacionComponent,
        data: {
          title: 'Asignación'
        }
      },
      {
        path: 'solicitudes',
        component: SolicitudesComponent,
        data: {
          title: 'Lista de solicitudes'
        }
      },
      {
        path: 'perfil_de_asesor',
        component: PerfilComponent,
        data: {
          title: 'Perfil'
        }
      },
      {
        path: 'solicitud_asesor',
        component: Form_asesorComponent,
        data: {
          title: 'Solicitud Asesor'
        }
      },
      {
        path: 'solicitud_alumno',
        component: Form_alumnoComponent,
        data: {
          title: 'Solicitud Asesoria'
        }
      },
      {
        path: 'apertura',
        component: AperturaComponent,
        data: {
          title: 'Apertura'
        }
      },
      {
        path: 'generalidades',
        component: GeneralidadesComponent,
        data: {
          title: 'General'
        }
      },
      {
        path: 'reportes',
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









