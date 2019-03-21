import { Component, OnInit } from '@angular/core';
import { EstadoCivilService } from './estado-civil.service';
import { DependenciaService } from './dependencia.service';
import { PropagandaTecnologicoService } from './propaganda-tecnologico.service';
import { IncapacidadService } from './incapacidad.service';
import { CarreraService } from './carrera.service';
import { EntidadFederativaService } from './entidad-federativa.service';
import { CiudadService } from './ciudad.service';

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
              CiudadService]
})
export class FormularioComponent implements OnInit {

  public estadoCivilLista = [];
  public dependenciaLista = [];
  public propagandaTecnologicoLista = [];
  public incapacidadLista = [];
  public carreraLista = [];
  public entidadFederativaLista = [];
  public ciudadLista = [];

  constructor(private estadoCivilService: EstadoCivilService,
              private dependenciaService: DependenciaService,
              private propagandaTecnologicoService: PropagandaTecnologicoService,              
              private incapacidadService: IncapacidadService,
              private carreraService: CarreraService,
              private entidadFederativaService: EntidadFederativaService,
              private ciudadService: CiudadService) {
  }

  ngOnInit() {
    this.estadoCivilService.getEstadoCivil().subscribe(data => this.estadoCivilLista = data);
    this.dependenciaService.getDependencia().subscribe(data => this.dependenciaLista = data);
    this.propagandaTecnologicoService.getPropagandaTecnologico().subscribe(data => this.propagandaTecnologicoLista = data);
    this.incapacidadService.getIncapacidad().subscribe(data => this.incapacidadLista = data);
    this.carreraService.getCarrera().subscribe(data => this.carreraLista = data);
    this.entidadFederativaService.getEntidadFederativa().subscribe(data => this.entidadFederativaLista = data);
   }

  opcionEntidadFederativa: string  = '0'; // Iniciamos
  verSeleccion: string        = '';

  capturar() {
    localStorage.setItem("opcionEntidadFederativa", this.opcionEntidadFederativa);
    this.ciudadService.getCiudad().subscribe(data => this.ciudadLista = data);
  }
}
