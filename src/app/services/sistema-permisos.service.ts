import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SISTEMASEntity } from './rolesLista';


@Injectable()
export class SistemaPermisosService {
  constructor(private http: HttpClient){}
  getPermisosSistemas():Observable<SISTEMASEntity[]>{
    return this.http.get<SISTEMASEntity[]>('http://localhost:8000/api/Sistema_Permiso/'
    +sessionStorage.getItem('sistema')
    );    
  }
}