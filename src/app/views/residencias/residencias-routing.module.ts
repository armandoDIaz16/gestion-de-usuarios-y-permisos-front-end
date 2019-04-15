import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BancoProyectosComponent } from './banco_proyectos/banco_proyectos.component';
import { DocumentacionComponent } from './documentacion/documentacion.component';
import {CorreosComponent} from './correos/correos.component';
import {Banco_vistaComponent} from './banco_vista/banco_vista.component';
import {Banco_seleccionComponent} from './banco_seleccion/banco_seleccion.component';

var rutas=[];


if(sessionStorage.rutas){
  let sistemas = JSON.parse(sessionStorage.sistemas);
  rutas=[];
  for(var sistema in sistemas[0].SISTEMAS){
    if(sistemas[0].SISTEMAS[sistema].PK_SISTEMA==sessionStorage.getItem('sistema')){
      var modulos=[];
      //console.log("--"+sistemas[0].SISTEMAS[sistema].NOMBRE)
      for(var rol in sistemas[0].SISTEMAS[sistema].ROLES){
        //console.log("----"+sistemas[0].SISTEMAS[sistema].ROLES[rol].NOMBRE)
        for(var modulo in sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS){
          //console.log("------"+sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE)
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

function agregarModulos(modulo){
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
  }
}


const routes: Routes = rutas;



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidenciasRoutingModule {}
