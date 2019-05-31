import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GenericServicesService {

    //protected static API_ENDPOINT = 'http://127.0.0.1:8000/api/';
    protected static API_ENDPOINT = 'http://10.0.31.10:8000/backend_swiitl/server.php/api/';

    protected static HEADERS = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + sessionStorage.getItem('token')
        })
    };

    protected httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    protected get(ruta: string) {
        return this.httpClient.get(
            GenericServicesService.API_ENDPOINT + ruta,
            GenericServicesService.HEADERS
        );
    }

    post(ruta: string, body: object) {
        return this.httpClient.post(
            GenericServicesService.API_ENDPOINT + ruta,
            body,
            GenericServicesService.HEADERS).subscribe(
                (response) => {
                    // response;
            }
        );
    }

    protected put(ruta: string, body: object) {
        return this.httpClient.put(
            GenericServicesService.API_ENDPOINT + ruta,
            body,
            GenericServicesService.HEADERS
        );
    }

    protected delete(ruta: string) {
        return this.httpClient.delete(
            GenericServicesService.API_ENDPOINT + ruta,
            GenericServicesService.HEADERS
        );
    }

}
