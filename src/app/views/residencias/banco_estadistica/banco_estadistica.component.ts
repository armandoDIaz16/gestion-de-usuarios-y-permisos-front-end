import { Component, OnInit } from '@angular/core';
import {Proyectos} from './proyectos';
import {Totalp} from './totalproyectos';
import {HttpClient} from '@angular/common/http';
import {Chart} from 'chart.js';
import {GenericServicesService} from '../../../services/generic-services.service';


@Component({
  selector: 'app-banco-estadistica',
  templateUrl: './banco_estadistica.component.html',
  styleUrls: ['./banco_estadistica.component.scss'],
    providers: [Proyectos, Totalp]
})
export class Banco_estadisticaComponent extends GenericServicesService implements OnInit {
    ProyectosAlumno;
    TotalProyectos;
    myChart = [];
    x: number;
    y: number;
  constructor(private proyecto: Proyectos, private total: Totalp, private http: HttpClient) {
      super(http);
      this.proyecto.getProyectos().subscribe(data => this.ProyectosAlumno = data);
      this.total.getTotalProyectos().subscribe(data => {this.TotalProyectos = data; this.generar(); });
  }

  ngOnInit() {
  }

  generar() {
       this.x = <number>this.TotalProyectos;
       this.y = <number>this.ProyectosAlumno;
       let z = this.x - this.y;
      const canvas = <HTMLCanvasElement> document.getElementById('myChart');
      const ctx = canvas.getContext('2d');
      this.myChart = [new Chart(ctx, {
          type: 'pie',
          data: {
              labels: ['Proyectos propuestos por alumnos', 'Proyectos propuestos por la institución'],
              datasets: [{
                  label: '# of Votes',
                  data: [this.y, z],
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
          }
      })];
  }

}
