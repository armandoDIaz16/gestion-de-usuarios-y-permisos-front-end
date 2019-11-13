import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LineamientosComponent } from './lineamientos.component';
import { LineamientosFormComponent } from './lineamientosForm.component';
import { GestionActividadesComponent } from './gestionActividades.component';
import { GestionActividadesFormComponent } from './gestion-actividades-form.component'; 
import { ActividadesComponent } from './actividades.component'; 
import { DetalleActividadComponent} from './detalleActividad.component';
import { SeguimientoAlumnoComponent } from './seguimientoAlumno.component';
import { ActividadesResponsableComponent } from './actividadesResponsable.component';
import { ListaAsistenciaResponsableComponent } from './listaAsistenciaResponsable.component';
import { AsistentesResponsableComponent } from './asistentesResponsable.component';
import { ActividadesAsistenteComponent } from './actividadesAsistente.component';
import { RegistroAsistenciasComponent } from './registroAsistencias.component';
import { CreditosPorValidarComponent } from './creditosPorValidar.component';
import { CreditosValidadosComponent } from './creditosValidados.component';
import { DetalleActividadAdminComponent } from './detalleActividadAdmin.component';
import { UsuariosComiteAcademicoFormComponent } from './usuariosComiteAcademico-Form.component';
import { registroAdministrativosComponent } from './registroAdministrativos.component';
import { UsuarioJefeCarreraComponent } from './usuarioJefeCarrera-form.component';
import { UsuarioResponsableActFormComponent} from './usuarioResponsableAct-form.component';
import { SubirRegistrosCreditosComponent } from './subirRegistrosCreditos.component';
import { UsuariosTutoriasExtraescolaresComponent } from './usuariosTutoriasExtraescolares.component';
import { GenerarConstanciasComponent } from './generarConstancias.component';


const routes: Routes = [
  {
        path: '',
        data: {
          title: 'Creditos'
        },
        children: [
        {
          path: 'lineamientosform',
          component: LineamientosFormComponent,
          data: {
            title: 'Lineamientos'
          }
        },
        {
        path: 'gestion_de_lineamientos',
        component: LineamientosComponent,
        data: {
        title: 'Lineamientos'
          }   
        },
        {
          path: 'lineamientosform/:id', 
          component: LineamientosFormComponent,
          data: {
            title: 'Lineamientos'
          }
        },
        {
        path: 'detalle-actividad/:id', 
        component: DetalleActividadComponent,  /*agregar componente de actividades*/
        data: {
          title: 'Actividad'
          }
        },
        {
        path: 'gestion-actividades-form',  
        component: GestionActividadesFormComponent,   /*agregar componente de actividades*/
         data: {
          title: 'Gestion de Actividades'
        }
        },
        {
        path: 'gestion-actividades-form/:id', 
        component: GestionActividadesFormComponent,  /*agregar componente de actividades*/
        data: {
          title: 'Gestion de Actividades'
        }
        },
        {
        path: 'gestion_de_actividades',
        component: GestionActividadesComponent,
         data: {
        title: 'Gestion de Actividades'
          }
        },
        {
        path: 'actividades',
        component:  ActividadesComponent,
        data: {
        title: 'Actividades por realizarse'
          }
        },
        {
        path: 'seguimiento_de_actividades',
        component:  SeguimientoAlumnoComponent,
        data: {
          title: 'Seguimiento de actividades'
          }
        },
        {
        path: 'actividades_designadas',
        component:  ActividadesResponsableComponent,
        data: {
        title: 'Actividades designadas'
          } 
        },
        {
        path: 'actividades_designadas_para_asistencia',
        component:  ActividadesAsistenteComponent,
        data: {
        title: 'Actividades designadas'
          } 
        },
        {
        path: 'creditos_por_validar',
        component:  CreditosPorValidarComponent,
        data: {
        title: 'Creditos por validar'
          }
        },
        {
        path: 'creditos_validados',
        component:  CreditosValidadosComponent,
        data: {
        title: 'Creditos validados'
          }
        },
        {                
        path: 'registro_administrativos',
        component:  registroAdministrativosComponent,
        data: {
        title: 'Gestion de usuarios'
          }
        },
        {
        path: 'usuarios_comite_academico',
        component:  UsuariosComiteAcademicoFormComponent,
        data: {
        title: 'Gestion de usuarios'
          }
        },
        {   
        path: 'usuarios_jefes_de_carrera',
        component:  UsuarioJefeCarreraComponent,
        data: {
        title: 'Gestion de usuarios'
          }
        },
        {
        path: 'usuarios_responsables_de_actividad',
        component:  UsuarioResponsableActFormComponent,
        data: {
        title: 'Gestion de usuarios'
          }
        },
        {
        path: 'usuarios_tutorias-extraescolares',
        component:  UsuariosTutoriasExtraescolaresComponent,
        data: {
        title: 'Gestion de usuarios'
          }
        },
        {
        path: 'cargar_registro_actividades',
        component:  SubirRegistrosCreditosComponent,
        data: {
        title: 'Registro de creditos'
          }
        },
        {
        path: 'generar_constancias',
        component:  GenerarConstanciasComponent,
        data: {
        title: 'Constancias por generar'
          }
        },
        {
          path: 'lista-asistencia-res/:id',
          component: ListaAsistenciaResponsableComponent,
          data:{
            title: 'Lista de asistencia'
          }
        },
        {
          path: 'asistentes-res/:id',
          component: AsistentesResponsableComponent,
          data:{
            title: 'Registro de asistencias'
          }
        },
        {
          path: 'registro_asistencias/:id',
          component: RegistroAsistenciasComponent,
          data:{
            title: 'Registro de asistencias'
          }
        },
        {
          path: 'detalle_actividad_adm/:id',
          component: DetalleActividadAdminComponent,
          data:{
            title: "Detalles de actividad"
          }
        }
       ]
     }];
      

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditosRoutingModule {}
