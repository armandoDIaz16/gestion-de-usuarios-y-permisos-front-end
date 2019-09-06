import {Injectable} from '@angular/core';
import {GenericServicesService} from '../../../services/generic-services.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EncuestasAlumnoService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }
}
