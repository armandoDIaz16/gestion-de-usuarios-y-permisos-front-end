import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IUniversidad } from './serviciosListas';

@Injectable()
export class UniversidadService{
  constructor(private http: HttpClient){}
  getUniversidad():Observable<IUniversidad[]>{
    return this.http.get<IUniversidad[]>('http://127.0.0.1:8000/api/Universidad');
  }
}
