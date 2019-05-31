import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../services/jarwis.service';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.scss']
})
export class CronogramaComponent implements OnInit {
  error = [];
  asesor = [];
  registrosPagina = 2;
  pageActual: number = 1;
  select1 = 'active';
  select2 = null;
  select3 = null;
  select4 = null;

  periodo = '20191'
  public form = {
    name: null,
    destinatario: null,
    suscribe: null,
    estudiante: null,
    control: null,
    carrera: null,
    actividad: null,
    desempeno: null,
    valor: null,
    periodo: null,
    extiende: null,
    nombre1: null,
    cargo1: null,
    nombre2: null,
    cargo2: null,

    //SERVICIO
    oficio: null,
    asunto: null,
    director: null,
    atencion: null,
    prestador: null,
    carreraSer: null,
    controlSer: null,
    periodoSer: null,
    caracter: null,
    diasmes: null,
    atentamente: null




  }

  constructor(
    private Jarwis: JarwisService
  ) {
  }

  ngOnInit() {
    this.Jarwis.getAsesores().subscribe(
      data => {
        for (var num in data) {
          this.asesor.push(data[num]);

        }
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
        this.registrosPagina = this.asesor.length; this.select1 = ''; this.select2 = ''; this.select3 = ''; this.select4 = 'active';
        break;
    }
  }

  datos(a,b,c,d,e){
    this.form.estudiante = b+' '+c+' '+a;
    this.form.carrera = d;
    this.form.control = e;

  }

  toNumber(){
    this.Jarwis.getAsesoresPeriodo(this.periodo).subscribe(
      data => {
        this.asesor = [];
        for (var num in data) {
          this.asesor.push(data[num]);

        }
      },
      error => this.handleError(error)
    );
  }
  generarExcel() {
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();

    var ase = [[
      'NOMBRE',
      'NUMERO CONTROL',
      'CARRERA',
      'MATERIA',
      'DIA',
      'HORA',
      'CAMPUS',
      'ESPACIO',
      'PERIODO',
    ]];

    for (var i = 0; i < this.asesor.length; i++) {
      ase.push([
        this.asesor[i].name + " " + this.asesor[i].PRIMER_APELLIDO + " " + this.asesor[i].SEGUNDO_APELLIDO,
        this.asesor[i].NUMERO_CONTROL,
        this.asesor[i].CLAVE_CARRERA,
        this.asesor[i].MATERIA,
        this.asesor[i].DIA,
        this.asesor[i].HORA,
        this.asesor[i].CAMPUS,
        this.asesor[i].ESPACIO,
        this.asesor[i].PERIODO, 
      ]);
    }

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Ref " + y + "-" + m + "-" + d,
      Subject: "LISTA_ASESORES",
      Author: "Tecnologico de leon",
      CreatedDate: new Date(2017, 12, 19)
    };

    wb.SheetNames.push("Ref " + y + "-" + m + "-" + d);
    var ws_data = ase;
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Ref " + y + "-" + m + "-" + d] = ws;
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }

    XLSX.writeFile(wb, 'LISTA_ASESORES' + y + "-" + m + "-" + d + '.xlsx');
  }

  handleError(error) {
    this.error = error.error.error;
  }
}