import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../services/jarwis.service';
import { ValidarModuloService } from '../../../services/validarModulo.service';



@Component({
  selector: 'app-generalidades',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.scss'],
  providers: [ValidarModuloService]
})
export class AsignacionComponent implements OnInit {

  //tabla
  registrosPagina = 10;
  pageActual: number = 1;
  select1 = 'active';
  select2 = null;
  select3 = null;
  select4 = null;


  public mostrarModulo = false;
  visindividual = false;
  visgrupal = false;
  visacademica = false;
  asesores = [];
  solicitudes = [];
  materias = [];
  clave = [];
  horasgrupo = [];
  public error = [];
  public data = [];
  reprobados = [];
  reprobadas = [];
  horario = new Array('7:00-8:40', '8:45-10:25', '10:30-12:10', '12:15-13:55', '14:05-15:45', '15:50-17:30', '17:35-19:15', '19:20-21:00');
  clavegrupo = '0';

  public form = {
    selectasesor: '0',
    selectsolicitante: '0',
    dia: '0',
    hora: '0',
    selectmateria: '0',
    campus: '0',
    espacio: '0',
    horagrupo: '0',
    diagrupo: '0',
    diagru: 0,
    selectmateriagrupo: '0',
    campusgrupo: '0',
    espaciogrupo: '0',
    selectasesorgrupo: '0',
    clavegrupo: '0',
    validaIndividual: null,
    validaSituacion: null,

    //situacion
    selectreprobado:'0',
    clavemateriasituacion : '0',
    asesorsituacion: '0',
    diasituacion: '0',
    horasituacion: '0',
    campussituacion: '0',
    espaciosituacion: '0',

  };

  registroInd() {
    this.Jarwis.asignaIndividual(this.form).subscribe(
      data => {
        alert('ASESORIA REGISTRADA CORRECTAMENTE')
      },
      error => this.handleError(error)
    );
  }

  constructor(private Jarwis: JarwisService,
    private validarModuloService: ValidarModuloService) {
  }

  individual() {
    this.visindividual = !this.visindividual;
  }

  grupal() {
    this.visgrupal = !this.visgrupal;

  }

  academica() {
    this.visacademica = !this.visacademica;
  }

  ngOnInit() {
    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Asignación");
    if (!this.mostrarModulo) {
      return;
    }
    this.Jarwis.obtenerAsesorAsigna().subscribe(
      data => {
        for (var num in data) {
          this.asesores.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
    this.Jarwis.obtenerSolicitudAsigna().subscribe(
      data => {
        for (var num in data) {
          this.solicitudes.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
    this.Jarwis.allMaterias().subscribe(
      data => {
        for (var num in data) {
          this.materias.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
    this.Jarwis.claveGrupo().subscribe(
      data => {
        for (var num in data) {
          this.clave.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
    this.Jarwis.getReprobados().subscribe(
      data => {
        for (var num in data) {
          this.reprobados.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
  }

  addclave() {
    this.Jarwis.addclave(this.form.clavegrupo).subscribe(
      data => {
        for (var num in data) {
          this.horasgrupo.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
  }

  mostrar() {

  }

  diagrupo() {
    if (this.form.diagru == 1) {
      this.form.diagrupo = 'Lunes'
      console.log(this.form.diagrupo)

    } if (this.form.diagru == 2) {
      this.form.diagrupo = 'Martes'
      console.log(this.form.diagrupo)

    } if (this.form.diagru == 3) {
      this.form.diagrupo = 'Miercoles'
      console.log(this.form.diagrupo)

    } if (this.form.diagru == 4) {
      this.form.diagrupo = 'Jueves'
    } if (this.form.diagru == 5) {
      this.form.diagrupo = 'Viernes'
    }
  }

  registroGrupal() {
    this.Jarwis.asignaGrupal(this.form).subscribe(
      data => {
        alert('ASESORIA REGISTRADA CORRECTAMENTE')
      },
      error => this.handleError(error)
    );
    console.log('asesor: ' + this.form.selectasesorgrupo + 'clave: ' + this.form.clavegrupo + 'DIA: ' + this.form.diagrupo +
      'HORA' + this.form.horagrupo + 'Materia: ' + this.form.selectmateriagrupo + 'CAMPUS: ' + this.form.campusgrupo + 'ESPACIO: ' + this.form.espaciogrupo)
  }



  obtenerMaterias(){
    this.Jarwis.getMateriasReprobadas(this.form.selectreprobado).subscribe(
      data => {
        this.reprobadas = [];
        for (var num in data) {
          this.reprobadas.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
  }

  checaHorario(){
    this.Jarwis.getMateriasRecursando(this.form.clavemateriasituacion,this.form.selectreprobado).subscribe(
    data => {
      this.reprobadas = [];
      alert('El alumno esta tomando la materia en el periodo actual')
      for (var num in data) {
          this.reprobadas.push(data[num]);
        }
      },
      error => {
        this.handleError(error)
      alert('El alumno no esta tomando la materia en el periodo actual')
        
      }
    );
  }

/*   registroSituacion(){
    this.Jarwis.asignaSituacion(this.form).subscribe(
      data => {
        alert('Asesoria registrada')
        },
        error => {
          this.handleError(error)
        }
      );

  } */

  mostrarRegistros(numRegistros) {
    switch (numRegistros) {
      case "2":
        this.registrosPagina = 2; this.select1 = 'active'; this.select2 = ''; this.select3 = ''; this.select4 = '';
        break;
      case "5":
        this.registrosPagina = 5; this.select1 = ''; this.select2 = 'active'; this.select3 = ''; this.select4 = '';
        break;
      case "10":
        this.registrosPagina = 10; this.select1 = ''; this.select2 = ''; this.select3 = 'active'; this.select4 = '';
        break;
      case "todos":
        this.registrosPagina = this.reprobados.length; this.select1 = ''; this.select2 = ''; this.select3 = ''; this.select4 = 'active';
        break;
    }
  }

  validaIndividual(a){
    this.form.validaIndividual = a

  }
  validaSituacion(a){
    this.form.validaSituacion = a
  }
  

  handleError(error) {
    this.error = error.error.error;
  }
}