import {Component, OnInit, ViewChild} from '@angular/core';
import {CoordinadoresInstitucionalesService} from '../../services/tutorias/coordinadores-institucionales.service';
import {InterfacePersona} from '../../views/_models/GeneralModels';
import {InterfaceCoordinadoresDepartamentales} from '../../models/tutorias/CoordinadoresModel';

@Component({
    selector: 'app-coordinadores-institucionales',
    templateUrl: '../../views/tutorias/coordinadores-institucionales.component.html',
    styleUrls: ['../../views/tutorias/coordinadores-institucionales.component.scss']
})
export class CoordinadoresInstitucionalesComponent implements OnInit {

    public error;
    public lista_coordinadores: InterfaceCoordinadoresDepartamentales[] = [];
    public lista_usuarios:      InterfacePersona[];
    public nuevo_coordinador:   string;
    public coordinador_seleccionado: number;

    // modal
    @ViewChild('modalModificar') modalModificar;
    @ViewChild('loaderModal') loaderModal;
    public display: string;

    constructor(private coordinadores_service: CoordinadoresInstitucionalesService) {
        this._init();
    }

    ngOnInit() {
        this.display = 'block';

        this.coordinadores_service.get_coordinadores().subscribe(
            data => {
                this.lista_coordinadores = data;
                this.display = 'none';
            },
            error => {
                this.display = 'none';
            }
        );
    }

    seleccionado(pk_usuario: number) {
        this.coordinador_seleccionado = pk_usuario;
    }

    eliminar_coordinador(pk_usuario: number) {
        if (confirm('¿Realmente desea quitar el rol de coordinador institucional al usuario?')) {
            this.coordinadores_service.quita_rol_coordinador(pk_usuario).subscribe(
                data => {
                    if (data) {
                        this.coordinadores_service.get_coordinadores().subscribe(
                            data => {

                            },
                            error => {

                            }
                        );
                        alert('El rol ha sido eliminado');
                    }
                },
                error => {

                }
            );
        }
    }

    guardar_coordinador() {
        if (this.coordinador_seleccionado != 0) {
            if(confirm('¿Está seguro que desea asignar al coordinador institucional?')) {
                let body = {
                    pk_nuevo_coordinador: this.coordinador_seleccionado
                };

                this.coordinadores_service.guarda_coordinador(body).subscribe(
                    data => {

                    },
                    error => {

                    }
                );
            }
        } else {
            alert('Seleccione un coordinador');
        }
    }

    buscar_usuarios() {
        if (this.nuevo_coordinador.trim().length > 0) {
            this.coordinadores_service.get_usuarios_nombre(this.nuevo_coordinador).subscribe(
                data => {
                    this.lista_usuarios = JSON.parse(data.toString());
                },
                error => {
                    alert('Ha ocurrido un error');
                }
            );
        } else {
            alert('Debe ingresar un nombre para buscar');
        }
    }

    ocultar_modal_coordinadores() {
        this._init();
        this.modalModificar.hide();
    }

    _init() {
        this.error = null;
        this.coordinador_seleccionado = 0;
        this.lista_usuarios = [];
        this.lista_coordinadores = [];
        this.display = 'none';
    }

}
