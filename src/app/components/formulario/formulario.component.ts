import { Component, OnInit } from '@angular/core';
import { EstadoCivilService } from './estado-civil.service';
import { DependenciaService } from './dependencia.service';
import { PropagandaTecnologicoService } from './propaganda-tecnologico.service'
import { IncapacidadService } from './incapacidad.service'
import { CarreraService } from './carrera.service'

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  providers: [EstadoCivilService,
              DependenciaService,
              PropagandaTecnologicoService,
              IncapacidadService,
              CarreraService]
})
export class FormularioComponent implements OnInit {

  public estadoCivilLista = [];
  public dependenciaLista = [];
  public propagandaTecnologicoLista = [];
  public incapacidadLista = [];
  public carreraLista = [];

  constructor(private estadoCivilService: EstadoCivilService,
              private dependenciaService: DependenciaService,
              private propagandaTecnologicoService: PropagandaTecnologicoService,              
              private incapacidadService: IncapacidadService,
              private carreraService: CarreraService) {
  }

  ngOnInit() {
    this.estadoCivilService.getEstadoCivil().subscribe(data => this.estadoCivilLista = data);
    this.dependenciaService.getDependencia().subscribe(data => this.dependenciaLista = data);
    this.propagandaTecnologicoService.getPropagandaTecnologico().subscribe(data => this.propagandaTecnologicoLista = data);
    this.incapacidadService.getIncapacidad().subscribe(data => this.incapacidadLista = data);
    this.carreraService.getCarrera().subscribe(data => this.carreraLista = data);
  }
}
