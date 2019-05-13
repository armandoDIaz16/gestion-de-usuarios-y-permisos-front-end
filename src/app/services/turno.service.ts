import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ITurno } from './serviciosListas';

@Injectable()
export class TurnoService{
  constructor(private http: HttpClient){}
  getTurno():Observable<ITurno[]>{
    return this.http.get<ITurno[]>('http://127.0.0.1:8000/api/Turno');
  }
}
