import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
    public numero_control: string;
    public numero_control_valido: boolean;
    public nombre_numero_control: string;
    public numero_semestre: number;
    public carrera: number;

    /* Información de la tabla */
    public hay_encuestas_historicos = null;
    public lista_historico: InterfaceEncuestaPendiente[];

    /* Aparecer elemendos en base a el tipo de aplicación */
    public tipo_aplicacion: number;
    public encuesta: number;

    // modal
    @ViewChild('loaderModal') loaderModal;
    public display: string;

    constructor(private http: HttpClient,
                private encuestas_service: EncuestasService) {
        this._init();
        this.hay_encuestas = false;
        this.hay_tipos_encuesta = false;
        this.hay_carreras = false;
        this.hay_encuestas_historicos = false;
    }

    ngOnInit() {
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

        this.display = 'none';
    }

    handleErrorHistorico(error) {
        this.display = 'none';
    }

    aplicar_encuesta() {
        if (this.valida_aplicacion()) {
            const body = {
                PK_ENCUESTA: this.encuesta,
                PK_TIPO_APLICACION: this.tipo_aplicacion,
                SEMESTRE: this.numero_semestre,
                FK_CARRERA: this.carrera,
                NUMERO_CONTROL: this.numero_control,
                PK_ENCRIPTADA: sessionStorage['IdEncriptada']
            };

            this.encuestas_service.aplicar_encuesta(body).subscribe(
                data => this.aplicar_encuesta_ok(data),
                error => this.aplicar_encuesta_error(error)
            );
        } else {
            alert('Seleccione los datos');
        }
    }

    valida_aplicacion() {
        let result = false;
        if (this.encuesta > 0 && this.tipo_aplicacion > 0) {
            if (this.tipo_aplicacion == 1) {
                result = true;
            }

            if (this.tipo_aplicacion == 2) {
                console.log(this.carrera);
                result = (this.carrera > 0) ? true : false;
            }

            if (this.tipo_aplicacion == 3) {
                result = (this.numero_semestre > 0) ? true : false;
            }

            if (this.tipo_aplicacion == 5) {
                result = this.numero_control_valido;
            }
        }

        return result;
    }

    valida_numero_control() {
        if (this.numero_control.trim().length > 0) {
            this.display = 'block';

            this.encuestas_service.validar_numero_control(this.numero_control).subscribe(
                data => this.valida_numero_control_ok(data),
                error => this.valida_numero_control_error(error)
            );
        }
    }

    valida_numero_control_ok(data) {
        this.display = 'none';
        this.nombre_numero_control = data.data;
        this.numero_control_valido = true;
    }

    valida_numero_control_error(error) {
        this.display = 'none';
        this.nombre_numero_control = '';
        this.numero_control_valido = false;
        alert('No se ha encontrado el número de control');
    }

    aplicar_encuesta_ok(data) {
        alert('Se ha registrado con éxito la aplicación');
        this._init();
        this.ngOnInit();
    }

    aplicar_encuesta_error(error) {
        alert('Ha ocurrido un error');
    }

    _init() {
        this.display = 'block';
        this.tipo_aplicacion = 0;
        this.encuesta = 0;
        this.numero_control = '';
        this.numero_semestre = 1;
        this.carrera = 0;
        this.numero_control_valido = false;
        this.nombre_numero_control = '';
    }
}
