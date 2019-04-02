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
            if(sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE=='Formulario'){
              modulos.push({
                path: 'formulario',
                component: FormularioComponent,
                data: {
                  title: 'Formulario'
                }
              });
            }
            if(sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE=='Administrador'){
              modulos.push({
                path: 'administrador',
                component: AdministradorComponent,
                data: {
                title: 'Administrador'
              }
              });
            }
          }
          roles.push({
            path: '',
            redirectTo: 'aspirantes'
          })
        }
        rutas.push({ 
          path: '',
          data: { 
            title: 'Aspitantes'
          },
          children: roles.concat(modulos)                              
        });
      }
    }
}


const routes: Routes = rutas;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AspirantesRoutingModule {}

/* [
  {
    path: '',
    data: {
      title: 'Aspirantes'
    },
    children: [
      {
        path: '',
        redirectTo: 'aspirantes'
      },
      {
        path: 'formulario',
        component: FormularioComponent,
        data: {
          title: 'Formulario'
        }
      },
      {
        path: 'administrador',
        component: AdministradorComponent,
        data: {
          title: 'Administrador'
        }
      }
    ]
  }
]; */