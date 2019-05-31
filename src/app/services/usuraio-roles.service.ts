import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IRoles } from './rolesLista';


@Injectable()
export class UsuarioRolesService {
    constructor(private http: HttpClient) {}
    getUsuarioRoles(): Observable<IRoles[]> {
        return this.http.get<IRoles[]>('http://127.0.0.1:8000/api/Usuario_Rol/'
            + sessionStorage.getItem('IdUsuario'));
    }
}
