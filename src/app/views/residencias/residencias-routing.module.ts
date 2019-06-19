import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BancoProyectosComponent } from './banco_proyectos/banco_proyectos.component';
import { DocumentacionComponent } from './documentacion/documentacion.component';
import {CorreosComponent} from './correos/correos.component';
import {Banco_vistaComponent} from './banco_vista/banco_vista.component';
import {Banco_seleccionComponent} from './banco_seleccion/banco_seleccion.component';
import {ProyectosComponent} from './proyectos/proyectos.component';
import {BancoEdicionComponent} from './banco_edicion/banco_edicion.component';
import {BancoAprobacionComponent} from './banco_aprobacion/banco_aprobacion.component';
import {MaestrosComponent} from './maestros/maestros.component';
import {ReporteVistaComponent} from './reporte_vista/reporte_vista.component';
import {VistaComentariosComponent} from './vista_comentarios/vista_comentarios.component';
import {Reporte_docenteComponent} from './reporte_docente/reporte_docente.component';
import {Vista_reportesComponent} from './vista_reportes/vista_reportes.component';
import {FichaUnicaAsignacionComponent} from './ficha_unica_asignacion/ficha_unica_asignacion.component';
import {ConveniosComponent} from './convenios/convenios.component';
import {PeriodosComponent} from './periodos/periodos.component';
import {Periodos_reportesComponent} from './periodos_reportes/periodos_reportes.component';
import {Calificacion_alumnoComponent} from './calificacion_alumno/calificacion_alumno.component';
import {Habilitar_residentesComponent} from './habilitar_residentes/habilitar_residentes.component';
import {Reporte_asesor_externoComponent} from './reporte_asesor_externo/reporte_asesor_externo.component';
import {Vista_documentacionComponent} from './vista_documentacion/vista_documentacion.component';
import {Banco_estadisticaComponent} from './banco_estadistica/banco_estadistica.component';
import {Estadisticas_reportesComponent} from './estadisticas_reportes/estadisticas_reportes.component';
import {Informe_tecnicoComponent} from './informe_tecnico/informe_tecnico.component';
import {Generar_conveniosComponent} from './generar_convenios/generar_convenios.component';
import {Configuracion_actaComponent} from './configuracion_acta/configuracion_acta.component';
import {Informacion_residenciasComponent} from './informacion_residencias/informacion_residencias.component';

var rutas = [];


if (sessionStorage.rutas) {
  let sistemas = JSON.parse(sessionStorage.sistemas);
  rutas = [];
  for (var sistema in sistemas[0].SISTEMAS) {
    if (sistemas[0].SISTEMAS[sistema].PK_SISTEMA==sessionStorage.getItem('sistema')){
      var modulos = [];
      // console.log("--"+sistemas[0].SISTEMAS[sistema].NOMBRE)
      for(var rol in sistemas[0].SISTEMAS[sistema].ROLES){
        // console.log("----"+sistemas[0].SISTEMAS[sistema].ROLES[rol].NOMBRE)
        for(var modulo in sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS){
          // console.log("------"+sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE)
          agregarModulos(sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE);
        }
      }
      rutas.push({
        path: '',
        data: {
          title: 'Residencias'
        },
        children: modulos
      });
    }
  }
}

