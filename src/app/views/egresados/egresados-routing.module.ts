import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EncuestaComponent} from './encuesta/encuesta.component';
import {AdministradorComponent} from './administrador/administrador.component';
import {ReportesComponent} from './reportes/reportes.component';

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
    case 'Reportes':
      modulos.push({
        path: 'reportes',
        component: ReportesComponent,
        data: {
          title: 'Reportes'
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
