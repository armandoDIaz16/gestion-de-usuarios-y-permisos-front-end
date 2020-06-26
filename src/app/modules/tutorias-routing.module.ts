import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UsuariosTutoriasComponent} from '../components/tutorias/usuarios_tutorias.component';
import {EncuestasComponent} from '../components/tutorias/estudiante/encuestas.component';
import {ResponderEncuestaComponent} from '../components/tutorias/responder-encuesta.component';
import {DetalleGrupoAdministradorComponent} from '../components/tutorias/grupos_inicial_detalle/detalle-grupo-administrador.component';
import {DatosAlumnoComponent} from '../components/tutorias/datos-alumno.component';
import {CitasAlumnoComponent} from '../components/tutorias/citas-alumno.component';
import {CanalizacionesAlumnoComponent} from '../components/tutorias/canalizaciones-alumno.component';
import {HorarioAlumnoComponent} from '../components/tutorias/horario_alumno/horario-alumno.component';
import {RespuestasEncuestaComponent} from '../components/tutorias/respuestas-encuesta.component';
import {CoordinadoresInstitucionalesComponent} from '../components/tutorias/coordinadores-institucionales.component';
import {CoordinadoresDepartamentalesComponent} from '../components/tutorias/coord_institucional/coordinadores-departamentales.component';
import {DatosTutorComponent} from '../components/tutorias/estudiante/datos-tutor.component';
import {HorarioComponent} from '../components/tutorias/estudiante/horario.component';
import {SeguimientoComponent} from '../components/tutorias/estudiante/seguimiento.component';
import {DashboardComponent} from '../components/tutorias/dashboard.component';
import {HistoricoGruposComponent} from '../components/tutorias/tutor/historico-grupos.component';
import {ConferenciasComponent} from '../components/tutorias/coord_institucional/conferencias.component';
import {AplicacionEncuestaComponent} from '../components/tutorias/coord_institucional/aplicacion-encuesta.component';
import {ReporteEncuestaAlumnoComponent} from '../components/tutorias/estudiante/reporte-encuesta.component';
import {GruposTutoriasSiiaComponent} from '../components/tutorias/coord_institucional/grupos-tutorias-siia.component';
import {GruposSeguimientoAdminComponent} from '../components/tutorias/coord_institucional/grupos-seguimiento-admin.component';
import {DetalleGrupoSegAdminComponent} from '../components/tutorias/coord_institucional/detalle-grupo-seg-admin.component';
import {InvitacionConferenciasComponent} from '../components/tutorias/coord_institucional/invitacion-conferencias.component';
import {GestionGrupoSeguimientoComponent} from '../components/tutorias/grupos_seguimiento/gestion-grupo-seguimiento.component';
import {GruposAdministradorComponent} from '../components/tutorias/grupos_inicial/grupos-administrador.component';
import {GruposInstitucionalComponent} from '../components/tutorias/grupos_inicial/grupos-institucional.component';
import {GruposDepartamentalComponent} from '../components/tutorias/grupos_inicial/grupos-departamental.component';
import {GruposTutorComponent} from '../components/tutorias/grupos_inicial/grupos-tutor.component';
import {EncuestasAdministradorComponent} from '../components/tutorias/encuestas_alumno/encuestas-administrador.component';
import {ReporteEncuestaAdministradorComponent} from '../components/tutorias/encuestas_alumno_reporte/reporte-encuesta-administrador.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Sistema Integral de Tutorías'
        },
        children: [
            /* ************************************* *
             * ********** MODULOS DE ALUMNOS ********* *
             * ************************************* */
            {
                path: '6da5b4309f3cc102b3a2b7ac7e52a62c', // encuestas_alumno
                component: EncuestasComponent,
                data: {
                    title: 'Encuestas'
                }
            },
            {
                path: '745651e29c6bb18baf4a1118fa8a0fc5', // responder_encuesta
                component: ResponderEncuestaComponent,
                data: {
                    title: 'Responder encuesta'
                }
            },
            {
                path: 'd41ac8705ff2bfef62c749c4928edb98', // reporte_encuesta_alumno
                component: ReporteEncuestaAlumnoComponent,
                data: {
                    title: 'Reporte de encuesta'
                }
            },
            {
                path: '93f61aa8ec5dd9a7c456f3fcab126e81', // datos_tutor
                component: DatosTutorComponent,
                data: {
                    title: 'Datos de tutor'
                }
            },
            {
                path: '019598bbc4a553858bb03f4d26d4e772', // horario
                component: HorarioComponent,
                data: {
                    title: 'Mi horario'
                }
            },
            {
                path: 'ace6a2029397fd5f164842ac293223e5', // seguimiento_academico
                component: SeguimientoComponent,
                data: {
                    title: 'Seguimiento académico'
                }
            },









            /* ************************************* *
             * ********** RUTAS DE DASHBOARD ********* *
             * ************************************* */
            {
                path: 'dc7161be3dbf2250c8954e560cc35060', // dashboard
                component: DashboardComponent,
                data: {
                    title: 'Dashboard'
                }
            },









            /* ************************************* *
             * ********** RUTAS DE GRUPOS INICIAL ********* *
             * ************************************* */
            {
                path: '356d6ac93fda8326cb1a6e79322b4204', // grupos_inicial_administrador
                component: GruposAdministradorComponent,
                data: {
                    title: 'Grupos'
                }
            },
            {
                path: '0ce76a3a2b5f68a249b6e4d20218a32c', // grupos_inicial_institucional
                component: GruposInstitucionalComponent,
                data: {
                    title: 'Ver grupos'
                }
            },
            {
                path: '1ccad2e5e9fc7f9c0be6bca26297f3e4', // grupos_inicial_departamental
                component: GruposDepartamentalComponent,
                data: {
                    title: 'Ver grupos'
                }
            },
            {
                path: '518d564f7dd83337c97ec6d4535832f4', // grupos_inicial_tutor
                component: GruposTutorComponent,
                data: {
                    title: 'Ver grupos'
                }
            },







            /* ************************************* *
             * ********** RUTAS DE DETALLE DE GRUPOS INICIAL ********* *
             * ************************************* */
            {
                path: '0c6199c35bb10e33ef730883a483dbb7', // detalle_grupo_administrador
                component: DetalleGrupoAdministradorComponent,
                data: {
                    title: 'Ver grupo'
                }
            },
            {
                path: '8f15ac9b679bca1571f27fb7ec20ecce', // horario-alumno
                component: HorarioAlumnoComponent,
                data: {
                    title: 'Horario de estudiante'
                }
            },
            {
                path: 'ae5e8aad886494179a1caaca506c192a', // datos-alumno
                component: DatosAlumnoComponent,
                data: {
                    title: 'Datos estudiante'
                }
            },
            {
                path: '7cb70e1b1cc26baefc65581481ff2c05', // ver-encuestas
                component: EncuestasAdministradorComponent, // encuestas de alumno desde admin
                data: {
                    title: 'Encuestas estudiante'
                }
            },
            {
                path: '278ceea6e50746dc7430cd184f165a36', // respuestas_encuesta
                component: RespuestasEncuestaComponent,
                data: {
                    title: 'Respuesta de encuesta'
                }
            },




            /* ************************************* *
             * ********** RUTAS DE REPORTES ********* *
             * ************************************* */
            {
                path: '7383ffd1d6afaba4f5bc0e01c2c636c0', // reporte_encuesta_admin
                component: ReporteEncuestaAdministradorComponent,
                data: {
                    title: 'Reportes de encuestas'
                }
            },






            /* ********************************************* *
             * ********** RUTAS DE MODULO USUARIOS ********* *
             * ********************************************* */
            {
                path: '03f996214fba4a1d05a68b18fece8e71', // usuarios
                component: UsuariosTutoriasComponent,
                data: {
                    title: 'Usuarios'
                }
            },



            /* ********************************************* *
             * ********** RUTAS DE ADMONISTRACIÓN DE COORDINADORES INSTITUCIONALES ********* *
             * ********************************************* */
            {
                path: '04d7c71890c0ce2aa848a97808dc2210', // coordinadores_institucionales
                component: CoordinadoresInstitucionalesComponent,
                data: {
                    title: 'Coordinadores institucionales'
                }
            },




            /* ********************************************* *
             * ********** RUTAS DE ADMONISTRACIÓN DE COORDINADORES DEPARTAMENTALES ********* *
             * ********************************************* */
            {
                path: '7c3bbdec167c62a1e132960c3ddf4330', // coordinadores_departamentales
                component: CoordinadoresDepartamentalesComponent,
                data: {
                    title: 'Coordinadores departamentales'
                }
            },




            /* ********************************************* *
             * ********** RUTAS DE VER GRUPOS SIIA ********* *
             * ********************************************* */
            {
                path: 'def20b9bf5392cc89bc5f2b27ce3c4b7', // grupos_tutorias_siia
                component: GruposTutoriasSiiaComponent,
                data: {
                    title: 'Grupos SIIA'
                }
            },




            /* ********************************************* *
             * ********** RUTAS DE CONFERENCIAS ********* *
             * ********************************************* */
            {
                path: '2a107d6270125877f8ff8c3a223501c2', // conferencias_administrador
                component: ConferenciasComponent,
                data: {
                    title: 'Administración de jornadas/conferencias'
                }
            },
            {
                path: 'fb7da0f7e284eaab3b5e96338ba01c63', // invitacion_conferencias
                component: InvitacionConferenciasComponent,
                data: {
                    title: 'Invitación a jornadas/conferencias'
                }
            },




            /* ********************************************* *
             * ********** RUTAS DE APLICACIÓN DE ENCUESTAS ********* *
             * ********************************************* */
            {
                path: '6379bf06fff30085e5b7fb72dcdb01ca', // aplicacion_encuesta
                component: AplicacionEncuestaComponent,
                data: {
                    title: 'Aplicación de encuestas'
                }
            },




            /* ********************************************* *
             * ********** RUTAS DE GRUPOS DE SEGUIMIENTO ********* *
             * ********************************************* */
            {
                path: '45df774b0e447feee7fc7ecc8fad8e5d', // grupos_seguimiento_admin
                component: GruposSeguimientoAdminComponent,
                data: {
                    title: 'Grupos de seguimiento'
                }
            },
            {
                path: '5d41d6d4aca9197eccb66426b1269af9', // detalle_grupo_seguimiento_admin
                component: DetalleGrupoSegAdminComponent, // para administrar alumnos del grupo
                data: {
                    title: 'Alumnos de grupo'
                }
            },
            {
                path: 'f98d2d1d9fc67e21fec2f46abb87023b', // gestion_grupo_seguimiento_admin
                component: GestionGrupoSeguimientoComponent, // para ver citas, canalizaciones, etc.
                data: {
                    title: 'Accion tutorial de grupo'
                }
            },



            /* ************************************* *
             * ********** RUTAS PENDIENTES ********* *
             * ************************************* */
            {
                path: 'e150022cbe6813b2d7efe161c9641e93', // historico_grupos_tutor
                component: HistoricoGruposComponent,
                data: {
                    title: 'Ver histórico de grupos'
                }
            },

            /*
            {
                path: 'grupos',
                component: GruposBaseComponent,
                data: {
                    title: 'Ver grupos'
                }
            },*/
            {
                path: 'citas-alumno',
                component: CitasAlumnoComponent,
                data: {
                    title: 'Citas estudiante'
                }
            },
            {
                path: 'canalizaciones-alumno',
                component: CanalizacionesAlumnoComponent,
                data: {
                    title: 'Canalizaciones estudiante'
                }
            },
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TutoriasRoutingModule {
}
