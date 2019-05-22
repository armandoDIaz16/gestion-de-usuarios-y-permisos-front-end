import { Component, OnInit } from '@angular/core';
import { PeriodoService } from '../../../services/periodo.service';
import { AspiranteService } from '../../../services/aspirante.service';
import { CarreraService } from '../../../services/carrera.service';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-prefichas',
  templateUrl: './prefichas.component.html',
  styleUrls: ['./prefichas.component.scss'],
  providers: [PeriodoService, CarreraService, AspiranteService]
})
export class PrefichasComponent implements OnInit {
  constructor(private periodoService: PeriodoService,
    private carreraService: CarreraService,
    private aspiranteService: AspiranteService) {
  }

  public carreraLista = [];
  public aspirante = [];
  telefonoCasa = null;
  telefonoMovil = null;
  email = null;
  especialidad1 = null;
  especialidad2 = null;
  CURP = null;



  public estatus = [];
  public carreras = [];
  public aspirantes = [];
  public aspirantes2 = [];
  public periodo = null;
  filtroPREFICHA = null;
  filtroCURP = null;
  filtroNOMBRE = null;
  filtroPRIMER_APELLIDO = null;
  filtroSEGUNDO_APELLIDO = null;
  filtroCORREO = null;
  filtroTELEFONO_CASA = null;
  filtroTELEFONO_MOVIL = null;
  filtroCARRERA1 = "todas";
  filtroCARRERA2 = "todas";
  filtroESTATUS = "todos";

  select1 = 'active';
  select2 = null;
  select3 = null;
  select4 = null;
  registrosPagina = 2;
  pageActual: number = 1;
  //pkPeriodo=null;

  ngOnInit() {
    this.periodoService.getPeriodo().subscribe(data => {
      //this.pkPeriodo = data[0].PK_PERIODO_PREFICHAS;
      //console.log(this.pkPeriodo);
      this.periodo= data[0].PK_PERIODO_PREFICHAS;     
      this.obtenerAspirantes(data[0].PK_PERIODO_PREFICHAS);
    });

    this.aspiranteService.getEstatus().subscribe(data => this.estatus = data);
    this.carreraService.getCarrera().subscribe(data => {
      this.carreras = data;
      this.carreraLista = data;
    });
  }

  obtenerAspirantes(pk_periodo) {
    //console.log(pk_periodo);
    this.aspiranteService.getAspirantes(pk_periodo).subscribe(data => {
      this.aspirantes = data;
      this.aspirantes2 = data;
    });
  }


