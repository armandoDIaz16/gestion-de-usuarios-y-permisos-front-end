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
import { typeSourceSpan } from '@angular/compiler';

var rutas = [];
var moduloLinForm: Boolean = false;
var moduloDetAct: Boolean = false;
var moduloGestActForm: Boolean = false;
var moduloListAsisRes: Boolean = false;
var moduloAsisRes: boolean = false;


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
