import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
// import { Usuario } from interface
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UsuariosTutoriasService {

    API_ENDPOINT = 'http://127.0.0.1:8000/api/';
    HEADERS = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private httpClient: HttpClient) {
    }

    get() {
        return this.httpClient.get(
            this.API_ENDPOINT + 'get'
        );
    }

    save() { // se recibe objeto como parámetro (usuario: Usuario)
        const body = [];
        return this.httpClient.post(
            this.API_ENDPOINT + 'ruta',
            body,
            this.HEADERS
        );
    }

    put() { // se recibe objeto como parámetro (usuario: Usuario)
        const body = [];
        return this.httpClient.put(
            this.API_ENDPOINT + 'ruta',
            body,
            this.HEADERS
        );
    }

    delete(pk: number) {
        return this.httpClient.delete(
            this.API_ENDPOINT + 'ruta'
        );
    }
}