  buscar() {
    this.aspirantes = this.aspirantes2;
    if (this.filtroPREFICHA) {
      var re = new RegExp(this.filtroPREFICHA, 'g');
      this.aspirantes = this.aspirantes2.filter(item => item.PREFICHA.match(re));
    }
    if (this.filtroCURP) {
      var re = new RegExp(this.filtroCURP, 'g');
      this.aspirantes = this.aspirantes.filter(item => item.CURP.match(re));
    }
    if (this.filtroNOMBRE) {
      var re = new RegExp(this.filtroNOMBRE, 'g');
      this.aspirantes = this.aspirantes.filter(item => item.NOMBRE.match(re));
    }
    if (this.filtroPRIMER_APELLIDO) {
      var re = new RegExp(this.filtroPRIMER_APELLIDO, 'g');
      this.aspirantes = this.aspirantes.filter(item => item.PRIMER_APELLIDO.match(re));
    }
    if (this.filtroSEGUNDO_APELLIDO) {
      var re = new RegExp(this.filtroSEGUNDO_APELLIDO, 'g');
      this.aspirantes = this.aspirantes.filter(item => item.SEGUNDO_APELLIDO.match(re));
    }
    if (this.filtroCORREO) {
      var re = new RegExp(this.filtroCORREO, 'g');
      this.aspirantes = this.aspirantes.filter(item => item.CORREO.match(re));
    }
    if (this.filtroTELEFONO_CASA) {
      var re = new RegExp(this.filtroTELEFONO_CASA, 'g');
      this.aspirantes = this.aspirantes.filter(item => item.TELEFONO_CASA.match(re));
    }
    if (this.filtroTELEFONO_MOVIL) {
      var re = new RegExp(this.filtroTELEFONO_MOVIL, 'g');
      this.aspirantes = this.aspirantes.filter(item => item.TELEFONO_MOVIL.match(re));
    }
    if (this.filtroCARRERA1) {
      if (this.filtroCARRERA1 == "todas") {
        this.aspirantes = this.aspirantes;
      } else {
        this.aspirantes = this.aspirantes.filter(item => item.CARRERA1 === this.filtroCARRERA1);
      }
    }

    if (this.filtroCARRERA2) {
      if (this.filtroCARRERA2 == "todas") {
        this.aspirantes = this.aspirantes;
      } else {
        this.aspirantes = this.aspirantes.filter(item => item.CARRERA2 === this.filtroCARRERA2);
      }
    }

    if (this.filtroESTATUS) {
      if (this.filtroESTATUS == "todos") {
        this.aspirantes = this.aspirantes;
      } else {
        this.aspirantes = this.aspirantes.filter(item => item.ESTATUS === this.filtroESTATUS);
      }
    }
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
        this.registrosPagina = this.aspirantes2.length; this.select1 = ''; this.select2 = ''; this.select3 = ''; this.select4 = 'active';
        break;
    }
  }

  cargarAspirante(pk_usuario){
    this.aspiranteService.getEditAspirante(pk_usuario).subscribe(data => {
      this.aspirante = data;
      this.aspirante[0].FECHA_REGISTRO = this.aspirante[0].FECHA_REGISTRO.split('-')[0];
      switch(Number(this.aspirante[0].SEXO)){
        case 1: this.aspirante[0].SEXO="Masculino";
        break;
        case 2: this.aspirante[0].SEXO="Femenino";
        break;
      }
      this.telefonoCasa = this.aspirante[0].TELEFONO_CASA;
      this.telefonoMovil = this.aspirante[0].TELEFONO_MOVIL;
      this.email = this.aspirante[0].email;
      this.especialidad1 = this.aspirante[0].FK_CARRERA_1;
      this.especialidad2 = this.aspirante[0].FK_CARRERA_2;
      this.CURP = this.aspirante[0].CURP;

    });    
  }

  modificarAspirante(){
    this.aspiranteService.updateAspirante(
      {
        "CURP": this.CURP,
        "TELEFONO_CASA": this.telefonoCasa,
        "TELEFONO_MOVIL": this.telefonoMovil,
        "email": this.email,
        "FK_CARRERA_1": this.especialidad1,
        "FK_CARRERA_2": this.especialidad2
      });
      
      this.obtenerAspirantes(this.periodo);
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
      console.log((XLSX.utils.sheet_to_json(ws, {header: 1})));
    };
    reader.readAsBinaryString(target.files[0]);  
  } 
  
   processFiles(evt: any) {
         var archivo = evt.target.files[0];
    if (!archivo) {
      return;
    }
    var lector = new FileReader();
    lector.onload = function(e: any) {
      var datos = e.target.result.split("\n");
      var registros = [];
      for(var i = 0; i < datos.length; i++){
        if (!isNaN(datos[i].substr(0,7)) && datos[i].substr(0,7) != "") {
          if(datos[i].substr(98,4)>0){
            registros.push([datos[i].substr(0,7),datos[i].substr(37,20),datos[i].substr(42,4),datos[i].substr(98,4),"CRED","Fecha pago"+datos[i].substr(130,10),"Fecha limite"+datos[i].substr(140,10)]);
          //console.log([datos[i].substr(0,7),datos[i].substr(37,20),datos[i].substr(42,4),datos[i].substr(98,4),"CRED","Fecha pago"+datos[i].substr(130,10),"Fecha limite"+datos[i].substr(140,10)]);
          }else{
            //console.log([datos[i].substr(0,7),datos[i].substr(37,20),datos[i].substr(42,4),datos[i].substr(82,4),"EFE","Fecha pago"+datos[i].substr(130,10),"Fecha limite"+datos[i].substr(140,10)]);
            registros.push([datos[i].substr(0,7),datos[i].substr(37,20),datos[i].substr(42,4),datos[i].substr(82,4),"EFE","Fecha pago"+datos[i].substr(130,10),"Fecha limite"+datos[i].substr(140,10)]);
          }
      } else {
        console.log("No es un registro");
      } 
      }
      //this.aspiranteService.addAspirante();

      //console.log(JSON.parse(JSON.stringify(registros)));
    };    lector.readAsText(archivo);

    
}
  }
