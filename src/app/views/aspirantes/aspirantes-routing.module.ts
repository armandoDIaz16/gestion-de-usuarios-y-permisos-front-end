import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioComponent } from './formulario/formulario.component';
import { AdministradorComponent } from './administrador/formulario.component';

var rutas=[];


if(sessionStorage.rutas){
    let sistemas = JSON.parse(sessionStorage.sistemas);
    rutas=[];
    for(var sistema in sistemas[0].SISTEMAS){
      if(sistemas[0].SISTEMAS[sistema].PK_SISTEMA==sessionStorage.getItem('sistema')){
        //console.log("--"+sistemas[0].SISTEMAS[sistema].NOMBRE)
        for(var rol in sistemas[0].SISTEMAS[sistema].ROLES){
          var modulos=[];
          //console.log("----"+sistemas[0].SISTEMAS[sistema].ROLES[rol].NOMBRE)
          for(var modulo in sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS){
            var roles=[]
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

function agregarModulos(modulo){
  if(modulo=='Formulario'){
  modulos.push({
    path: 'formulario',
    component: FormularioComponent,
    data: {
      title: 'Formulario'
    }
  });
}
if(modulo=='Administrador'){
  modulos.push({
    path: 'administrador',
    component: AdministradorComponent,
    data: {
    title: 'Administrador'
  }
  });
}

}

const routes: Routes = rutas;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AspirantesRoutingModule {}

 







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