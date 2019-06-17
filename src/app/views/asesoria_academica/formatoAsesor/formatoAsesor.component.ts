import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../services/jarwis.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-formatoAsesor',
  templateUrl: './formatoAsesor.component.html',
  styleUrls: ['./formatoAsesor.component.scss']
})
export class FormatoAsesorComponent implements OnInit {
  visindividual = false;
  visgrupal = false;
  visatisfaccion = false;
  visfinal = false;
  public error = [];
  public data = [];


  periodo = '20191';
  periodo1 = '20191';

  asesoria = [];
  asesoria1 = [];
  grupo = [];
  grupo1 = [];
  materias = [];
  docentes = [];
  asesores = [];
  alumnos = [];
  sesiones = [];
  sesiona = [];

  registrosPagina = 2;
  pageActual: number = 1;
  select1 = 'active';
  select2 = null;
  select3 = null;
  select4 = null;

  public form = {
    id: sessionStorage.getItem("IdUsuario"),
    apep: null,
    apem: null,
    email: null,
    celular: null,
    sexo: null,
    edad: '0',
    residencia: null,
    turno: '0',
    materiasAll: '0',
    materias1All: '0',
    maestro: '0',
    maestro1: '0',
    motivo: null,
    asesorSa: '0',
    materiaSa: '0',
    afirmacion: null,

    // sesiones
    materia: '0',
    name: null,
    carrera: null,
    control: null,
    semestre: null,
    sesion: '0',
    fecha: null,
    asistentes: '0',
    horainicio: '0',
    horafinal: '0',
    tema: null,
    actividades: null,
    //

    // lista
    materialis: '0',
    namelis: null,
    carreralis: null,
    controllis: null,
    semestrelis: null,
    fechalis: null,
    fk_user: null,
    asistio: null,
    asistio1: null,
    asistio2: null,

    //

    // final
    materiafin: '0',
    namefin: null,
    carrerafin: null,
    controlfin: null,
    semestrefin: null,
    fechafin: null,
    fechafin1: null,
    fechafin2: null,
    lugar: null,
    asesorados: '0',
    sesionfin: '0',
    sugerenciafin: null,
    //

  };

  constructor(private Jarwis: JarwisService) {
  }

  individual() {

    this.visindividual = !this.visindividual;
    this.visgrupal = false;
    this.visatisfaccion = false;
    this.visfinal = false;

  }

  grupal() {
    this.visgrupal = !this.visgrupal;
    this.visindividual = false;
    this.visatisfaccion = false;
    this.visfinal = false;
  }

  satisfaccion() {
    this.visatisfaccion = !this.visatisfaccion;
    this.visindividual = false;
    this.visgrupal = false;
    this.visfinal = false;
  }

  final() {
    this.visfinal = !this.visfinal;
    this.visindividual = false;
    this.visgrupal = false;
    this.visatisfaccion = false;
  }

