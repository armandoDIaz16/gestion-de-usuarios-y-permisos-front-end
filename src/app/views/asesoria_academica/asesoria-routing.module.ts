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










var rutas = [];


if (sessionStorage.rutas) {
  let sistemas = JSON.parse(sessionStorage.sistemas);
  rutas = [];
  for (var sistema in sistemas[0].SISTEMAS) {
    if (sistemas[0].SISTEMAS[sistema].PK_SISTEMA == sessionStorage.getItem('sistema')) {
      var modulos = [];
      //console.log("--"+sistemas[0].SISTEMAS[sistema].NOMBRE)
      for (var rol in sistemas[0].SISTEMAS[sistema].ROLES) {
        //console.log("----"+sistemas[0].SISTEMAS[sistema].ROLES[rol].NOMBRE)
        for (var modulo in sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS) {
          //console.log("------"+sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE)
          agregarModulos(sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE);
        }
      }
      rutas.push({
        path: '',
        data: {
          title: 'Asesoria academica'
        },
        children: modulos
      });
    }
  }
}

function agregarModulos(modulo) {
  switch (modulo) {
     case 'Formatos':
      modulos.push({
        path: 'formatos',
        component: FormatosComponent,
        data: {
          title: 'Formatos PAAE'
        }
      });
      break;
      case 'Notificación alumno':
      modulos.push({
        path: 'notificacion_alumno',
        component: NotificacionesAlmComponent,
        data: {
          title: 'Notificaciones Alumno'
        }
      });
      break;
      case 'Asignación asesores':
      modulos.push({
        path: 'asignacion_asesores',
        component: AsignacionAseComponent,
        data: {
          title: 'Lista Alumnos'
        }
      });
      break;
      case 'Notificación asesores':
      modulos.push({
        path: 'notificacion_asesores',
        component: NotificacionesAsesComponent,
        data: {
          title: 'Notificaciones Asesor'
        }
      });
      break;
      case 'Reportes coordinador':
      modulos.push({
        path: 'reportes_coordinador',
        component: ReportesCoordComponent,
        data: {
          title: 'Reportes'
        }
      });
      break;
      case 'Cronograma':
      modulos.push({
        path: 'cronograma',
        component: CronogramaComponent,
        data: {
          title: 'Cronograma'
        }
      });
      break;
    case 'Constancias':
      modulos.push({
        path: 'constancias',
        component: ConstanciasComponent,
        data: {
          title: 'Constancias'
        }
      });
      break;
    case 'Notificaciones':
      modulos.push({
        path: 'notificaciones',
        component: NotificacionesComponent,
        data: {
          title: 'Notificaciones'
        }
      });
      break;
    case 'Formatos asesores':
      modulos.push({
        path: 'formatos_asesores',
        component: FormatoAsesorComponent,
        data: {
          title: 'Formato Asesor'
        }
      });
      break;
    case 'Formatos alumno':
      modulos.push({
        path: 'formatos_alumno',
        component: FormatoAlmnoComponent,
        data: {
          title: 'Formatos Alumno'
        }
      });
      break;
    case 'Materias':
      modulos.push({
        path: 'materias',
        component: MateriasComponent,
        data: {
          title: 'Materias'
        }
      });
      break;
    case 'Asignación':
      modulos.push({
        path: 'asignacion',
        component: AsignacionComponent,
        data: {
          title: 'Asignación'
        }
      });
      break;
    case 'Solicitudes':
      modulos.push({
        path: 'solicitudes',
        component: SolicitudesComponent,
        data: {
          title: 'Lista de solicitudes'
        }
      });
      break;
    case 'Perfil de asesor':
      modulos.push({
        path: 'perfil_de_asesor',
        component: PerfilComponent,
        data: {
          title: 'Perfil'
        }
      });
      break;
    case 'Solicitud asesor':
      modulos.push({
        path: 'solicitud_asesor',
        component: Form_asesorComponent,
        data: {
          title: 'Solicitud Asesor'
        }
      });
      break;
    case 'Solicitud alumno':
      modulos.push({
        path: 'solicitud_alumno',
        component: Form_alumnoComponent,
        data: {
          title: 'Solicitud Asesoria'
        }
      });
      break;
    case 'Apertura':
      modulos.push({
        path: 'apertura',
        component: AperturaComponent,
        data: {
          title: 'Apertura'
        }
      });
      break;
    case 'Generalidades':
      modulos.push({
        path: 'generalidades',
        component: GeneralidadesComponent,
        data: {
          title: 'General'
        }
      });
      break;
    case 'Reportes':
      modulos.push({
        path: 'reportes',
        component: ReportesComponent,
        data: {
          title: 'Reportes'
        }
      });
      break;
  }
}


const routes: Routes = rutas;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AsesoriaRoutingModule { }









/* if(sessionStorage.rutas){
  let sistemaPermisos = JSON.parse(sessionStorage.sistemaPermisos);
  let usuarioPermisos = JSON.parse(sessionStorage.sistemas);
  for(var sistema in usuarioPermisos[0].SISTEMAS){
  //console.log("--"+sistemaPermisos[0].NOMBRE)
    if(usuarioPermisos[0].SISTEMAS[sistema].PK_SISTEMA==sessionStorage.getItem('sistema')){
      //console.log("--"+usuarioPermisos[0].SISTEMAS[sistema].NOMBRE)
      if(sistemaPermisos[0].NOMBRE==usuarioPermisos[0].SISTEMAS[sistema].NOMBRE){
        for(var rol in usuarioPermisos[0].SISTEMAS[sistema].ROLES){
          console.log("----"+usuarioPermisos[0].SISTEMAS[sistema].ROLES[rol].NOMBRE)
          for(var modulo in usuarioPermisos[0].SISTEMAS[sistema].ROLES[rol].MODULOS){
            console.log("------"+usuarioPermisos[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE)
            for(var accion in usuarioPermisos[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].ACCIONES){
              console.log("--------"+usuarioPermisos[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].ACCIONES[accion].NOMBRE)
            }
          }
        }
      }
    }
  }
} */