function agregarModulos(modulo) {
  switch (modulo) {
    case 'Banco Proyectos':
      modulos.push({
        path: 'banco_proyectos',
        component: BancoProyectosComponent,
        data: {
          title: 'Banco'
        }
      });
      break;
    case 'Documentacion':
      modulos.push({
        path: 'documentacion',
        component: DocumentacionComponent,
        data: {
          title: 'Documentacion'
        }
      });
      break;
    case 'Correos':
      modulos.push({
        path: 'correos',
        component: CorreosComponent,
        data: {
          title: 'Correos'
        }
      });
      break;
    case 'Banco vista':
      modulos.push({
        path: 'banco_vista',
        component: Banco_vistaComponent,
        data: {
          title: 'Banco'
        }
      });
      break;
    case 'Banco seleccion':
      modulos.push({
        path: 'banco_seleccion',
        component: Banco_seleccionComponent,
        data: {
          title: 'Banco'
        }
      });
      break;
      case 'Proyectos':
          modulos.push({
             path: 'proyectos',
             component: ProyectosComponent,
             data: {
                 title: 'Proyecto'
             }
          });
          break;
      case 'Banco edicion':
          modulos.push({
              path: 'banco_edicion',
              component: BancoEdicionComponent,
              data: {
                  title: 'Edición'
              }
          });
          break;
      case 'Banco aprobacion':
          modulos.push({
              path: 'banco_aprobacion',
              component: BancoAprobacionComponent,
              data: {
                  title: 'Aprobar'
              }
          });
          break;
      case 'Maestros':
          modulos.push({
              path: 'maestros',
              component: MaestrosComponent,
              data: {
                  title: 'Asignacion de docentes'
              }
          });
          break;
      case 'Reporte vista':
          modulos.push({
              path: 'reporte_vista',
              component: ReporteVistaComponent,
              data: {
                  title: 'Vista de reportes'
              }
          });
          break;
      case 'Vista comentarios':
          modulos.push({
              path: 'vista_comentarios',
              component: VistaComentariosComponent,
              data: {
                  title: 'Comentarios reporte'
              }
          });
          break;
      case 'Reporte docente':
          modulos.push({
              path: 'reporte_docente',
              component: Reporte_docenteComponent,
              data: {
                  title: 'Reporte'
              }
          });
          break;
      case 'Vista reportes':
          modulos.push({
              path: 'vista_reportes',
              component: Vista_reportesComponent,
              data: {
                  title: 'Reporte de Docente'
              }
          });
          break;
      case 'Ficha unica asignacion':
          modulos.push({
              path: 'ficha_unica_asignacion',
              component: FichaUnicaAsignacionComponent,
              data: {
                  title: 'Ficha Unica de Asignacion'
              }
          });
          break;
      case 'Convenios':
          modulos.push({
              path: 'convenios',
              component: ConveniosComponent,
              data: {
                  title: 'Convenios'
              }
          });
          break;
      case 'Periodos':
          modulos.push({
              path: 'periodos',
              component: PeriodosComponent,
              data: {
                  title: 'Periodos'
              }
          });
          break;
      case 'Periodos reportes':
          modulos.push({
              path: 'periodos_reportes',
              component: Periodos_reportesComponent,
              data: {
                  title: 'Periodos reportes'
              }
          });
          break;
      case 'Calificacion alumno':
          modulos.push({
              path: 'calificacion_alumno',
              component: Calificacion_alumnoComponent,
              data: {
                  title: 'Calificacion alumno'
              }
          });
          break;
      case 'Habilitar residentes':
          modulos.push({
              path: 'habilitar_residentes',
              component: Habilitar_residentesComponent,
              data: {
                  title: 'Habilitar residentes'
              }
          });
          break;
      case 'Reporte asesor externo':
          modulos.push({
              path: 'reporte_asesor_externo',
              component: Reporte_asesor_externoComponent,
              data: {
                  title: 'Reporte parcial'
              }
          });
          break;
      case 'Vista documentacion':
          modulos.push({
              path: 'vista_documentacion',
              component: Vista_documentacionComponent,
              data: {
                  title: 'Vista documentacion'
              }
          });
          break;
      case 'Banco estadistica':
          modulos.push({
              path: 'banco_estadistica',
              component: Banco_estadisticaComponent,
              data: {
                  title: 'Estadisticas'
              }
          });
          break;
      case 'Estadisticas reportes':
          modulos.push({
              path: 'estadisticas_reportes',
              component: Estadisticas_reportesComponent,
              data: {
                  title: 'Estadisticas'
              }
          });
          break;
      case 'Informe tecnico':
          modulos.push({
              path: 'informe_tecnico',
              component: Informe_tecnicoComponent,
              data: {
                  title: 'Informe Técnico'
              }
          });
          break;
      case 'Generar convenios':
          modulos.push({
              path: 'generar_convenios',
              component: Generar_conveniosComponent,
              data: {
                  title: 'Generación de convenios'
              }
          });
          break;
      case 'Configuracion acta':
          modulos.push({
              path: 'configuracion_acta',
              component: Configuracion_actaComponent,
              data: {
                  title: 'Configuración'
              }
          });
          break;
      case 'Informacion residencias':
          modulos.push({
              path: 'informacion_residencias',
              component: Informacion_residenciasComponent,
              data: {
                  title: 'Información residencias'
              }
          });
          break;
  }
}


const routes: Routes = rutas;


export const rutas2 = rutas;


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidenciasRoutingModule {}