  ngOnInit() {
    this.Jarwis.datos(this.form.id).subscribe(
      data => {
        this.form.control = data[0].control
        this.form.name = data[0].name + ' ' + data[0].apep + ' ' + data[0].apem
        this.form.carrera = data[0].carrera
        this.form.email = data[0].email
        this.form.celular = data[0].celular
        this.form.sexo = data[0].sexo
        this.form.semestre = data[0].semestre

        this.form.namelis = data[0].name + ' ' + data[0].apep + ' ' + data[0].apem
        this.form.carreralis = data[0].carrera
        this.form.controllis = data[0].control
        this.form.semestrelis = data[0].semestre

        this.form.namefin = data[0].name + ' ' + data[0].apep + ' ' + data[0].apem
        this.form.carrerafin = data[0].carrera
        this.form.controlfin = data[0].control
        this.form.semestrefin = data[0].semestre
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
    this.Jarwis.docente().subscribe(
      data => {
        for (var num in data) {
          this.docentes.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
    this.Jarwis.asesorSesion(this.form.id).subscribe(
      data => {
        for (var num in data) {
          this.asesores.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
    this.Jarwis.alumnoAsesoriaLista(this.form.id).subscribe(
      data => {
        for (var num in data) {
          this.alumnos.push(data[num]);
        }
        // console.log(this.alumnos.length)
      },
      error => this.handleError(error)
    );
    this.Jarwis.getSesionAsesor(this.form.id).subscribe(
      data => {
        for (var num in data) {
          this.sesiona.push(data[num]);
        }
        // console.log(this.alumnos.length)
      },
      error => this.handleError(error)
    );

  }


  toNumber() {
    this.Jarwis.getAsesoriaPeriodo(this.periodo).subscribe(
      data => {
        this.asesoria = []
        this.asesoria1 = []
        for (var num in data) {
          this.asesoria.push(data[num]);
          this.asesoria1.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
  }

  toNumber1() {
    this.Jarwis.getAsesoriaGrupoPeriodo(this.periodo1).subscribe(
      data => {
        this.grupo = []
        this.grupo1 = []
        for (var num in data) {
          this.grupo.push(data[num]);
          this.grupo1.push(data[num]);
        }


      },
      error => this.handleError(error)
    );
  }

  saveSesion() {
    this.Jarwis.creaSesion(this.form).subscribe(
      data => {
        alert('RESPUESTAS GUARDADAS');
        this.form.materia = '0'
        this.form.name = null
        this.form.carrera = null
        this.form.control = null
        this.form.semestre = null
        this.form.sesion = '0'
        this.form.fecha = null
        this.form.asistentes = '0'
        this.form.horainicio = '0'
        this.form.horafinal = '0'
        this.form.tema = null
        this.form.actividades = null
      },
      error => this.handleError(error)
    );
  }

  cartAsesor() {
    this.Jarwis.compromisoAsesor(this.form).subscribe(
      data => {
        alert('RESPUESTAS GUARDADAS');
      },
      error => this.handleError(error)
    );
  }

  idalumno(a) {
    this.form.asistio = 1;
    this.form.fk_user = a;
    this.Jarwis.creaLista(this.form).subscribe(
      data => {
        alert('ALUMNO PRESENTE');
        this.form.fk_user = null
        this.form.asistio = null
        /*  this.form.asistio1= null
         this.form.asistio2= null */
      },
      error => this.handleError(error)
    );
  }

  idalumno1(a) {
    this.form.asistio = 0;
    this.form.fk_user = a;
    this.Jarwis.creaLista(this.form).subscribe(
      data => {
        alert('ALUMNO AUSENTE');

        this.form.fk_user = null
        this.form.asistio = null
        /*      this.form.asistio1= null
             this.form.asistio2= null */
      },
      error => this.handleError(error)
    );
  }

  lista() {
    this.Jarwis.creaLista(this.form).subscribe(
      data => {
        alert('RESPUESTAS GUARDADAS');
        this.form.materialis = '0'
        this.form.namelis = null
        this.form.carreralis = null
        this.form.controllis = null
        this.form.semestrelis = null
        this.form.fechalis = null
        this.form.fk_user = null
        this.form.asistio = null
        this.form.asistio1 = null
        this.form.asistio2 = null
      },
      error => this.handleError(error)
    );
  }

  traeAlumno() {
    this.Jarwis.alumnoAsesoriaListaMateria(this.form.id, this.form.materialis).subscribe(
      data => {
        this.alumnos = [];
        for (var num in data) {
          this.alumnos.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
  }

  traeSesion() {
    this.Jarwis.obtenerSesion(this.form.id, this.form.materiafin).subscribe(
      data => {
        this.sesiones = []
        for (var num in data) {
          this.sesiones.push(data[num]);
        }
        console.log(data)
      },
      error => this.handleError(error)
    );
    this.Jarwis.alumnoAsesoriaListaMateria(this.form.id, this.form.materiafin).subscribe(
      data => {
        this.alumnos = [];
        for (var num in data) {
          this.alumnos.push(data[num]);
        }
      },
      error => this.handleError(error)
    );
  }


  creaFinal() {
    this.Jarwis.creaFin(this.form).subscribe(
      data => {
        alert('RESPUESTAS GUARDADAS');
      },
      error => this.handleError(error)
    );

  }

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
        this.registrosPagina = this.sesiona.length; this.select1 = ''; this.select2 = ''; this.select3 = ''; this.select4 = 'active';
        break;
    }
  }


  handleError(error) {
    this.error = error.error.error;
  }
}