import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioComponent } from './formulario/formulario.component';
import { AdministradorComponent } from './administrador/formulario.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatriculaComponent } from './matricula/matricula.component';
import { ReimpresiónComponent } from './reimpresión/reimpresión.component';
import { ReferenciaComponent } from './referencia/referencia.component';
import { MatriculadosComponent } from './matriculados/matriculados.component';
import { VigenciaDePagosComponent } from './vigencia_de_pagos/vigencia_de_pagos.component';
import { GruposComponent } from './grupos/grupos.component';
import { PagoSinFormalizarComponent } from './pago_sin_formalizar/pago_sin_formalizar.component';
import { SinPagoRegistradoComponent } from './sin_pago_registrado/sin_pago_registrado.component';
import { ReporteCompletoComponent } from './reporte_completo/reporte_completo.component';
import { AceptadosComponent } from './aceptados/aceptados.component';
import { PeriodoComponent } from './periodo/periodo.component';

var rutas = [];


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
    case 'Matricula':
      modulos.push({
        path: 'matricula',
        component: MatriculaComponent,
        data: {
          title: 'Matricula'
        }
      });
      break;
    case 'Reimpresión':
      modulos.push({
        path: 'reimpresión',
        component: ReimpresiónComponent,
        data: {
          title: 'Reimpresión'
        }
      });
      break;
    case 'Referencia':
      modulos.push({
        path: 'referencia',
        component: ReferenciaComponent,
        data: {
          title: 'Referencia'
        }
      });
      break;
    case 'Matriculados':
      modulos.push({
        path: 'matriculados',
        component: MatriculadosComponent,
        data: {
          title: 'Matriculados'
        }
      });
      break;
    case 'Formulario':
      modulos.push({
        path: 'formulario',
        component: FormularioComponent,
        data: {
          title: 'Formulario'
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
    case 'Vigencia de pagos':
      modulos.push({
        path: 'vigencia_de_pagos',
        component: VigenciaDePagosComponent,
        data: {
          title: 'Vigencia de pagos'
        }
      });
      break;
    case 'Grupos':
      modulos.push({
        path: 'grupos',
        component: GruposComponent,
        data: {
          title: 'Grupos'
        }
      });
      break;
    case 'Pago sin formalizar':
      modulos.push({
        path: 'pago_sin_formalizar',
        component: PagoSinFormalizarComponent,
        data: {
          title: 'Pago sin formalizar'
        }
      });
      break;
    case 'Sin pago registrado':
      modulos.push({
        path: 'sin_pago_registrado',
        component: SinPagoRegistradoComponent,
        data: {
          title: 'Sin pago registrado'
        }
      });
      break;
    case 'Reporte completo':
      modulos.push({
        path: 'reporte_completo',
        component: ReporteCompletoComponent,
        data: {
          title: 'Reporte completo'
        }
      });
      break;
    case 'Aceptados':
      modulos.push({
        path: 'aceptados',
        component: AceptadosComponent,
        data: {
          title: 'Aceptados'
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
