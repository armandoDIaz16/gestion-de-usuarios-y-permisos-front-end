import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { GraficasAsesoriaService } from '../../../services/graficasAsesoria.service';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
  providers: [GraficasAsesoriaService]
})

export class ReportesComponent implements OnInit {
  constructor(private graficasAsesoriaService: GraficasAsesoriaService) {
  }

  asesoradosHorizontalBar = [];
  asesoradosNOMBRE = [];
  asesoradosCANTIDAD = [];  
  noAsesoradosNOMBRE = [];
  noAsesoradosCANTIDAD = [];
  materiasPieChart = [];
  materiasNOMBRE = [];
  materiasCANTIDAD = [];

  ngOnInit() {
    this.graficasAsesoriaService.getGraficaAsesorados().subscribe(data => {
      for (var asesorados in data) {
        this.asesoradosNOMBRE.push(data[asesorados].NOMBRE);
        this.asesoradosCANTIDAD.push(data[asesorados].CANTIDAD);
      }
      this.graficasAsesoriaService.getGraficaNoAsesorados().subscribe(data => {
        for (var asesorados in data) {
          this.noAsesoradosNOMBRE.push(data[asesorados].NOMBRE);
          this.noAsesoradosCANTIDAD.push(data[asesorados].CANTIDAD);
        }
        this.generarGraficaAsesorados();
      });
    });
    this.graficasAsesoriaService.getGraficaMaterias().subscribe(data => {
      for (var materias in data) {
        this.materiasNOMBRE.push(data[materias].NOMBRE);
        this.materiasCANTIDAD.push(data[materias].CANTIDAD);
      }
      this.generarGraficaMaterias();
    });
  }
  generarGraficaAsesorados() {
    this.asesoradosHorizontalBar = [new Chart('asesoradosHorizontalBar', {
      type: 'bar',
      data: {
        labels: this.asesoradosNOMBRE,
        datasets: [
          {
            label: "Aceptadas",
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(236, 112, 99)',
              "#3e95cd",
              "rgb(165, 105, 189)",
              "#3cba9f"],
            data: this.asesoradosCANTIDAD
          },{
            label: "Solicitadas",
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(236, 112, 99)',
              "#3e95cd",
              "rgb(165, 105, 189)",
              "#3cba9f"],
            data: this.noAsesoradosCANTIDAD
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: true
              //zeroLineColor: "black",
              //zeroLineWidth: 2
            },
            ticks: {
              min: 0,
              stepSize: 1
            },
            scaleLabel: {
              display: true,
              labelString: "Solicitudes"
            }
          }]
        },
         legend: { display: false },
        title: {
          // display: true,
         // text: 'Predicted world population (millions) in 2050'
        } 
      }
  })];
  }
  generarGraficaMaterias(){
    this.materiasPieChart = [new Chart('materiasPieChart', {
      type: 'pie',
      data: {
        labels: this.materiasNOMBRE,
        datasets: [{
          //label: "Population (millions)",
          backgroundColor: [
            'rgb(255, 159, 64)',            
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'],
          data: this.materiasCANTIDAD
        }]
      },
      options: {
        title: {
          //display: true,
          //text: 'Aspirantes por estatus'
        },
        legend: {
          position: 'left',
        }
      }
    })];



  }
}
