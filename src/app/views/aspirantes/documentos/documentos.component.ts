import { Component, OnInit, ViewChild } from '@angular/core';
import { PeriodoService } from '../../../services/periodo.service';
import { AspiranteService } from '../../../services/aspirante.service';
import * as XLSX from 'xlsx';
import { ValidarModuloService } from '../../../services/validarModulo.service';


@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss'],
  providers: [PeriodoService, AspiranteService, ValidarModuloService]
})
export class DocumentosComponent implements OnInit {

  constructor(private periodoService: PeriodoService,
    private aspiranteService: AspiranteService,
    private validarModuloService: ValidarModuloService) {
  }

  @ViewChild('loaderModal') loaderModal;
  public sistema = "Aspirantes";
  public mostrarModulo = false;
  public fechaFin = null;
  public fechaInicio = null;
  public periodo = null;
  public aspirantes = [];
  public excelLeerAceptadosCENVEAL = [];
  public excelGeneradoAceptadosCENVEAL = [];
  public grupos = [];
  public aspirante = [];
  mostrarResultados = null;
  habilidarDocumentos = false;

  ngOnInit() {
    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Documentos");
    if (!this.mostrarModulo) {
      return;
    }
    this.periodoService.getPeriodo().subscribe(data => {
      if (data) {
        this.periodo = data[0].PK_PERIODO_PREFICHAS;
        this.mostrarResultados = data[0].RESULTADOS;
        this.aspiranteService.getAspirante().subscribe(data2 => {
          if (data2) {
            this.aspirante = data2;
            if (this.mostrarResultados == 1) {
              switch (Number(this.aspirante[0].ACEPTADO)) {
                case 1:
                  this.habilidarDocumentos = true;
                  break;
                case 2:
                  this.habilidarDocumentos = true;
                  break;
              }
            }

          }
        });
      }
    });




  }

  enviarIdentificacion(evt: any) {
    var archivo: File = evt.target.files[0];
    if (!archivo) {
      return;
    };
    this.loaderModal.show();
    var myReader: FileReader = new FileReader();
    myReader.onloadend = async (e) => {
      const data = await this.aspiranteService.addDocumento({ "Sistema": this.sistema, "Nombre": 'Identificacion', "Extencion": archivo.name.split('.').pop(), "Archivo": myReader.result, "PK_ENCRIPTADA": sessionStorage.getItem('IdEncriptada') }, this.periodo);
      if (data) {
        this.loaderModal.hide();
        alert(data);
      }
    }
    myReader.readAsDataURL(archivo);
  }
  enviarCURP(evt: any) {
    var archivo: File = evt.target.files[0];
    if (!archivo) {
      return;
    };
    this.loaderModal.show();
    var myReader: FileReader = new FileReader();
    myReader.onloadend = async (e) => {
      const data = await this.aspiranteService.addDocumento({ "Sistema": this.sistema, "Nombre": 'CURP', "Extencion": archivo.name.split('.').pop(), "Archivo": myReader.result, "PK_ENCRIPTADA": sessionStorage.getItem('IdEncriptada') }, this.periodo);
      if (data) {
        this.loaderModal.hide();
        alert(data);
      }
    }
    myReader.readAsDataURL(archivo);
  }
  enviarActa(evt: any) {
    var archivo: File = evt.target.files[0];
    if (!archivo) {
      return;
    };
    this.loaderModal.show();
    var myReader: FileReader = new FileReader();
    myReader.onloadend = async (e) => {
      const data = await this.aspiranteService.addDocumento({ "Sistema": this.sistema, "Nombre": 'Acta_de_nacimiento', "Extencion": archivo.name.split('.').pop(), "Archivo": myReader.result, "PK_ENCRIPTADA": sessionStorage.getItem('IdEncriptada') }, this.periodo);
      if (data) {
        this.loaderModal.hide();
        alert(data);
      }
    }
    myReader.readAsDataURL(archivo);
  }
  enviarCertificadoPrepa(evt: any) {
    var archivo: File = evt.target.files[0];
    if (!archivo) {
      return;
    };
    this.loaderModal.show();
    var myReader: FileReader = new FileReader();
    myReader.onloadend = async (e) => {
      const data = await this.aspiranteService.addDocumento({ "Sistema": this.sistema, "Nombre": 'Certificado_preparatoria', "Extencion": archivo.name.split('.').pop(), "Archivo": myReader.result, "PK_ENCRIPTADA": sessionStorage.getItem('IdEncriptada') }, this.periodo);
      if (data) {
        this.loaderModal.hide();
        alert(data);
      }
    }
    myReader.readAsDataURL(archivo);
  }
  enviarCertificadoMedico(evt: any) {
    var archivo: File = evt.target.files[0];
    if (!archivo) {
      return;
    };
    this.loaderModal.show();
    var myReader: FileReader = new FileReader();
    myReader.onloadend = async (e) => {
      const data = await this.aspiranteService.addDocumento({ "Sistema": this.sistema, "Nombre": 'Certificado_medico', "Extencion": archivo.name.split('.').pop(), "Archivo": myReader.result, "PK_ENCRIPTADA": sessionStorage.getItem('IdEncriptada') }, this.periodo);
      if (data) {
        this.loaderModal.hide();
        alert(data);
      }
    }
    myReader.readAsDataURL(archivo);
  }
  enviarFoto(evt: any) {
    var archivo: File = evt.target.files[0];
    if (!archivo) {
      return;
    };
    this.loaderModal.show();
    var myReader: FileReader = new FileReader();
    myReader.onloadend = async (e) => {
      const data = await this.aspiranteService.addDocumento({ "Sistema": this.sistema, "Nombre": 'Foto', "Extencion": archivo.name.split('.').pop(), "Archivo": myReader.result, "PK_ENCRIPTADA": sessionStorage.getItem('IdEncriptada') }, this.periodo);
      if (data) {
        this.loaderModal.hide();
        alert(data);
      }
    }
    myReader.readAsDataURL(archivo);
  }
}    