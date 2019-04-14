import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ICarreraUniversidad } from './serviciosListas';

@Injectable()
export class CarreraUniversidadService{
  constructor(private http: HttpClient){}
  getCarreraUniversidad():Observable<ICarreraUniversidad[]>{
    return this.http.get<ICarreraUniversidad[]>('http://127.0.0.1:8000/api/Carrera_Universidad');
  }
}
