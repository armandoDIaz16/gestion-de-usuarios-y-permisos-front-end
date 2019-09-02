import { Component, OnInit } from '@angular/core';
import {Estadistica} from './estadistica';
import { ValidarModuloService } from '../../../services/validarModulo.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-estadisticas-asesores',
  templateUrl: './estadisticas_asesores.component.html',
  styleUrls: ['./estadisticas_asesores.component.scss'],
  providers: [Estadistica, ValidarModuloService]
})
export class Estadisticas_asesoresComponent implements OnInit {

  public mostrarModulo = false;
  public listaMaestros = [];
  myChart = [];
  usuario = sessionStorage.getItem('IdUsuario');

  constructor(private validarModuloService: ValidarModuloService, public estadistica: Estadistica) {
      this.estadistica.getBalance(this.usuario).subscribe(data => {this.listaMaestros = data; this.generar(); });
  }

  ngOnInit() {
      this.mostrarModulo = this.validarModuloService.getMostrarModulo('Estadisticas asesores');
      if (!this.mostrarModulo) {
          return;
      }
  }

  generar() {

      var name = [];
      var marks = [];

      for (var i in this.listaMaestros) {
          var f = this.listaMaestros[i].NOMBRE + ' ' + this.listaMaestros[i].PRIMER_APELLIDO + ' ' + this.listaMaestros[i].SEGUNDO_APELLIDO;
          name.push(f);
          marks.push(this.listaMaestros[i].CANTIDAD);
      }

      var chartdata = {
          labels: name,
          datasets: [
              {
                  label: 'Proyectos',
                  backgroundColor: '#49e2ff',
                  borderColor: '#46d5f1',
                  hoverBackgroundColor: '#CCCCCC',
                  hoverBorderColor: '#666666',
                  data: marks
              }
          ]
      };

      const canvas = <HTMLCanvasElement> document.getElementById('myChart');
      const ctx = canvas.getContext('2d');
      this.myChart = [new Chart(ctx, {
          type: 'bar',
          data: chartdata
      })];
  }
}

