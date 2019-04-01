import { Component, OnInit } from '@angular/core';
import { UsuarioRolesService } from '../../services/usuraio-roles.service';

let rutas = [];
let usuarioSistemasLista = [];

@Component({
  selector: 'app-navbar-sistems',
  templateUrl: './navbar-sistems.component.html',
  styleUrls: ['./navbar-sistems.component.scss'],
  providers: [UsuarioRolesService]
})

export class NavbarSistemsComponent implements OnInit {



  constructor(private usuarioRolesService: UsuarioRolesService) { }

  ngOnInit() {
   
    /*let sistemas = JSON.parse(sessionStorage.sistemas);
    for(var sistema in sistemas[0].SISTEMAS){
      this.usuarioSistemasLista.push({
        PK_SISTEMA: sistemas[0].SISTEMAS[sistema].PK_SISTEMA,
        NOMBRE: sistemas[0].SISTEMAS[sistema].NOMBRE
      });
    }     */
  }


  mostrarRoles(sistemaSelect){
    sessionStorage.setItem('sistema',sistemaSelect);


let sistemas = JSON.parse(sessionStorage.rutas);
for(var sistema in sistemas[0].SISTEMAS){
  if(sistemas[0].SISTEMAS[sistema].PK_SISTEMA==sessionStorage.getItem('sistema')){
    console.log("--"+sistemas[0].SISTEMAS[sistema].NOMBRE)
  for(var rol in sistemas[0].SISTEMAS[sistema].ROLES){
    var rutasModulos = [];
    console.log("----"+sistemas[0].SISTEMAS[sistema].ROLES[rol].NOMBRE)
    for(var modulo in sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS){
      console.log("------"+sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE)
      rutasModulos.push({name: sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE,
                      url: '/'+sistemas[0].SISTEMAS[sistema].NOMBRE.toLowerCase()+'/'+sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE.toLowerCase(), 
                      icon: 'icon-cursor'});
    }
    rutasRoles.push({name: sistemas[0].SISTEMAS[sistema].ROLES[rol].NOMBRE, 
                    icon: 'icon-screen-desktop', 
                    children: rutasModulos});  
  }
}
}
  }
}

function showSystem(rutas){
  console.log(rutas)
  let sistemas = rutas;
  for(var sistema in sistemas[0].SISTEMAS){
    usuarioSistemasLista.push({
      PK_SISTEMA: sistemas[0].SISTEMAS[sistema].PK_SISTEMA,
      NOMBRE: sistemas[0].SISTEMAS[sistema].NOMBRE
    });
  }    
  console.log(usuarioSistemasLista)
}
export const rutasRoles = rutas;
export {showSystem}
