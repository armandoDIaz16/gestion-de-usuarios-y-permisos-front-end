import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IEntidadFederativa } from './serviciosListas';

@Injectable()
export class EntidadFederativaService{
  constructor(private http: HttpClient){}
  
  getEntidadFederativa():Observable<IEntidadFederativa[]>{
    return this.http.get<IEntidadFederativa[]>('http://127.0.0.1:8000/api/Entidad_Federativa');
  }
}
