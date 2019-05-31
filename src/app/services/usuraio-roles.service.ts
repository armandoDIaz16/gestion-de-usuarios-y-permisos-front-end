import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IRoles } from './rolesLista';
import { GenericServicesService } from './generic-services.service';


@Injectable()


export class UsuarioRolesService extends GenericServicesService {
    constructor(private http: HttpClient,
    private genericServicesService: GenericServicesService ) { super(http); }
    getUsuarioRoles(): Observable<IRoles[]> {
        return this.http.get<IRoles[]>(GenericServicesService.API_ENDPOINT + 'Usuario_Rol/' + sessionStorage.getItem('IdUsuario'));
    }
}
