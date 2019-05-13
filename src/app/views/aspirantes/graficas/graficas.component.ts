import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AspiranteService } from '../../../services/aspirante.service';
import { PeriodoService } from '../../../services/periodo.service';
@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss'],
  providers: [AspiranteService, PeriodoService]
})

export class GraficasComponent implements OnInit {
  constructor(private aspiranteService: AspiranteService, private periodoService: PeriodoService) {
  }
    title = 'Ng7ChartJs By DotNet Techy';
    LineChart = [];
    BarChart = [];
    PieChart = [];

  estatusPieChart = [];
  estatusNOMBRE = [];
  estatusCANTIDAD = [];
  campusPieChart = [];
  campusNOMBRE = [];
  campusCANTIDAD = [];
  carrerasPieChart = [];
  carrerasHorizontalBar = [];
  carrerasNOMBRE = [];
  carrerasCANTIDAD = [];

  ngOnInit() {
    this.periodoService.getPeriodo().subscribe(data => {
      this.aspiranteService.getGraficaEstatus(data[0].PK_PERIODO_PREFICHAS).subscribe(data => {
        for (var estatus in data) {
          this.estatusNOMBRE.push(data[estatus].NOMBRE);
          this.estatusCANTIDAD.push(data[estatus].CANTIDAD);
        }
        this.generarGraficaEstatus();
      });
      this.aspiranteService.getGraficaCampus(data[0].PK_PERIODO_PREFICHAS).subscribe(data => {
        for (var campus in data) {
          this.campusNOMBRE.push("Campus "+data[campus].NOMBRE);
          this.campusCANTIDAD.push(data[campus].CANTIDAD)
        };
        this.generarGraficaCampus();
      });
      this.aspiranteService.getGraficaCarreras(data[0].PK_PERIODO_PREFICHAS).subscribe(data => {
        for (var carreras in data) {
          this.carrerasNOMBRE.push(data[carreras].NOMBRE);
          this.carrerasCANTIDAD.push(data[carreras].CANTIDAD);
        }
        this.generarGraficaCarreras();
      });
    });

  }
  generarGraficaEstatus() {
    this.estatusPieChart = [new Chart('estatusPieChart', {
      type: 'pie',
      data: {
        labels: this.estatusNOMBRE,
        datasets: [{
          //label: "Population (millions)",
          data: this.estatusCANTIDAD,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850"]
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
  generarGraficaCampus(){


    this.campusPieChart = [new Chart('campusPieChart', {
      type: 'pie',
      data: {
        labels: this.campusNOMBRE,
        datasets: [{
          //label: "Population (millions)",
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850"],
          data: this.campusCANTIDAD
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
  generarGraficaCarreras(){



/*     this.carrerasPieChart = [new Chart('carrerasPieChart', {
      type: 'pie',
      data: {
        labels: this.carrerasNOMBRE,
        datasets: [{
          //label: "Population (millions)",
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f"],
          data: this.carrerasCANTIDAD
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
    })]; */

    this.carrerasHorizontalBar = [new Chart('carrerasHorizontalBar', {
      type: 'horizontalBar',
      data: {
        labels: this.carrerasNOMBRE,
        datasets: [
          {
            //label: "2019",
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
            data: this.carrerasCANTIDAD
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
              labelString: "Aspirantes"
            }
          }]
        },
         legend: { display: false },
        title: {
/*           display: true,
          text: 'Predicted world population (millions) in 2050' */
        } 
      }
  })];
  }
}

/* 
         // Line chart:
         this.LineChart = [new Chart('lineChart', {
          type: 'pie',
          data: {
            labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
              label: 'Number of Items Sold in Months',
              data: [9, 7, 3, 5, 2, 10, 15, 16, 19, 3, 1, 9],
              fill: false,
              lineTension: 0.2,
              borderColor: "red",
              borderWidth: 1
            }]
          },
          options: {
            title: {
              text: "Line Chart",
              display: true
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        })];
    
        // Bar chart:
         this.BarChart = [new Chart('barChart', {
          type: 'bar',
          data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
              label: '# of Votes',
              data: [9, 7, 3, 5, 2, 10],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            title: {
              text: "Bar Chart",
              display: true
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        })];
    
        // pie chart:
        this.PieChart = [new Chart('pieChart', {
          type: 'pie',
          data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
              label: '# of Votes',
              data: [9, 7, 3, 5, 2, 10],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            title: {
              text: "Bar Chart",
              display: true
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        })];
         */