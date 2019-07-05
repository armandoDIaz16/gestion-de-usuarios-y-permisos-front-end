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
import {Estadisticas_asesoresComponent} from './estadisticas_asesores/estadisticas_asesores.component';
import {Vista_de_documentacionComponent} from './vista_de_documentacion/vista_de_documentacion.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Residencias'
        },
        children: [
            {
                path: 'banco_proyectos',
                component: BancoProyectosComponent,
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
            },
            {
                path: 'correos',
                component: CorreosComponent,
                data: {
                    title: 'Correos'
                }
            },
            {
                path: 'banco_vista',
                component: Banco_vistaComponent,
                data: {
                    title: 'Banco'
                }
            },
            {
                path: 'banco_seleccion',
                component: Banco_seleccionComponent,
                data: {
                    title: 'Banco'
                }
            },
            {
                path: 'proyectos',
                component: ProyectosComponent,
                data: {
                    title: 'Proyecto'
                }
            },
            {
                path: 'banco_edicion',
                component: BancoEdicionComponent,
                data: {
                    title: 'Edición'
                }
            },
            {
                path: 'banco_aprobacion',
                component: BancoAprobacionComponent,
                data: {
                    title: 'Aprobar'
                }
            },
            {
                path: 'maestros',
                component: MaestrosComponent,
                data: {
                    title: 'Asignacion de docentes'
                }
            },
            {
                path: 'reporte_vista',
                component: ReporteVistaComponent,
                data: {
                    title: 'Vista de reportes'
                }
            },
            {
                path: 'vista_comentarios',
                component: VistaComentariosComponent,
                data: {
                    title: 'Comentarios reporte'
                }
            },
            {
                path: 'reporte_docente',
                component: Reporte_docenteComponent,
                data: {
                    title: 'Reporte'
                }
            },
            {
                path: 'vista_reportes',
                component: Vista_reportesComponent,
                data: {
                    title: 'Reporte de Docente'
                }
            },
            {
                path: 'ficha_unica_asignacion',
                component: FichaUnicaAsignacionComponent,
                data: {
                    title: 'Ficha Unica de Asignacion'
                }
            },
            {
                path: 'convenios',
                component: ConveniosComponent,
                data: {
                    title: 'Convenios'
                }
            },
            {
                path: 'periodos',
                component: PeriodosComponent,
                data: {
                    title: 'Periodos'
                }
            },
            {
                path: 'periodos_reportes',
                component: Periodos_reportesComponent,
                data: {
                    title: 'Periodos reportes'
                }
            },
            {
                path: 'calificacion_alumno',
                component: Calificacion_alumnoComponent,
                data: {
                    title: 'Calificacion alumno'
                }
            },
            {
                path: 'habilitar_residentes',
                component: Habilitar_residentesComponent,
                data: {
                    title: 'Habilitar residentes'
                }
            },
            {
                path: 'reporte_asesor_externo',
                component: Reporte_asesor_externoComponent,
                data: {
                    title: 'Reporte parcial'
                }
            },
            {
                path: 'vista_documentacion',
                component: Vista_documentacionComponent,
                data: {
                    title: 'Vista documentacion'
                }
            },
            {
                path: 'banco_estadistica',
                component: Banco_estadisticaComponent,
                data: {
                    title: 'Estadisticas'
                }
            },
            {
                path: 'estadisticas_reportes',
                component: Estadisticas_reportesComponent,
                data: {
                    title: 'Estadisticas'
                }
            },
            {
                path: 'informe_tecnico',
                component: Informe_tecnicoComponent,
                data: {
                    title: 'Informe Técnico'
                }
            },
            {
                path: 'generar_convenios',
                component: Generar_conveniosComponent,
                data: {
                    title: 'Generación de convenios'
                }
            },
            {
                path: 'configuracion_acta',
                component: Configuracion_actaComponent,
                data: {
                    title: 'Configuración'
                }
            },
            {
                path: 'informacion_residencias',
                component: Informacion_residenciasComponent,
                data: {
                    title: 'Información residencias'
                }
            },
            {
                path: 'estadisticas_asesores',
                component: Estadisticas_asesoresComponent,
                data: {
                    title: 'Estadisticas asesores'
                }
            },
            {
                path: 'vista_de_documentacion',
                component: Vista_de_documentacionComponent,
                data: {
                    title: 'Vista documentacion'
                }
            }
        ]
    }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidenciasRoutingModule {}
