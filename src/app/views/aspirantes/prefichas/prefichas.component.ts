import { Component, OnInit, ViewChild } from '@angular/core';
import { PeriodoService } from '../../../services/periodo.service';
import { AspiranteService } from '../../../services/aspirante.service';
import { FormularioService } from '../../../services/formulario.service';
import * as XLSX from 'xlsx';
import { ValidarModuloService } from '../../../services/validarModulo.service';
import { HttpClient } from '@angular/common/http';
import { GenericServicesService } from '../../../services/generic-services.service';



@Component({
  selector: 'app-prefichas',
  templateUrl: './prefichas.component.html',
  styleUrls: ['./prefichas.component.scss'],
  providers: [PeriodoService, FormularioService, AspiranteService, ValidarModuloService]
})
export class PrefichasComponent extends GenericServicesService implements OnInit {
  @ViewChild('loaderModal') loaderModal;
  constructor(private periodoService: PeriodoService,
    private formularioService: FormularioService,
    private aspiranteService: AspiranteService,
    private validarModuloService: ValidarModuloService,
    private http: HttpClient) {
    super(http);
  }


  private baseUrl = GenericServicesService.API_ENDPOINT;
  private baseUrlFile = GenericServicesService.ENDPOINT;
  private headers = GenericServicesService.HEADERS;
  showSpinner: boolean = true;
  public mostrarModulo = false;
  public carreraLista = [];
  public aspirante = [];

  nombre = null;
  primerApellido = null;
  segundoApellido = null;

  telefonoCasa = null;
  telefonoMovil = null;
  CORREO1 = null;
  especialidad1 = null;
  especialidad2 = null;
  CURP = null;

  public habilitarCorreo = true;
  public asunto = "";
  public mensaje = "";


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
  public pkUsuario = null;

  select1 = 'active';
  select2 = null;
  select3 = null;
  select4 = null;
  registrosPagina = 2;
  pageActual: number = 1;
  //pkPeriodo=null;

  ngOnInit() {
    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Prefichas");
    if (!this.mostrarModulo) {
      return;
    }
    this.periodoService.getPeriodo().subscribe(data => {
      if (data) {
        //this.pkPeriodo = data[0].PK_PERIODO_PREFICHAS;
        //console.log(this.pkPeriodo);
        this.periodo = data[0].PK_PERIODO_PREFICHAS;
        this.obtenerAspirantes(data[0].PK_PERIODO_PREFICHAS);
        this.formularioService.getCarrera3(this.periodo).subscribe(data => {
          this.carreras = data;
        });
        this.formularioService.getCarrera2(this.periodo).subscribe(data => {
          this.carreraLista = data;
        });
      }
    });

    this.aspiranteService.getEstatus().subscribe(data => this.estatus = data);

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
        this.habilitarCorreo = true;
      } else {
        this.aspirantes = this.aspirantes.filter(item => item.ESTATUS === this.filtroESTATUS);
        this.habilitarCorreo = false;
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

  cargarAspirante(pk_usuario) {
    this.aspiranteService.getEditAspirante(pk_usuario).subscribe(data => {
      this.aspirante = data;
      this.aspirante[0].FECHA_REGISTRO = this.aspirante[0].FECHA_REGISTRO.split('-')[0];
      switch (Number(this.aspirante[0].SEXO)) {
        case 1: this.aspirante[0].SEXO = "Masculino";
          break;
        case 2: this.aspirante[0].SEXO = "Femenino";
          break;
      }
      this.nombre = this.aspirante[0].NOMBRE;
      this.primerApellido = this.aspirante[0].PRIMER_APELLIDO;
      this.segundoApellido = this.aspirante[0].SEGUNDO_APELLIDO;

      this.telefonoCasa = this.aspirante[0].TELEFONO_CASA;
      this.telefonoMovil = this.aspirante[0].TELEFONO_MOVIL;
      this.CORREO1 = this.aspirante[0].CORREO1;
      this.especialidad1 = this.aspirante[0].FK_CARRERA_1;
      this.especialidad2 = this.aspirante[0].FK_CARRERA_2;
      this.CURP = this.aspirante[0].CURP;
      this.pkUsuario = pk_usuario;

    });
  }

  async modificarAspirante() {
    //this.loaderModal.show();
    if (this.telefonoMovil == null) {
      this.telefonoMovil = "";
    }
    const data = await this.aspiranteService.updateAspirante(
      {
        "PK_USUARIO": this.pkUsuario,
        "NOMBRE": this.nombre,
        "PRIMER_APELLIDO": this.primerApellido,
        "SEGUNDO_APELLIDO": this.segundoApellido,
        "CURP": this.CURP.toUpperCase(),
        "TELEFONO_CASA": this.telefonoCasa,
        "TELEFONO_MOVIL": "" + this.telefonoMovil + "",
        "CORREO1": this.CORREO1,
        "FK_CARRERA_1": this.especialidad1,
        "FK_CARRERA_2": ''//this.especialidad2
      });

    this.obtenerAspirantes(this.periodo);

    this.formularioService.getCarrera2(this.periodo).subscribe(data => {
      this.carreraLista = data;
    });
    //this.loaderModal.hide();
    alert(data);
  }

  enviarCorreo() {
    /*     var correos = "";
        for (var i=0; this.aspirantes.length>i; i++){
          correos = correos+this.aspirantes[i].CORREO+","
        }
        correos = correos.slice(0,-1); */
    var correos = [];
    for (var i = 0; this.aspirantes.length > i; i++) {
      correos.push(this.aspirantes[i].CORREO);
    }

    this.aspiranteService.enviarCorreo({
      'CORREOS': correos,
      'ASUNTO': this.asunto,
      'MENSAJE': this.mensaje
    });

    this.asunto = "";
    this.mensaje = "";
  }

  generarExcel() {
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();

    var rows = [[
      'Preficha',
      'CURP',
      'Nombre',
      'Primer apellido',
      'Segundo apellido',
      'Correo',
      'Fijo',
      'Celular',
      'Carrera',
      'Estatus'
    ]];


    for (var i = 0; i < this.aspirantes.length; i++) {
      rows.push([
        this.aspirantes[i].PREFICHA,
        this.aspirantes[i].CURP,
        this.aspirantes[i].NOMBRE,
        this.aspirantes[i].PRIMER_APELLIDO,
        this.aspirantes[i].SEGUNDO_APELLIDO,
        this.aspirantes[i].CORREO,
        this.aspirantes[i].TELEFONO_CASA,
        this.aspirantes[i].TELEFONO_MOVIL,
        this.aspirantes[i].CARRERA1,
        this.aspirantes[i].ESTATUS
      ]);
    }

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Prefichas " + y + "-" + m + "-" + d,
      Subject: "Prefichas pagadas",
      Author: "Tecnologico de leon",
      CreatedDate: new Date(2017, 12, 19)
    };

    wb.SheetNames.push("Prefichas " + y + "-" + m + "-" + d);
    var ws_data = rows;
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Prefichas " + y + "-" + m + "-" + d] = ws;
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
    XLSX.writeFile(wb, "Prefichas " + y + "-" + m + "-" + d + ".xlsx");
  }

  cargarIdentificacion(pk_usuario) {
    this.aspiranteService.getDocumento(pk_usuario, 1).subscribe(data => {
      if (data) {
        window.open(this.baseUrlFile + data);
      }
    });
  }
}
