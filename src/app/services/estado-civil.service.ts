import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IEstadoCivil } from './serviciosListas';

@Injectable()
export class EstadoCivilService{
  constructor(private http: HttpClient){}
  getEstadoCivil():Observable<IEstadoCivil[]>{
    return this.http.get<IEstadoCivil[]>('http://127.0.0.1:8000/api/Estado_Civil');
  }
}
