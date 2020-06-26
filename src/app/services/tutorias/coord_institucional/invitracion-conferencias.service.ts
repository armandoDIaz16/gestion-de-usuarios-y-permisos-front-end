import {Injectable} from '@angular/core';
import {GenericServicesService} from '../../generic-services.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class InvitracionConferenciasService extends GenericServicesService {

    constructor(private http: HttpClient) {
        super(http);
    }

    /* INICIO INVITACION CONFERENCIAS */
    guardar(body, pk_conferencia): any {
        const data = {
            pk_conferencia: pk_conferencia,
            tipo_invitacion: body.tipo_invitacion,
            carrera: body.carrera,
            semestre: body.semestre,
        };
        return <any>this.http.post(
            GenericServicesService.API_ENDPOINT + 'invitacion_conferencia',
            data,
            GenericServicesService.HEADERS
        );
    }

    get_invitaciones(query_params?: string): any {
        return this.http.get<any>(
            GenericServicesService.API_ENDPOINT + 'invitacion_conferencia' + query_params,
            GenericServicesService.HEADERS
        );
    }

    get_invitacion(query_params?: string): any {
        return this.http.get<any>(
            GenericServicesService.API_ENDPOINT + 'invitacion_conferencia' + query_params,
            GenericServicesService.HEADERS
        );
    }

    actualizar(body, pk_conferencia) {
        let carrera = body.carrera;
        let semestre = body.semestre;
        if (parseInt(body.tipo_invitacion, 10) === 1) {
            carrera = null;
            semestre = null;
        }
        const data = {
            tipo_invitacion: body.tipo_invitacion,
            carrera: carrera,
            semestre: semestre,
        };
        return <any>this.http.put(
            GenericServicesService.API_ENDPOINT + 'invitacion_conferencia/' + pk_conferencia,
            data,
            GenericServicesService.HEADERS
        );
    }

    eliminar(pk_conferencia: number) {
        return <any>this.http.delete(
            GenericServicesService.API_ENDPOINT + 'invitacion_conferencia/' + pk_conferencia,
            GenericServicesService.HEADERS
        );
    }
    /* FIN INVITACION CONFERENCIAS */
}
