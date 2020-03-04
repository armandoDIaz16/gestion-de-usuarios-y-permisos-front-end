import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {InterfaceEncuestaAdmin, InterfaceTipoAplicacion, InterfaceEncuestaPendiente} from '../../models/tutorias/EncuestasModel';
import {EncuestasService} from '../../services/tutorias/encuestas.service';
import {InterfaceCarrera} from '../../models/tutorias/CarreraModel';

@Component({
    selector: 'app-aplicacion-encuesta',
    templateUrl: '../../views/tutorias/aplicacion-encuesta.component.html',
    styleUrls: ['../../views/tutorias/aplicacion-encuesta.component.scss']
})
export class AplicacionEncuestaComponent implements OnInit {

    /* Valores de los select */
    public hay_encuestas = null;
    public hay_tipos_encuesta = null;
    public hay_carreras = null;
    public lista_encuestas: InterfaceEncuestaAdmin[];
    public lista_tipos_encuesta: InterfaceTipoAplicacion[];
    public lista_carreras: InterfaceCarrera[];

    /* Información de la tabla */
    public hay_encuestas_historicos = null;
    public lista_historico: InterfaceEncuestaPendiente[];

    /* Aparecer elemendos en base a el tipo de aplicación */
    public tipo_aplicacion: number;
    public encuesta: number;
    public dato: string;

    // modal
    @ViewChild('loaderModal') loaderModal;
    public display: string;

    constructor(private http: HttpClient,
                private router: Router,
                private route: ActivatedRoute,
                private encuestas_service: EncuestasService) {
        this.display = 'none';
        this.hay_encuestas = false;
        this.hay_tipos_encuesta = false;
        this.hay_carreras = false;
        this.hay_encuestas_historicos = false;
        this.tipo_aplicacion = 0;
        this.encuesta = 0;
        this.dato = '';
    }

    ngOnInit() {
        this.display = 'block';

        // Select - Nombre de las encuestas disponibles
        this.encuestas_service.get_encuestas_disponibles().subscribe(
            data => this.handleResponseEncuestas(data),
            error => this.handleErrorEncuestas(error)
        );

        // Select - Tipos de aplicación de las encuestas
        this.encuestas_service.get_tipos_aplicacion().subscribe(
            data => this.handleResponseTipoAplicacion(data),
            error => this.handleErrorTipoAplicacion(error)
        );

        // Select - Todas las carreras
        this.encuestas_service.get_carreras().subscribe(
            data => this.handleResponseCarrera(data),
            error => this.handleErrorCarrera(error)
        );

        this.encuestas_service.get_encuestas_historico().subscribe(
            data => this.handleResponseHistorico(data),
            error => this.handleErrorHistorico(error)
        );

        this.display = 'none';
    }

    handleResponseEncuestas(data) {
        if (data.data) {
            this.hay_encuestas = true;
            this.lista_encuestas = data.data;
        } else {
            this.hay_encuestas = false;
        }
    }

    handleErrorEncuestas(error) {
    }

    handleResponseTipoAplicacion(data) {
        if (data.data) {
            this.hay_tipos_encuesta = true;
            this.lista_tipos_encuesta = data.data;
        } else {
            this.hay_tipos_encuesta = false;
        }
    }

    handleErrorTipoAplicacion(error) {
    }

    handleResponseCarrera(data) {
        if (data.data) {
            this.hay_carreras = true;
            this.lista_carreras = data.data;
        } else {
            this.hay_carreras = false;
        }
    }

    handleErrorCarrera(error) {
    }

    handleResponseHistorico(data) {
        if (data.data) {
            this.hay_encuestas_historicos = true;
            this.lista_historico = data.data;
        } else {
            this.hay_encuestas_historicos = false;
        }
    }

    handleErrorHistorico(error) {
    }

    aplicar_encuesta(encuesta: number, tipo_aplicacion: number, dato?: string) {
        const body = {
            ENCUESTA: encuesta,
            TIPO_APLICACION: tipo_aplicacion,
            DATO: dato,
            PK_ENCRIPTADA: sessionStorage['IdEncriptada']
        };

        this.encuestas_service.aplicar_encuesta(body).subscribe();

        this.dato = '';
    }
}
