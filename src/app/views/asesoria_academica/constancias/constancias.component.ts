import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../services/jarwis.service';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-constancias',
  templateUrl: './constancias.component.html',
  styleUrls: ['./constancias.component.scss']
})
export class ConstanciasComponent implements OnInit {
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
    this.Jarwis.asesorFinal().subscribe(
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

  complementaria() {
  //  window.open('http://localhost:8000/api/PdfComplementaria','this.form')
  /*   alert('peeee')
    this.form.name = a;*/
    this.Jarwis.complementaria(this.form.destinatario,this.form.suscribe,this.form.estudiante,this.form.control,this.form.carrera,
      this.form.actividad,this.form.desempeno,this.form.valor,this.form.periodo,this.form.extiende,this.form.nombre1,this.form.cargo1,
      this.form.nombre2,this.form.cargo2); 
  }

  servicio(){
    this.Jarwis.servicio(this.form.oficio,this.form.asunto,this.form.director,this.form.atencion,this.form.prestador,
      this.form.carreraSer,this.form.controlSer,this.form.periodoSer,this.form.caracter,this.form.diasmes,this.form.atentamente); 
  }

  toNumber(){
    this.Jarwis.asesorFinalPeriodo(this.periodo).subscribe(
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
      'CARRERA',
      'PERIODO',
      'VALIDA',
    ]];

    for (var i = 0; i < this.asesor.length; i++) {
      ase.push([
        this.asesor[i].name + " " + this.asesor[i].PRIMER_APELLIDO + " " + this.asesor[i].SEGUNDO_APELLIDO,
        this.asesor[i].CLAVE_CARRERA,
        this.asesor[i].PERIODO,
        this.asesor[i].VALIDA
      ]);
    }

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Ref " + y + "-" + m + "-" + d,
      Subject: "ASESORES_FINAL",
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

    XLSX.writeFile(wb, 'ASESORES_FINAL' + y + "-" + m + "-" + d + '.xlsx');
  }

  handleError(error) {
    this.error = error.error.error;
  }
}