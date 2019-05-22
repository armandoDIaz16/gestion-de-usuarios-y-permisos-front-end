import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IIncapacidad } from './serviciosListas';

@Injectable()
export class IncapacidadService{
  constructor(private http: HttpClient){}
  getIncapacidad():Observable<IIncapacidad[]>{
    return this.http.get<IIncapacidad[]>('http://127.0.0.1:8000/api/Incapacidad');
  }
}
