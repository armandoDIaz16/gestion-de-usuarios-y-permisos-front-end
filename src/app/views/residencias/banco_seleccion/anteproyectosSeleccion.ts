import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IAnteproyectos} from './anteproyectosSeleccion.service';
import {GenericServicesService} from '../../../services/generic-services.service';


@Injectable()
export class AnteproyectosSeleccion extends GenericServicesService {
  constructor(private http: HttpClient) {super(http); }
  getAnteproyectos(id): Observable<IAnteproyectos[]> {
    return this.http.get<IAnteproyectos[]>(GenericServicesService.API_ENDPOINT + 'Proyecto1/' + id, GenericServicesService.HEADERS);
  }
}
