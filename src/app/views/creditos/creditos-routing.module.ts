import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*
import { CardsComponent } from './cards.component';
import { FormsComponent } from './forms.component';
import { SwitchesComponent } from './switches.component';
import { TablesComponent } from './tables.component';
import { TabsComponent } from './tabs.component';
import { CarouselsComponent } from './carousels.component';
import { CollapsesComponent } from './collapses.component';
import { PaginationsComponent } from './paginations.component';
import {PopoversComponent} from './popovers.component';
import {ProgressComponent} from './progress.component';
import {TooltipsComponent} from './tooltips.component';
*/
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




import { typeSourceSpan } from '@angular/compiler';

var rutas = [];
var moduloLinForm: Boolean = false;
var moduloDetAct: Boolean = false;
var moduloGestActForm: Boolean = false;
var moduloListAsisRes: Boolean = false;
var moduloAsisRes: boolean = false;
var moduloRegAsis: boolean = false;
//var moduloCreditosPorValidar: boolean = false;
//var moduloCreditosValidados: boolean = false;
var moduloDetalleActividadAdmin: boolean = false;


if (sessionStorage.rutas){
  let sistemas = JSON.parse(sessionStorage.sistemas);
  rutas = [];
  for (var sistema in sistemas[0].SISTEMAS) {
    if (sistemas[0].SISTEMAS[sistema].PK_SISTEMA == sessionStorage.getItem('sistema')) {
      var modulos = [];
      // console.log("--"+sistemas[0].SISTEMAS[sistema].NOMBRE)
      for (var rol in sistemas[0].SISTEMAS[sistema].ROLES) {
        // console.log("----"+sistemas[0].SISTEMAS[sistema].ROLES[rol].NOMBRE)
        for (var modulo in sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS) {
          // console.log("------"+sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE)
          agregarModulos(sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE);
        }
      }
      rutas.push({
        path: '',
        data: {
          title: 'Creditos'
        },
        children: modulos
      });
      if(moduloLinForm){
        rutas.push({
          path: 'lineamientosform',
          component: LineamientosFormComponent,
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
        });
      }
      if(moduloDetAct){
        rutas.push({
        path: 'detalle-actividad/:id', 
        component: DetalleActividadComponent,  /*agregar componente de actividades*/
        data: {
          title: 'Actividad'
          }
        });
      }
      if(moduloGestActForm){
        rutas.push({
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
        });
      }
      if(moduloListAsisRes){
        rutas.push({
          path: 'lista-asistencia-res/:id',
          component: ListaAsistenciaResponsableComponent,
          data:{
            title: 'Lista de asistencia'
          }
        });
      }
      if(moduloAsisRes){
        rutas.push({
          path: 'asistentes-res/:id',
          component: AsistentesResponsableComponent,
          data:{
            title: 'Registro de asistencias'
          }
        });
      }
      if(moduloRegAsis){
        rutas.push({
          path: 'registro_asistencias/:id',
          component: RegistroAsistenciasComponent,
          data:{
            title: 'Registro de asistencias'
          }
        });
      }
      if(moduloDetalleActividadAdmin){
        rutas.push({
          path: 'detalle_actividad_adm/:id',
          component: DetalleActividadAdminComponent,
          data:{
            title: "Detalles de actividad"
          }
        });
      }
      

    }
  }
}

