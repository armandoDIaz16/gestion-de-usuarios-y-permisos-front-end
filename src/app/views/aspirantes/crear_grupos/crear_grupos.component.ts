import { Component, OnInit } from '@angular/core';
import { LugarExamenService } from '../../../services/lugar-examen.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';


@Component({
  selector: 'app-crear_grupos',
  templateUrl: './crear_grupos.component.html',
  styleUrls: ['./crear_grupos.component.scss'],
  providers: [LugarExamenService, ValidarModuloService]
})
export class CrearGruposComponent implements OnInit {

  constructor(private lugarExamenService: LugarExamenService,
    private validarModuloService: ValidarModuloService) {
  }
  public mostrarModulo = false;
  public dia = null;
  public hora = null;
  public edificio = null;
  public tipoEspacio = null;
  public espacio = null;
  public turno2 = null;
  public nombre = null;
  public identificador = null;
  public capacidad = null;
  public edificioLista = [];
  public espacioLista = [];
  public tipoEspacioLista = [];
  public turno2Lista = [];


  ngOnInit() {
    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Crear grupos");
    if (!this.mostrarModulo) {
      return;
    }
    this.lugarExamenService.getEdificio().subscribe(data => this.edificioLista = data);
    this.lugarExamenService.getTurno2().subscribe(data => this.turno2Lista = data);
    this.lugarExamenService.getEspacio().subscribe(data => this.espacioLista = data);
    this.lugarExamenService.getTipoEspacio().subscribe(data => this.tipoEspacioLista = data);
  }

  guardarTurno() {
    this.lugarExamenService.addTurnoExamen({
      "DIA": this.dia,
      "HORA": this.hora
    });
    setTimeout(() => {
      this.recargarEspacioTurno()
    }, 1000);
  }
  guardarEspacio() {
    this.lugarExamenService.addEspacioExamen({
      'FK_EDIFICIO': this.edificio,
      'FK_TIPO_ESPACIO': this.tipoEspacio,
      'NOMBRE': this.nombre,
      'IDENTIFICADOR': this.identificador,
      'CAPACIDAD': this.capacidad
    });
    setTimeout(() => {
      this.recargarEspacioTurno()
    }, 1000);
  }
  guardarGrupo() {
    this.lugarExamenService.addGrupoExamen({
      'FK_ESPACIO': this.espacio,
      'FK_TURNO': this.turno2
    });
  }
  recargarEspacioTurno() {
    this.lugarExamenService.getTurno2().subscribe(data => this.turno2Lista = data);
    this.lugarExamenService.getEspacio().subscribe(data => this.espacioLista = data);
  }
}