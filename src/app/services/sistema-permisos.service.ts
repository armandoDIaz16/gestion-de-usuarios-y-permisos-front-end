import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IPermisos } from './permisosLista';


@Injectable()
export class SistemaPermisosService {
  constructor(private http: HttpClient){}
  getPermisosSistemas():Observable<IPermisos[]>{
    return this.http.get<IPermisos[]>('http://10.0.31.11/backend_swiitl/server.php/api/Sistema_Permiso/'
    +sessionStorage.getItem('sistema')
    );    
  }
}