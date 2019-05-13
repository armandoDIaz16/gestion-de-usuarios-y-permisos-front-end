import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DatosComponent } from './datos/datos.component';
import { GraficasComponent } from './graficas/graficas.component';
import { ArchivosComponent } from './archivos/archivos.component';
import { PrefichasPagadasComponent } from './prefichas_pagadas/prefichas_pagadas.component';
import { ListaGruposComponent } from './lista_grupos/lista_grupos.component';
import { PrefichasComponent } from './prefichas/prefichas.component';
import { PeriodoComponent } from './periodo/periodo.component';
import { CrearGruposComponent } from './crear_grupos/crear_grupos.component';

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
          title: 'Aspitantes'
        },
        children: modulos
      }); 
    }
  }
}

function agregarModulos(modulo) {
  switch (modulo) {
    case 'Dashboard':
      modulos.push({
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Dashboard'
        }
      });
      break;
    case 'Datos':
      modulos.push({
        path: 'datos',
        component: DatosComponent,
        data: {
          title: 'Datos'
        }
      });
      break;
    case 'Prefichas':
      modulos.push({
        path: 'prefichas',
        component: PrefichasComponent,
        data: {
          title: 'Prefichas'
        }
      });
      break;
    case 'Prefichas pagadas':
      modulos.push({
        path: 'prefichas_pagadas',
        component: PrefichasPagadasComponent,
        data: {
          title: 'Prefichas pagadas'
        }
      });
      break;
    case 'Lista grupos':
      modulos.push({
        path: 'lista_grupos',
        component: ListaGruposComponent,
        data: {
          title: 'Lista grupos'
        }
      });
      break;    
    case 'Crear grupos':
      modulos.push({
        path: 'crear_grupos',
        component: CrearGruposComponent,
        data: {
          title: 'Crear grupos'
        }
      });
      break;
    case 'Archivos':
      modulos.push({
        path: 'archivos',
        component: ArchivosComponent,
        data: {
          title: 'Archivos'
        }
      });
      break;
    case 'Graficas':
      modulos.push({
        path: 'graficas',
        component: GraficasComponent,
        data: {
          title: 'Graficas'
        }
      });
      break;
      case 'Periodo':
        modulos.push({
          path: 'periodo',
          component: PeriodoComponent,
          data: {
            title: 'Periodo'
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

export class AspirantesRoutingModule { }









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