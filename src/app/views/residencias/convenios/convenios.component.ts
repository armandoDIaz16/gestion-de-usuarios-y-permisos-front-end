import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.component.html',
  styleUrls: ['./convenios.component.scss']
})
export class ConveniosComponent implements OnInit {

    NombreEmpresa = this.NombreEmpresa;
    NombreRepresentante = this.NombreRepresentante;
    NoActaConstitutiva = this.NoActaConstitutiva;
    FechaFirma = this.FechaFirma;
    NombreNotario = this.NombreNotario;
    NoNotaria = this.NoNotaria;
    EntidadFederativa = this.EntidadFederativa;
    FechaRegistro = this.FechaRegistro;
    FolioMercantil = this.FolioMercantil;
    NoVolumen = this.NoVolumen;
    ObjetoSocial = this.ObjetoSocial;
    NoEscritura = this.NoEscritura;
    FechaNotario = this.FechaNotario;
    NombreNotarioNotario = this.NombreNotarioNotario;
    NoNotariaNotario = this.NoNotariaNotario;
    EntidadFederativaNotario = this.EntidadFederativaNotario;
    NoRFC = this.NoRFC;
    DirEmpresa = this.DirEmpresa;
    NombreTestigo = this.NombreTestigo;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  uploadFile(event) {
        let elem = event.target;
        if (elem.files.length > 0) {
            let formData = new FormData();
            formData.append('myfile', elem.files[0]);
            formData.append('NombreEmpresa', this.NombreEmpresa);
            formData.append('NombreRepresentante', this.NombreRepresentante);
            formData.append('NoActaConstitutiva', this.NoActaConstitutiva);
            formData.append('FechaFirma', this.FechaFirma);
            formData.append('NombreNotario', this.NombreNotario);
            formData.append('NoNotaria', this.NoNotaria);
            formData.append('EntidadFederativa', this.EntidadFederativa);
            formData.append('FechaRegistro', this.FechaRegistro);
            formData.append('FolioMercantil', this.FolioMercantil);
            formData.append('NoVolumen', this.NoVolumen);
            formData.append('ObjetoSocial', this.ObjetoSocial);
            formData.append('NoEscritura', this.NoEscritura);
            formData.append('FechaNotario', this.FechaNotario);
            formData.append('NombreNotarioNotario', this.NombreNotarioNotario);
            formData.append('NoNotariaNotario', this.NoNotariaNotario);
            formData.append('EntidadFederativaNotario', this.EntidadFederativaNotario);
            formData.append('NoRFC', this.NoRFC);
            formData.append('DirEmpresa', this.DirEmpresa);
            formData.append('NombreTestigo', this.NombreTestigo);
            this.http.post('http://127.0.0.1:8000/api/Convenio', formData).subscribe(
                (response) => {
                    console.log(response);
                });
        }
        elem.value = ''; // line 9

    }
}
