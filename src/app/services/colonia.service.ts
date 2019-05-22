import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IColonia } from './serviciosListas';

@Injectable()
export class ColoniaService{
  constructor(private http: HttpClient){}
  getColonia(cp):Observable<IColonia[]>{
    return this.http.get<IColonia[]>('http://127.0.0.1:8000/api/Colonia/'+cp);
  }
}
