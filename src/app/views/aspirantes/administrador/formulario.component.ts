import { Component, OnInit } from '@angular/core';
import { EstadoCivilService } from './estado-civil.service';
import { DependenciaService } from './dependencia.service';
import { PropagandaTecnologicoService } from './propaganda-tecnologico.service';
import { IncapacidadService } from './incapacidad.service';
import { CarreraService } from './carrera.service';
import { EntidadFederativaService } from './entidad-federativa.service';
import { CiudadService } from './ciudad.service';
import { UsuarioRolesService } from '../../../services/usuraio-roles.service';
import { asElementData } from '@angular/core/src/view';

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
              UsuarioRolesService
            ]
})
export class AdministradorComponent implements OnInit {

  public altas = 6;
  public estadoCivilLista = [];
  public dependenciaLista = [];
  public propagandaTecnologicoLista = [];
  public incapacidadLista = [];
  public carreraLista = [];
  public entidadFederativaLista = [];
  public ciudadLista = [];
  public usuarioRolesLista = [];

  constructor(private estadoCivilService: EstadoCivilService,
              private dependenciaService: DependenciaService,
              private propagandaTecnologicoService: PropagandaTecnologicoService,
              private incapacidadService: IncapacidadService,
              private carreraService: CarreraService,
              private entidadFederativaService: EntidadFederativaService,
              private ciudadService: CiudadService,
              private usuarioRolesService: UsuarioRolesService
              ) {
  }

  ngOnInit() {
    this.estadoCivilService.getEstadoCivil().subscribe(data => this.estadoCivilLista = data);
    this.dependenciaService.getDependencia().subscribe(data => this.dependenciaLista = data);
    this.propagandaTecnologicoService.getPropagandaTecnologico().subscribe(data => this.propagandaTecnologicoLista = data);
    this.incapacidadService.getIncapacidad().subscribe(data => this.incapacidadLista = data);
    this.carreraService.getCarrera().subscribe(data => this.carreraLista = data);
    this.entidadFederativaService.getEntidadFederativa().subscribe(data => this.entidadFederativaLista = data);
    // this.usuarioRolesService.getUsuarioRoles().subscribe(data => this.usuarioRolesLista = data);
    this.usuarioRolesService.getUsuarioRoles().subscribe(data => {
      sessionStorage.permisos = JSON.stringify(data);
    });
    //this.entidadFederativaService.getEntidadFederativa().subscribe(data => {console.log(data[0]['NOMBRE'])});
    //console.log(this.usuarioRolesLista[0]['USUARIO']);
    //console.log(this.entidadFederativaLista['members'][1]['powers'][2]);
   }

  opcionEntidadFederativa: string = '0'; // Iniciamos
  verSeleccion: string = '';

  capturar() {
    localStorage.setItem("opcionEntidadFederativa", this.opcionEntidadFederativa);
    this.ciudadService.getCiudad().subscribe(data => this.ciudadLista = data);
  }


  trackByPeople(index: number, person: any) {
      return person.id;
  }

  verificarRoles(){
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
}
