import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EncuestasComponent} from './encuestas/encuestas.component';
import {AdministradorComponent} from './administrador/administrador.component';
import {ReportesComponent} from './reportes/reportes.component';
import {EncuestaComponent} from './encuesta/encuesta.component';
import {SeccionesComponent} from './secciones/secciones.component';
import {PreguntasComponent} from './preguntas/preguntas.component';
import {AdminCarruselComponent} from './admin-carrusel/admin-carrusel.component';
import {NoticiasCarruselComponent} from './noticias-carrusel/noticias-carrusel.component';
import {AdminUsuariosComponent} from './admin-usuarios/admin-usuarios.component';

var rutas = [];


if (sessionStorage.rutas) {
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
          title: 'Egresados'
        },
        children: modulos
      });
    }
  }
}

function agregarModulos(modulo) {
  switch (modulo) {
    case 'Encuesta':
      modulos.push({
        path: 'encuesta',
        component: EncuestaComponent,
        data: {
          title: 'Encuesta'
        }
      });
      break;
    case 'Administrador':
      modulos.push({
        path: 'administrador',
        component: AdministradorComponent,
        data: {
          title: 'Administrador'
        }
      });
      break;
    case 'Encuestas':
      modulos.push({
        path: 'encuestas',
        component: EncuestasComponent,
        data: {
          title: 'Encuestas'
        }
      });
      break;
    case 'Secciones':
      modulos.push({
        path: 'secciones',
        component: SeccionesComponent,
        data: {
          title: 'Secciones'
        }
      });
      break;
    case 'Preguntas':
      modulos.push({
        path: 'preguntas',
        component: PreguntasComponent,
        data: {
          title: 'Preguntas'
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
    case 'Admin_Carrusel':
      modulos.push({
        path: 'admin_carrusel',
        component: AdminCarruselComponent,
        data: {
          title: 'Admin_Carrusel'
        }
      });
      break;
    case 'Noticias_Carrusel':
      modulos.push({
        path: 'noticias_carrusel',
        component: NoticiasCarruselComponent,
        data: {
          title: 'Noticias_Carrusel'
        }
      });
      break;
    case 'Admin_usuarios':
      modulos.push({
        path: 'admin_usuarios',
        component: AdminUsuariosComponent,
        data: {
          title: 'Usuarios'
        }
      });
  }
}


const routes: Routes = rutas;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EgresadosRoutingModule { }
