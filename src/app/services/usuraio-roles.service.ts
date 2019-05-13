import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IRoles } from './rolesLista';


@Injectable()
export class UsuarioRolesService{
    constructor(private http: HttpClient){}
    getUsuarioRoles(): Observable<IRoles[]>{
        return this.http.get<IRoles[]>('http://localhost:8000/api/Usuario_Rol/' + sessionStorage.getItem('IdUsuario'));
    }
}
