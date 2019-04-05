import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProponerCursoComponent } from './proponer_curso/proponer_curso.component';


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
          title: 'Capacitacion docente'
        },
        children: modulos
      });
    }
  }
}

function agregarModulos(modulo){
  switch (modulo) {
    case 'Proponer curso':
      modulos.push({
        path: 'proponer_curso',
        component: ProponerCursoComponent,
        data: {
          title: 'Proponer curso'
        }
      });
      break;
    case 'Documentacion':
      modulos.push({
        path: 'documentacion',
        component: '',
        data: {
          title: 'Documentacion'
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
export class CapacitacionRoutingModule {}
