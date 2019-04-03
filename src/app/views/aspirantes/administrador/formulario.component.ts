import { Component, OnInit } from '@angular/core';
import { EstadoCivilService } from './estado-civil.service';
import { DependenciaService } from './dependencia.service';
import { PropagandaTecnologicoService } from './propaganda-tecnologico.service';
import { IncapacidadService } from './incapacidad.service';
import { CarreraService } from './carrera.service';
import { EntidadFederativaService } from './entidad-federativa.service';
import { CiudadService } from './ciudad.service';
import { UsuarioRolesService } from '../../../services/usuraio-roles.service';
import { SistemaPermisosService } from '../../../services/sistema-permisos.service';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  providers: [EstadoCivilService,
              DependenciaService,
              PropagandaTecnologicoService,
              IncapacidadService,
              CarreraService,
              EntidadFederativaService,
              CiudadService,
              UsuarioRolesService,
              SistemaPermisosService
            ]
})
export class AdministradorComponent implements OnInit {

  public altas=6;
  public estadoCivilLista = [];
  public dependenciaLista = [];
  public propagandaTecnologicoLista = [];
  public incapacidadLista = [];
  public carreraLista = [];
  public entidadFederativaLista = [];
  public ciudadLista = [];
  public usuarioRolesLista = [];
  //public altas= boolean;

  constructor(private estadoCivilService: EstadoCivilService,
              private dependenciaService: DependenciaService,
              private propagandaTecnologicoService: PropagandaTecnologicoService,              
              private incapacidadService: IncapacidadService,
              private carreraService: CarreraService,
              private entidadFederativaService: EntidadFederativaService,
              private ciudadService: CiudadService,
              private usuarioRolesService: UsuarioRolesService,
              private sistemaPermisosService: SistemaPermisosService

              ) {
  }

  ngOnInit() {
    this.estadoCivilService.getEstadoCivil().subscribe(data => this.estadoCivilLista = data);
    this.dependenciaService.getDependencia().subscribe(data => this.dependenciaLista = data);
    this.propagandaTecnologicoService.getPropagandaTecnologico().subscribe(data => this.propagandaTecnologicoLista = data);
    this.incapacidadService.getIncapacidad().subscribe(data => this.incapacidadLista = data);
    this.carreraService.getCarrera().subscribe(data => this.carreraLista = data);
    this.entidadFederativaService.getEntidadFederativa().subscribe(data => this.entidadFederativaLista = data);
    this.usuarioRolesService.getUsuarioRoles().subscribe(data => {
      sessionStorage.usuarioPermisos = JSON.stringify(data);      
    });

    this.sistemaPermisosService.getPermisosSistemas().subscribe(data => {
      sessionStorage.sistemaPermisos = JSON.stringify(data);      
    });
    
    

    
    //comparasion permisos usuario sistema
    this.validarPermisos();
    //altas = true;
   }

  opcionEntidadFederativa: string  = '0'; // Iniciamos
  verSeleccion: string        = '';

  capturar() {
    localStorage.setItem("opcionEntidadFederativa", this.opcionEntidadFederativa);
    this.ciudadService.getCiudad().subscribe(data => this.ciudadLista = data);
  }


  trackByPeople(index: number, person: any) {
      return person.id;
  }

  validarPermisos(){

    









    //this.obtenerPermisos();
    /*
    for (var i = 0; i < this.usuarioRolesLista.length; i++){
      if (this.usuarioRolesLista[i].FK_ROL == this.rol){
        var visible = true;
      }       
    }
    if(visible){
      return true;
    }else{
      return false;
    }*/
  }

  obtenerPermisos(){
    var rutasRoles = [];
    this.usuarioRolesService.getUsuarioRoles().subscribe(data => {
      let sistemas = JSON.parse(sessionStorage.sistemas);
      for(var sistema in sistemas[0].SISTEMAS){
        if(sistemas[0].SISTEMAS[sistema].PK_SISTEMA==sessionStorage.getItem('sistema')){
          console.log("--"+sistemas[0].SISTEMAS[sistema].NOMBRE)
          for(var rol in sistemas[0].SISTEMAS[sistema].ROLES){
            var rutasModulos = [];
            console.log("----"+sistemas[0].SISTEMAS[sistema].ROLES[rol].NOMBRE)
            for(var modulo in sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS){
              console.log("------"+sistemas[0].SISTEMAS[sistema].ROLES[rol].MODULOS[modulo].NOMBRE)
            }
          }
        }
      }
      sessionStorage['rutas'] = JSON.stringify(rutasRoles);
    });          
    //console.log(sessionStorage.rutas); 
    //this.navItems=recargarRutas();
    //console.log(this.navItems);
    //navItems-rutasRoles;
    //console.log(navItems); 
    //this.router.navigateByUrl('/home');

  } 
}