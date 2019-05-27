import { Component, OnInit } from '@angular/core';
import { PeriodoService } from '../../../services/periodo.service';
import { AspiranteService } from '../../../services/aspirante.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.scss'],
  providers: [PeriodoService, AspiranteService]
})
export class ArchivosComponent implements OnInit {

  constructor(private periodoService: PeriodoService,
    private aspiranteService: AspiranteService) {
  }

  public fechaFin = null;
  public fechaInicio = null;
  public periodo = null;
  public aspirantes = [];
  public excelLeerAceptadosCENVEAL=[];
  public excelGeneradoAceptadosCENVEAL=[];

  ngOnInit() {
    var fecha = new Date(); //Fecha actual
    var mes = (fecha.getMonth() + 1).toString();; //obteniendo mes
    var dia = fecha.getDate().toString();; //obteniendo dia
    var año = fecha.getFullYear();

    if (parseInt(dia) < 10) {
      dia = '0' + dia; //agrega cero si el menor de 10
    }
    if (parseInt(mes) < 10) {
      mes = '0' + mes //agrega cero si el menor de 10
    }

    this.fechaFin = "" + año + "-" + mes + "-" + dia + "";
    this.fechaInicio = "" + año + "-" + mes + "-" + dia + "";
    this.periodoService.getPeriodo().subscribe(data => {
            this.periodo = data[0].PK_PERIODO_PREFICHAS;
              });

  }

  enviarPagos(evt: any) {
    var archivo = null;
    archivo = evt.target.files[0];
    if (!archivo) {
      return;
    }
    let formData = new FormData();
    formData.append('myfile', archivo);
    this.aspiranteService.addPagos(formData, this.periodo);
  }

  enviarPreRegistrados(evt: any) {
    var archivo = null;
    archivo = evt.target.files[0];
    if (!archivo) {
      return;
    }
    let formData = new FormData();
    formData.append('myfile', archivo);
    this.aspiranteService.addPreRegistrados(formData, this.periodo);
  }

  enviarRegistrados(evt: any) {
    var archivo = null;
    archivo = evt.target.files[0];
    if (!archivo) {
      return;
    }
    let formData = new FormData();
    formData.append('myfile', archivo);
    this.aspiranteService.addRegistrados(formData, this.periodo);
  }

  enviarAceptados(evt: any) {
    var archivo = null;
    archivo = evt.target.files[0];
    if (!archivo) {
      return;
    }
    let formData = new FormData();
    formData.append('myfile', archivo);
    this.aspiranteService.addAceptados(formData, this.periodo);
  }

  
generarExcel(){
  var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();

    var pagos = [[
      'REFERENCIA_BANCO',
      'IDCONTROL',
      'NOMBRE',
      'CORREO1',
      'MONTO',
      'FECHA_PAGO',
      'TIPO_PAGO',
      'FECHA_REGISTRO',
      'CLAVE',
      'CONCEPTO',
      'CANTIDAD',
      'CLAVE_CONTPAQ',
      'FOLIO',
      'OBSERVACIONES'
    ]];

    for (var i = 0; i < this.aspirantes.length; i++) {
      var fechaTexto = this.aspirantes[i].FECHA_REGISTRO.split('-');
      pagos.push([
        this.aspirantes[i].REFERENCIA_BANCO,
        this.aspirantes[i].PREFICHA,
        this.aspirantes[i].NOMBRE + " " + this.aspirantes[i].PRIMER_APELLIDO + " " + this.aspirantes[i].SEGUNDO_APELLIDO,
        this.aspirantes[i].CORREO,
        1600,
        this.aspirantes[i].FECHA_PAGO,
        this.aspirantes[i].TIPO_PAGO,
        fechaTexto[0] + "/" + (fechaTexto[1]) + "/" + fechaTexto[2].substr(0, 2),
        "R004",
        "Ficha para examen de admisión",
        1,
        "A008",
        "",
        ""
      ]);
    }

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Ref " + y + "-" + m + "-" + d,
      Subject: "Pagos",
      Author: "Tecnologico de leon",
      CreatedDate: new Date(2017, 12, 19)
    };

    wb.SheetNames.push("Ref " + y + "-" + m + "-" + d);
    var ws_data = pagos;
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Ref " + y + "-" + m + "-" + d] = ws;
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
    var nombreArchivo = "";
    if(this.fechaInicio == this.fechaFin){
      nombreArchivo = "Ref "+this.fechaInicio+".xlsx";
    }else{
      nombreArchivo = "Ref "+this.fechaInicio+" - "+this.fechaFin+".xlsx";
    }
    XLSX.writeFile(wb, nombreArchivo);
}

leerDatosParaExcel() {
    this.aspiranteService.getAspirantes2(this.periodo,this.fechaInicio, this.fechaFin).subscribe(data => {
      this.aspirantes = data;
      if(data){
        this.generarExcel();
      }
    });    
  }
  


  leerExcel(evt: any){     
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.excelLeerAceptadosCENVEAL=(XLSX.utils.sheet_to_json(ws, {header: 0}));

    this.elegirAceptados(target.files[0].name.split('.')[0]);
    };
    reader.readAsBinaryString(target.files[0]);  
  } 

  elegirAceptados(nombreArchivo){    
    for (var i = 0; i < this.excelLeerAceptadosCENVEAL.length; i++) {
      if(this.excelLeerAceptadosCENVEAL[i].DDD_MG_MAT==2){
        this.excelGeneradoAceptadosCENVEAL.push(this.excelLeerAceptadosCENVEAL[i]);    
      }
    }
    this.excelGeneradoAceptadosCENVEAL=this.excelGeneradoAceptadosCENVEAL.sort(function(a, b){return b.ICNE-a.ICNE});
    this.generarExcelAceptadosCENEVAL(nombreArchivo);    
  }

  generarExcelAceptadosCENEVAL(nombreArchivo){  
    var rows = [Object.keys(this.excelGeneradoAceptadosCENVEAL[0])];  

    for (var i = 0; i < this.excelGeneradoAceptadosCENVEAL.length; i++) {
      var row =[]
      for (var key in this.excelGeneradoAceptadosCENVEAL[i]) {
          row.push(this.excelGeneradoAceptadosCENVEAL[i][key])
      }
      rows.push(row);
    }  
      var wb = XLSX.utils.book_new();
      wb.Props = {
        Title: "Resultados",
        Subject: "Resultados",
        Author: "Resultados",
        CreatedDate: new Date(2017, 12, 19)
      };
  
      wb.SheetNames.push("Resultados");
      var ws_data = rows;
      var ws = XLSX.utils.aoa_to_sheet(ws_data);
      wb.Sheets["Resultados"] = ws;
      var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
      function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      }
      XLSX.writeFile(wb, nombreArchivo + ".xlsx");
  }
}    