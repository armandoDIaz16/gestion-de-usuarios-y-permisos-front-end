import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IDependencia } from './serviciosListas';

@Injectable()
export class DependenciaService{
  constructor(private http: HttpClient){}
  getDependencia():Observable<IDependencia[]>{
    return this.http.get<IDependencia[]>('http://127.0.0.1:8000/api/Dependencia');
  }
}
