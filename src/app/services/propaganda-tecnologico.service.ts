import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IPropagndaTecnologico } from './serviciosListas';

@Injectable()
export class PropagandaTecnologicoService{
  constructor(private http: HttpClient){}
  getPropagandaTecnologico():Observable<IPropagndaTecnologico[]>{
    return this.http.get<IPropagndaTecnologico[]>('http://127.0.0.1:8000/api/Propaganda_Tecnologico');
  }
}
