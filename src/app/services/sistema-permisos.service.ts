import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IPermisos } from './permisosLista';


@Injectable()
export class SistemaPermisosService {
  constructor(private http: HttpClient){}
  getPermisosSistemas():Observable<IPermisos[]>{
    return this.http.get<IPermisos[]>('http://localhost:8000/api/Sistema_Permiso/'
    +sessionStorage.getItem('sistema')
    );    
  }
}