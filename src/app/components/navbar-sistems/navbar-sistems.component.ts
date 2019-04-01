import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioRolesService } from '../../services/usuraio-roles.service';
//import { navItems } from './../../_nav';

//import { recargarRutas } from '../../containers/default-layout/default-layout.component';

let rutasSistema = [];

@Component({
  selector: 'app-navbar-sistems',
  templateUrl: './navbar-sistems.component.html',
  styleUrls: ['./navbar-sistems.component.scss'],
  providers: [UsuarioRolesService]
})

export class NavbarSistemsComponent implements OnInit {

  public usuarioSistemasLista = [];
  public navItems;

  constructor(private usuarioRolesService: UsuarioRolesService,
    private router: Router) { }

  ngOnInit() {
    this.usuarioRolesService.getUsuarioRoles().subscribe(data => {
      sessionStorage.sistemas = JSON.stringify(data);
    });    
    let sistemas = JSON.parse(sessionStorage.sistemas);
    for(var sistema in sistemas[0].SISTEMAS){
      this.usuarioSistemasLista.push({
        PK_SISTEMA: sistemas[0].SISTEMAS[sistema].PK_SISTEMA,
        NOMBRE: sistemas[0].SISTEMAS[sistema].NOMBRE
      });
    }        
  }

  mostrarRoles(sistemaSelect){
    var rutasRoles = [];
    sessionStorage.setItem('sistema',sistemaSelect);
    this.usuarioRolesService.getUsuarioRoles().subscribe(data => {
      let sistemas = JSON.parse(sessionStorage.sistemas);
      for(var sistema in sistemas[0].SISTEMAS){
        if(sistemas[0].SISTEMAS[sistema].PK_SISTEMA==sessionStorage.getItem('sistema')){
          //console.log("--"+sistemas[0].SISTEMAS[sistema].NOMBRE)
          for(var rol in sistemas[0].SISTEMAS[sistema].ROLES){
            var rutasModulos = [];
            //console.log("----"+sistemas[0].SISTEMAS[sistema].ROLES[rol].NOMBRE)
            for(var modulo in sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS){
              //console.log("------"+sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE)
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
      sessionStorage['rutas'] = JSON.stringify(rutasRoles);
      location.reload();
    });          
    //console.log(sessionStorage.rutas); 
    //this.navItems=recargarRutas();
    //console.log(this.navItems);
    //navItems-rutasRoles;
    //console.log(navItems); 
    //this.router.navigateByUrl('/home');
   // location.reload();
  } 
}
//export const rutasRoles = rutasSistema;
/* function recargarRutas(){
  var rutasRoles=[];
  rutasRoles = JSON.parse(sessionStorage.rutas);
  console.log(rutasRoles);
  return rutasRoles;
}
export { recargarRutas };
 */