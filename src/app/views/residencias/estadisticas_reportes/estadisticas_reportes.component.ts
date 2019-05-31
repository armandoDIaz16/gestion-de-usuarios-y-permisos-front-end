import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Chart} from 'chart.js';
import {GenericServicesService} from '../../../services/generic-services.service';

@Component({
  selector: 'app-estadisticas-reportes',
  templateUrl: './estadisticas_reportes.component.html',
  styleUrls: ['./estadisticas_reportes.component.scss']
})
export class Estadisticas_reportesComponent extends GenericServicesService implements OnInit {
    TotalMaestros;
    TotalRep1;
    TotalM;
    TotalM1;
    TotalE;
    TotalE1;
    usuario = sessionStorage.getItem('IdUsuario');
    myChart = [];
    myChart2 = [];
    myChart3 = [];
    myChart4 = [];
    OpcionSeleccionado = this.OpcionSeleccionado;
    OpcionSeleccionado2 = this.OpcionSeleccionado2;
  constructor(private http: HttpClient) {
      super(http);
      this.http.post(GenericServicesService.API_ENDPOINT + 'Totalr', {
          'id': this.usuario,
          'total': 1
      }, GenericServicesService.HEADERS).subscribe( data => this.TotalMaestros = data);
      this.http.post(GenericServicesService.API_ENDPOINT + 'Estadisticas', {
          'id': this.usuario,
          'total': 3
      }, GenericServicesService.HEADERS).subscribe(data => this.TotalE = data);
      this.http.post(GenericServicesService.API_ENDPOINT + 'Estadisticas', {
          'id': this.usuario,
          'total': 1
      }, GenericServicesService.HEADERS).subscribe(data => {this.TotalM = data; this.generar(); });
  }

  ngOnInit() {
  }

    generar() {
        const canvas = <HTMLCanvasElement> document.getElementById('myChart');
        const ctx = canvas.getContext('2d');
        this.myChart = [new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Reportes docentes entregados', 'Reportes docentes no entregados'],
                datasets: [{
                    label: '# of Votes',
                    data: [this.TotalM, this.TotalMaestros - this.TotalM],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })];
        const canvas2 = <HTMLCanvasElement> document.getElementById('myChart2');
        const ctx2 = canvas2.getContext('2d');
        this.myChart2 = [new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: ['Reportes externos entregados', 'Reportes externos no entregados'],
                datasets: [{
                    label: '# of Votes',
                    data: [this.TotalE, this.TotalMaestros - this.TotalE],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })];
    }
    graficaDocente() {
        this.http.post(GenericServicesService.API_ENDPOINT + 'Totalr', {
            'id': this.usuario,
            'total': 2,
        }, GenericServicesService.HEADERS).subscribe( data => this.TotalRep1 = data);
        this.http.post(GenericServicesService.API_ENDPOINT + 'Estadisticas', {
            'id': this.usuario,
            'total': 2,
            'NUMERO': this.OpcionSeleccionado
        }, GenericServicesService.HEADERS).subscribe(data => {this.TotalM1 = data; this.generarDocente(); });
    }

    generarDocente() {
        const canvas3 = <HTMLCanvasElement> document.getElementById('myChart3');
        const ctx3 = canvas3.getContext('2d');
        this.myChart3 = [new Chart(ctx3, {
            type: 'pie',
            data: {
                labels: ['Reportes parciales docentes entregados', 'Reportes parciales docentes no entregados'],
                datasets: [{
                    label: '# of Votes',
                    data: [this.TotalM1, this.TotalRep1 - this.TotalM1],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })];
    }

    graficaExterno() {
        this.http.post(GenericServicesService.API_ENDPOINT + 'Totalr', {
            'id': this.usuario,
            'total': 2,
        }, GenericServicesService.HEADERS).subscribe( data => this.TotalRep1 = data);
        this.http.post(GenericServicesService.API_ENDPOINT + 'Estadisticas', {
            'id': this.usuario,
            'total': 4,
            'NUMERO': this.OpcionSeleccionado2
        }, GenericServicesService.HEADERS).subscribe(data => {this.TotalE1 = data; this.generarExterno(); });
    }
    generarExterno() {
        const canvas4 = <HTMLCanvasElement> document.getElementById('myChart4');
        const ctx4 = canvas4.getContext('2d');
        this.myChart4 = [new Chart(ctx4, {
            type: 'pie',
            data: {
                labels: ['Reportes docentes entregados', 'Reportes docentes no entregados'],
                datasets: [{
                    label: '# of Votes',
                    data: [this.TotalE1, this.TotalRep1 - this.TotalE1],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })];
    }
}
