/* import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IBachillerato } from './serviciosListas';

@Injectable()
export class BachilleratoService{
  constructor(private http: HttpClient){}
  
  getBachillerato(ciudad):Observable<IBachillerato[]>{
    return this.http.get<IBachillerato[]>('http://127.0.0.1:8000/api/Bachillerato/'+ciudad);
  }
}
 */