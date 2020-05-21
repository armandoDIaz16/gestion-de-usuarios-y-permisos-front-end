import {Component, OnInit, ViewChild} from '@angular/core';
import {InterfaceConferencia} from '../../../models/tutorias/ConferenciaModel';
import {ConferenciasServiceService} from '../../../services/tutorias/coord_institucional/conferencias-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {number, string} from '@amcharts/amcharts4/core';
import {UsuariosService} from '../../../services/usuarios/usuarios.service';

@Component({
    selector: 'app-conferencias',
    templateUrl: '../../../views/tutorias/coord_institucional/conferencias.component.html',
    styleUrls: ['../../../views/tutorias/coord_institucional/conferencias.component.scss']
})
export class ConferenciasComponent implements OnInit {

    public error = null;
    public display = 'block';
    public lista_conferencias: InterfaceConferencia[];
    public lista_capturistas = [];
    public formulario_registro: FormGroup;
    public form_enviado = false;
    public pk_conferencia_selected = null;
    public numero_control = null;
    public capturista_busqueda = {
        pk_usuario: 0,
        nombre: '',
        numero_control: ''
    };

    @ViewChild('modal_registro') modal_registro;
    @ViewChild('modal_capturistas') modal_capturistas;

    constructor(private conferencias_service: ConferenciasServiceService,
                private form_builder: FormBuilder,
                private usuarios_service: UsuariosService,) {
        this.lista_conferencias = <InterfaceConferencia[]>{};
    }

    eliminar_capturista(pk_capturista: number) {
        if (confirm('¿Está seguro de eliminar al capturista?')) {
            this.display = 'block';
            this.conferencias_service.eliminar_capturista(pk_capturista).subscribe(
                (data) => {
                    alert('Eliminado con éxito');
                },
                (error) => {
                    alert('Ha ocurrido un error');
                },
                () => {
                    this.display = 'none';
                    this.obtener_capturistas();
                },
            );
        }
    }

    agrega_capturista() {
        if (confirm('¿Está seguro de agregar al capturista?')) {
            this.display = 'block';
            this.conferencias_service.agrega_capturista(
                this.capturista_busqueda.pk_usuario,
                this.pk_conferencia_selected
            ).subscribe(
                (data) => {
                    alert('Agregado con éxito');
                },
                (error) => {
                    alert('Ha ocurrido un error');
                },
                () => {
                    this.display = 'none';
                    this.obtener_capturistas();
                    this.capturista_busqueda = {
                        pk_usuario: 0,
                        nombre: '',
                        numero_control: ''
                    };
                },
            );
        }
    }

    busca_capturista() {
        if (this.numero_control.trim() != null) {
            this.display = 'block';
            // buscar usuario
            this.usuarios_service.get_alumno(
                '?numero_control=' + this.numero_control
            ).subscribe(
                data => {
                    if (data.data[0] !== undefined) {
                        this.capturista_busqueda = {
                            pk_usuario: data.data[0].PK_USUARIO,
                            nombre: data.data[0].NOMBRE
                                + ' ' + data.data[0].PRIMER_APELLIDO
                                + ' ' + data.data[0].SEGUNDO_APELLIDO,
                            numero_control: data.data[0].NUMERO_CONTROL
                        };
                    } else {
                        alert('No se encontraron datos');
                    }
                },
                error => {
                    this.error = error.error.error;
                    alert('Ha ocurrido un error');
                },
                () => {
                    this.display = 'none';
                }
            );
        } else {
            alert('Ingrese el número de control');
        }
    }

    obtener_capturistas() {
        this.conferencias_service.get_capturistas(
            '?pk_conferencia=' + this.pk_conferencia_selected
        ).subscribe(
            data => {
                this.lista_capturistas = data.data;
            },
            error => {
                this.error = error.error.error;
            },
            () => {
                this.display = 'none';
            }
        );
    }

    editar_capturistas(pk_conferencia: number) {
        this.pk_conferencia_selected = pk_conferencia;
        this.obtener_capturistas();
        this.modal_capturistas.show();
    }

    ngOnInit() {
        // buscar conferencias
        this._init();
        this.buscar_conferencias();
    }

    onSubmitRegistro() {
        this.form_enviado = true;
        if (this.formulario_registro.valid) {
            if (this.formulario_registro.value.pk_jornada === 0) {
                // crear
                this.registra_conferencia();
            } else {
                // actualizar
                this.actualiza_conferencia();
            }
        }

        // mostrar datos de validación
        return;
    }

    eliminar_conferencia(pk_conferencia: number) {
        // eliminar
        if (confirm('¿Desea eliminar la conferencia y a todos los invitados?')) {
            this.display = 'block';
            this.conferencias_service.eliminar(pk_conferencia).subscribe(
                (data) => {
                },
                (error) => {
                    alert('Ha ocurrido un error');
                },
                () => {
                    this.display = 'none';
                    this.ngOnInit();
                },
            );
        }
    }

    editar_conferencia(pk_conferencia: number) {
        this.conferencias_service.get_conferencia(
            '/' + pk_conferencia
        ).subscribe(
            (data) => {
                this.formulario_registro = this.form_builder.group({
                    pk_jornada: [data.data.PK_JORNADA],
                    tema: [data.data.TEMA, [Validators.required]],
                    fecha: [data.data.FECHA, [Validators.required]],
                    lugar: [data.data.LUGAR, [Validators.required]],
                    descripcion: [data.data.DESCRIPCION, [Validators.required]],
                    nombre_expositor: [data.data.NOMBRE_EXPOSITOR, [Validators.required]],
                    curriculum_expositor: [''],
                });
            },
            (error) => {
                alert('Ha ocurrido un error');
            },
            () => {
                this.display = 'none';
                this.modal_registro.show();
            },
        );
    }

    actualiza_conferencia() {
        this.display = 'block';
        // llamada a web service
        this.conferencias_service.actualizar(this.formulario_registro.value, this.formulario_registro.value.pk_jornada).subscribe(
            (data) => {
            },
            (error) => {
                alert('Ha ocurrido un error');
            },
            () => {
                this.display = 'none';
                this._init();
                this.ngOnInit();
            },
        );
    }

    registra_conferencia() {
        this.display = 'block';
        // llamada a web service
        this.conferencias_service.guardar(this.formulario_registro.value).subscribe(
            (data) => {
            },
            (error) => {
                alert('Ha ocurrido un error');
            },
            () => {
                this.display = 'none';
                this._init();
                this.ngOnInit();
            },
        );
    }

    buscar_conferencias() {
        this.conferencias_service.get_conferencias('').subscribe(
            data => {
                this.lista_conferencias = data.data;
            },
            error => {
                this.error = error.error.error;
            },
            () => {
                this.display = 'none';
            }
        );
    }

    mostrar_modal_registro() {
        this._init();
        this.modal_registro.show();
    }

    get form_errors() {
        return this.formulario_registro.controls;
    }

    _init() {
        this.numero_control = null;
        this.form_enviado = false;
        this.modal_registro.hide();
        this.formulario_registro = this.form_builder.group({
            pk_jornada: [0],
            tema: ['', [Validators.required]],
            fecha: ['', [Validators.required]],
            lugar: ['', [Validators.required]],
            descripcion: ['', [Validators.required]],
            nombre_expositor: ['', [Validators.required]],
            curriculum_expositor: [''],
        });
    }
}