function agregarModulos(modulo){
  switch(modulo){
    case 'Gestion de lineamientos':
    modulos.push({
      path: 'gestion_de_lineamientos',
      component: LineamientosComponent,
      data: {
        title: 'Lineamientos'
      }
    });
    moduloLinForm = true;
    break;
    case 'Gestion de actividades':
    modulos.push({
      path: 'gestion_de_actividades',
      component: GestionActividadesComponent,
      data: {
        title: 'Gestion de Actividades'
      }
    });
    moduloGestActForm = true;
    moduloDetalleActividadAdmin = true;
    break; 
    case 'Actividades':
    modulos.push({
      path: 'actividades',
      component:  ActividadesComponent,
      data: {
        title: 'Actividades por realizarse'
      }
    });
    moduloDetAct = true;
    break;
    case 'Seguimiento de actividades':
    modulos.push({
      path: 'seguimiento_de_actividades',
      component:  SeguimientoAlumnoComponent,
      data: {
        title: 'Seguimiento de actividades'
      }
    });
    break;
    case 'Actividades designadas':
    modulos.push({
      path: 'actividades_designadas',
      component:  ActividadesResponsableComponent,
      data: {
        title: 'Actividades designadas'
      }
    });
    moduloListAsisRes = true;
    moduloAsisRes = true;
    moduloDetalleActividadAdmin = true;
    break;
    case 'Actividades designadas para asistencia':
    modulos.push({
      path: 'actividades_designadas_para_asistencia',
      component:  ActividadesAsistenteComponent,
      data: {
        title: 'Actividades designadas'
      }
    });
    moduloRegAsis = true;
    moduloDetalleActividadAdmin = true;
    break;
    case 'Creditos por validar':
    modulos.push({
      path: 'creditos_por_validar',
      component:  CreditosPorValidarComponent,
      data: {
        title: 'Creditos por validar'
      }
    });
    moduloDetalleActividadAdmin = true;
    break;
    case 'Creditos validados':
    modulos.push({
      path: 'creditos_validados',
      component:  CreditosValidadosComponent,
      data: {
        title: 'Creditos validados'
      }
    });
    moduloDetalleActividadAdmin = true;
    break;
    case 'Registro administrativos':
    modulos.push({
      path: 'registro_administrativos',
      component:  registroAdministrativosComponent,
      data: {
        title: 'Gestion de usuarios'
      }
    });
    break;
    case 'Usuarios comite academico':
    modulos.push({
      path: 'usuarios_comite_academico',
      component:  UsuariosComiteAcademicoFormComponent,
      data: {
        title: 'Gestion de usuarios'
      }
    });
    break;
    case 'Usuarios jefes de carrera':
    modulos.push({
      path: 'usuarios_jefes_de_carrera',
      component:  UsuarioJefeCarreraComponent,
      data: {
        title: 'Gestion de usuarios'
      }
    });
    break;
    case 'Usuarios responsables de actividad':
    modulos.push({
      path: 'usuarios_responsables_de_actividad',
      component:  UsuarioResponsableActFormComponent,
      data: {
        title: 'Gestion de usuarios'
      }
    });
    break; 
    case 'Usuarios tutorias-extraescolares':
    modulos.push({
      path: 'usuarios_tutorias-extraescolares',
      component:  UsuariosTutoriasExtraescolaresComponent,
      data: {
        title: 'Gestion de usuarios'
      }
    });
    break;
    case 'Cargar registro actividades':
    modulos.push({
      path: 'cargar_registro_actividades',
      component:  SubirRegistrosCreditosComponent,
      data: {
        title: 'Registro de creditos'
      }
    });
    break;

  }
}

/* 

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Creditos'
    },
    children: [
      {
        path: '',
        redirectTo: 'lineamientos'
      },
      {
        path: 'lineamientos',
        component: LineamientosComponent,
        data: {
          title: 'Lineamientos'
        }
      },
       {
        path: 'lineamientosform',
        component: LineamientosFormComponent,
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
        path: 'gestion-actividades', 
        component: GestionActividadesComponent,  /*agregar componente de actividades

        data: {
          title: 'Gestion de Actividades'
        }
      },
      {
        path: 'gestion-actividades-form',  
        component: GestionActividadesFormComponent,   /*agregar componente de actividades
         data: {
          title: 'Gestion de Actividades'
        }
      },
      {
        path: 'gestion-actividades-form/:id', 
        component: GestionActividadesFormComponent,  /*agregar componente de actividades
        data: {
          title: 'Gestion de Actividades'
        }
      },
      {
        path: 'actividades', 
        component: ActividadesComponent,  /*agregar componente de actividades
        data: {
          title: 'Actividades por realizarse'
        }
      },
      {
        path: 'detalle-actividad/:id', 
        component: DetalleActividadComponent,  /*agregar componente de actividades
        data: {
          title: 'Actividad'
        }
      }, 
      {
        path: 'seguimiento-alumno', 
        component: SeguimientoAlumnoComponent,  /*agregar componente de actividades
        data: {
          title: 'Seguimiento de actividades'
        }
      } */






      /*
      {
        path: 'cards',
        component: CardsComponent,
        data: {
          title: '2.1'
        }
      },
      {
        path: 'forms',
        component: FormsComponent,
        data: {
          title: 'Forms'
        }
      },
      {
        path: 'switches',
        component: SwitchesComponent,
        data: {
          title: 'Switches'
        }
      },
      {
        path: 'tables',
        component: TablesComponent,
        data: {
          title: 'Tables'
        }
      },
      {
        path: 'tabs',
        component: TabsComponent,
        data: {
          title: 'Tabs'
        }
      },
      {
        path: 'carousels',
        component: CarouselsComponent,
        data: {
          title: 'Carousels'
        }
      },
      {
        path: 'collapses',
        component: CollapsesComponent,
        data: {
          title: 'Collapses'
        }
      },
      {
        path: 'paginations',
        component: PaginationsComponent,
        data: {
          title: 'Pagination'
        }
      },
      {
        path: 'popovers',
        component: PopoversComponent,
        data: {
          title: 'Popover'
        }
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: {
          title: 'Progress'
        }
      },
      {
        path: 'tooltips',
        component: TooltipsComponent,
        data: {
          title: 'Tooltips'
        }
      }*/

const routes: Routes = rutas;
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditosRoutingModule {}
