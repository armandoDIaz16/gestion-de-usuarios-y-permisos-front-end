import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UsuariosTutoriasComponent} from './usuarios_tutorias/usuarios_tutorias.component';
import {EncuestasComponent} from './encuestas/encuestas.component';
import {VerEncuestasComponent} from './ver-encuestas/ver-encuestas.component';
import {ResponderEncuestaComponent} from './responder-encuesta/responder-encuesta.component';
import {GruposComponent} from './grupos/grupos.component';
import {DetalleGrupoComponent} from './detalle-grupo/detalle-grupo.component';
import {DatosAlumnoComponent} from './datos-alumno/datos-alumno.component';
import {CitasAlumnoComponent} from './citas-alumno/citas-alumno.component';
import {CanalizacionesAlumnoComponent} from './canalizaciones-alumno/canalizaciones-alumno.component';
import {EncuestasAlumnoComponent} from './encuestas-alumno/encuestas-alumno.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Sistema Integral de Tutorías'
        },
        children: [
            {
                path: 'usuarios',
                component: UsuariosTutoriasComponent,
                data: {
                    title: 'Usuarios'
                }
            },
            {
                path: 'encuestas',
                component: EncuestasComponent,
                data: {
                    title: 'Encuestas'
                }
            },
            {
                path: 'responder_encuesta',
                component: ResponderEncuestaComponent,
                data: {
                    title: 'Responder encuesta'
                }
            },
            {
                path: 'grupos',
                component: GruposComponent,
                data: {
                    title: 'Ver grupos'
                }
            },
            {
                path: 'detalle-grupo',
                component: DetalleGrupoComponent,
                data: {
                    title: 'Ver grupo'
                }
            },
            {
                path: 'datos-alumno',
                component: DatosAlumnoComponent,
                data: {
                    title: 'Datos estudiante'
                }
            },
            {
                path: 'ver-encuestas',
                component: EncuestasAlumnoComponent,
                data: {
                    title: 'Encuesta estudiante'
                }
            },
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
            }
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TutoriasRoutingModule {
}
