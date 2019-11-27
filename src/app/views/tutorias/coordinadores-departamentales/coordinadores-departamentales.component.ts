import {Component, OnInit, ViewChild} from '@angular/core';
import {InterfaceCoordinadoresDepartamentales} from '../_models/CoordinadoresModel';
import {CoordinadoresDepartamentalesService} from './coordinadores-departamentales.service';
import {InterfaceAreaAcademica, InterfacePersona} from '../../_models/GeneralModels';
import {AreaAcademicaServiceService} from '../../../services/area-academica-service.service';

@Component({
    selector: 'app-coordinadores-departamentales',
    templateUrl: './coordinadores-departamentales.component.html',
    styleUrls: ['./coordinadores-departamentales.component.scss']
})
export class CoordinadoresDepartamentalesComponent implements OnInit {

    public error = null;
    public lista_coordinadores: InterfaceCoordinadoresDepartamentales[] = [];
    public areas_academicas:    InterfaceAreaAcademica[] = [];
    public lista_usuarios:      InterfacePersona[];
    public nuevo_coordinador:   string;
    public select_area_academica:  number;
    public coordinador_actual: string;
    public coordinador_seleccionado = 0;
    @ViewChild('loaderModal') loaderModal;

    constructor(
        private coordinadores_service: CoordinadoresDepartamentalesService,
        private area_academica_service: AreaAcademicaServiceService
    ) {
        this._init();
    }

    ngOnInit() {
        this.coordinadores_service.get_coordinadores().subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );

        this.area_academica_service.get_areas_academicas().subscribe(
            data => this.handleResponseAreas(data),
            error => this.handleError(error)
        );
    }

    handleResponse(data) {
        if (data.data) {
            this.lista_coordinadores = data.data;
        }
    }

    handleResponseAreas(data) {
        if (data.data) {
            this.areas_academicas = data.data;
        }
    }

    handleError(error) {
        console.log(error);
        this.error = error.error.error;
    }

    buscar_usuarios() {
        if (this.nuevo_coordinador.trim().length > 0) {
            this.coordinadores_service.get_usuarios_nombre(this.nuevo_coordinador).subscribe(
                data => this.handleResponseUsuarios(data),
                error => this.handleError(error)
            );
        } else {
            alert('Debe ingresar un nombre para buscar');
        }
    }

    handleResponseUsuarios(data) {
        if (data.data){
            this.lista_usuarios = data.data;
        } else {
            this.lista_usuarios = [];
        }
    }

    guardar_coordinador() {
        if (this.select_area_academica != 0) {
            if (this.coordinador_seleccionado != 0) {
                if(confirm('¿Está seguro que desea asignar el coordinador de área?')) {
                    let body = {
                        pk_area_academica: this.select_area_academica,
                        pk_nuevo_coordinador: this.coordinador_seleccionado
                    };

                    this.coordinadores_service.guarda_coordinador(body).subscribe(
                        data => this.handleResponseGuardaCoordinador(data),
                        error => this.handleError(error)
                    );
                }
            } else {
                alert('Seleccione un coordinador');
            }
        } else {
            alert('Seleccione el área académica');
        }
    }

    seleccionado(pk_usuario: number) {
        this.coordinador_seleccionado = pk_usuario;
    }

    handleResponseGuardaCoordinador(data) {
        if (data.data){
            this._init();
            this.loaderModal.hide();

            alert('El coordinador ha sido asignado');

            this.coordinadores_service.get_coordinadores().subscribe(
                data => this.handleResponse(data),
                error => this.handleError(error)
            );
        }
    }

    busca_coordinador_actual(){
        this.coordinador_seleccionado = 0;
        if (this.select_area_academica != 0) {
            this.coordinadores_service.get_coordinador_area(this.select_area_academica).subscribe(
                data => this.handleResponseCoordinador(data),
                error => this.handleError(error)
            );
        }
    }

    handleResponseCoordinador(data) {
        if (data.data){
            this.coordinador_actual =
                data.data.NOMBRE  + ' '
                + data.data.PRIMER_APELLIDO
                + ' '
                + data.data.SEGUNDO_APELLIDO;
        } else {
            this.coordinador_actual = 'SIN COORDINADOR ASIGNADO';
        }
    }

    eliminar_coordinador(pk_area_academica: number) {
        if (confirm('¿Realmente desea quitar el rol de coordinador departamental al usuario?')) {
            this.coordinadores_service.quita_rol_coordinador(pk_area_academica).subscribe(
                data => {
                    if (data) {
                        this.coordinadores_service.get_coordinadores().subscribe(
                            data => this.handleResponse(data),
                            error => this.handleError(error)
                        );
                        alert('El rol ha sido eliminado');
                    }
                },
                error => this.handleError(error)
            );
        }
    }

    ocultar_modal_coordinadores() {
        this._init();
        this.loaderModal.hide();
    }

    _init() {
        this.select_area_academica = 0;
        this.coordinador_actual = '';
        this.nuevo_coordinador = '';
        this.lista_usuarios = [];
    }

}
