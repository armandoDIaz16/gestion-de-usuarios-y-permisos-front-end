import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JarwisService } from '../../services/jarwis.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuarioRolesService } from '../../services/usuraio-roles.service';
//import { navItems } from './../../_nav';
//import {showSystem} from '../../components/navbar-sistems/navbar-sistems.component';

let rutasSistema = []

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  providers: [UsuarioRolesService]
})
export class LoginComponent implements OnInit{

  //public navItems;
  public form = {
    curp: null,
    password: null
  };
  
  public error = null;
  public usuarioRolesLista = [];
  public data = null;



  constructor(private Jarwis: JarwisService,
    private Token : TokenService,
    private router : Router,
    private Auth : AuthService,
    private usuarioRolesService: UsuarioRolesService

    ) {  }

  onSubmit() {
    this.Jarwis.login(this.form).subscribe(
      data =>  this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data){
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    sessionStorage.setItem('IdUsuario',data.IdUsuario)
    //
    //let sistemas;
    
     this.usuarioRolesService.getUsuarioRoles().subscribe(data => {
     sessionStorage['sistemas'] = JSON.stringify(data);
     /* sessionStorage['rutas'] = JSON.stringify(data);
     if(sessionStorage.getItem('rutas')){
       let sistemas = JSON.parse(sessionStorage.rutas);
     for(var sistema in sistemas[0].SISTEMAS){
       var rutasRoles = [];
       //console.log("--"+sistemas[0].SISTEMAS[sistema].NOMBRE)
       for(var rol in sistemas[0].SISTEMAS[sistema].ROLES){
         var rutasModulos = [];
         //console.log("----"+sistemas[0].SISTEMAS[sistema].ROLES[rol].NOMBRE)
         for(var modulo in sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS){
           //console.log("------"+sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE)
           rutasModulos.push({name: sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE,
                           url: '/'+sistemas[0].SISTEMAS[sistema].NOMBRE+'/'+sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE, 
                           icon: 'icon-cursor'});
         }
         rutasRoles.push({name: sistemas[0].SISTEMAS[sistema].ROLES[rol].NOMBRE, 
                         icon: 'icon-screen-desktop', 
                         children: rutasModulos});  
       }
       rutasSistemas.push({name: sistemas[0].SISTEMAS[sistema].NOMBRE, 
                           url: '/'+sistemas[0].SISTEMAS[sistema].NOMBRE, 
                           icon: 'icon-star', 
                           children: rutasRoles});
       }
     } */

    
     this.router.navigateByUrl('/home');
   }); 
    
  }

  handleError(error){
    this.error= error.error.error;
  }
  ngOnInit() {
    
}
 }

 export const rutasSistemas = rutasSistema;
 