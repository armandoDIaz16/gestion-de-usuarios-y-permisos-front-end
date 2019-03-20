import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ICarrera } from './serviciosListas';

@Injectable()
export class CarreraService{
  constructor(private http: HttpClient){}
  getCarrera():Observable<ICarrera[]>{
    return this.http.get<ICarrera[]>('http://127.0.0.1:8000/api/Carrera');
  }
}
