import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ICiudad } from './serviciosListas';

@Injectable()
export class CiudadService{
  constructor(private http: HttpClient){}
  
  getCiudad():Observable<ICiudad[]>{
    return this.http.get<ICiudad[]>('http://127.0.0.1:8000/api/Ciudad/'+
    localStorage.getItem("opcionEntidadFederativa")
    );
  }
}
