/* tslint:disable:max-line-length */

import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-bancoproyectos',
  templateUrl: './bancoproyectos.component.html',
  styleUrls: ['./bancoproyectos.component.scss']
})
export class BancoproyectosComponent implements OnInit {

  constructor(private http: HttpClient) {}

   const; header = 'Access-Control-Allow-Origin: *';

  ngOnInit() {
  }

}
