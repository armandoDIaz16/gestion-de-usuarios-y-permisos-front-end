import { Injectable } from '@angular/core';


@Injectable()
export class ValidarModuloService {
  mostrarModulo: any;
  constructor(){}
  getMostrarModulo(modulo){
    if (sessionStorage.rutas) {
      var modulos = [];
      let rutas = JSON.parse(sessionStorage.rutas);
      for (var key in rutas[0].children) {  
        modulos.push(rutas[0].children[key].name);
      }

      this.mostrarModulo = modulos.find(function(element) {
        if(element==modulo){
          return true;
        }else{
          return false;
        }
      });
      if(this.mostrarModulo == undefined){
        return false;
      } else {
        return true;
      }      
    }    
  }
}