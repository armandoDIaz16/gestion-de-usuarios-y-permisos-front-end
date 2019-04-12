import { Component, OnInit } from '@angular/core';
import { EstadoCivilService } from './estado-civil.service';
import { DependenciaService } from './dependencia.service';
import { PropagandaTecnologicoService } from './propaganda-tecnologico.service';
import { IncapacidadService } from './incapacidad.service';
import { CarreraService } from './carrera.service';
import { EntidadFederativaService } from './entidad-federativa.service';
import { CiudadService } from './ciudad.service';
import { UniversidadService } from './universidad.service';
import { CarreraUniversidadService } from './carrera-universidad.service';
import { PeriodoService } from '../../services/periodo.service';

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
              PeriodoService,
              UniversidadService,
              CarreraUniversidadService]
})
export class FormularioComponent implements OnInit {
  
  genero=0;
  estadoCivil=0;
  nacioPais=0;
  nacioEntidadFederativa=0;
  nacioCiudad=0;
  especialidad1=0;
  especialidad2=0;
  escuelaEstado=0;
  escuelaMunicio=0;
  escuela=0;
  institucion=0;
  carreraUniversidad=0;
  dependencia=0;
  trabajas=0;
  propaganda=0;

  CURP;
  nombre;
  pApellido;
  sApellido;
  fechaNacimiento;
  calle;
  numExt;
  numInt;
  colonia;
  localidad;
  cp;
  tFijo;
  celular;
  correo;
  correo2;
  nombrePadre;
  nombreMadre;
  ayuda;
  nacionalidad;
  escuelaEspecialidad;
  promedio;

  activado=false;
  fechaInicio=null;
  fechaFin=null;
  fechaActual=null;

  public estadoCivilLista = [];
  public dependenciaLista = [];
  public propagandaTecnologicoLista = [];
  public incapacidadLista = [];
  public carreraLista = [];
  public entidadFederativaLista = [];
  public ciudadLista = [];
  public universidadLista = [];
  public carreraUniversidadLista = [];

  constructor(private estadoCivilService: EstadoCivilService,
              private dependenciaService: DependenciaService,
              private propagandaTecnologicoService: PropagandaTecnologicoService,              
              private incapacidadService: IncapacidadService,
              private carreraService: CarreraService,
              private entidadFederativaService: EntidadFederativaService,
              private ciudadService: CiudadService,
              private periodoService: PeriodoService,
              private universidadService: UniversidadService,
              private carreraUniversidadService: CarreraUniversidadService) {
  }

  ngOnInit() {
    this.periodoService.getPeriodo().subscribe(data => {
      this.fechaInicio=data[0].FECHA_INICIO;
      this.fechaFin=data[0].FECHA_FIN;
      this.fechaActual=data[0].FECHA_ACTUAL;
      this.compararFechas();     
    });

    this.estadoCivilService.getEstadoCivil().subscribe(data => this.estadoCivilLista = data);
    this.dependenciaService.getDependencia().subscribe(data => this.dependenciaLista = data);
    this.propagandaTecnologicoService.getPropagandaTecnologico().subscribe(data => this.propagandaTecnologicoLista = data);
    this.incapacidadService.getIncapacidad().subscribe(data => this.incapacidadLista = data);
    this.carreraService.getCarrera().subscribe(data => this.carreraLista = data);
    this.entidadFederativaService.getEntidadFederativa().subscribe(data => this.entidadFederativaLista = data);
    this.universidadService.getUniversidad().subscribe(data => this.universidadLista = data);
    this.carreraUniversidadService.getCarreraUniversidad().subscribe(data => this.carreraUniversidadLista = data);

  }

  compararFechas(){ 
    var fechaInicio=this.fechaInicio.split('-');
    var fechaFin=this.fechaFin.split('-');
    var fechaActual=this.fechaActual.split('-');
    var fechaInicio2=new Date(fechaInicio[0],(fechaInicio[1]-1),fechaInicio[2]);
    var fechaFin2=new Date(fechaFin[0],(fechaFin[1]-1),fechaFin[2]);
    var fechaActual2=new Date(fechaActual[0],(fechaActual[1]-1),fechaActual[2]);
    if(fechaActual2>=fechaInicio2 && fechaActual2<=fechaFin2 )
    {    
      //console.log('La fecha esta en el rango');
      this.activado=true;     
    }else{
      //console.log('La fecha no esta en el rango');
    }
  }

  cargarCiudades() {
    //localStorage.setItem("nacioEntidadFederativa", this.nacioEntidadFederativa);
    this.ciudadService.getCiudad(this.nacioEntidadFederativa).subscribe(data => this.ciudadLista = data);
  }

  onSubmit(){
  }
}
