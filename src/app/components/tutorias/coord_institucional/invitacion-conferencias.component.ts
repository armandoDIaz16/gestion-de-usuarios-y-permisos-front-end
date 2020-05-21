import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InvitracionConferenciasService} from '../../../services/tutorias/coord_institucional/invitracion-conferencias.service';
import {CarrerasService} from '../../../services/general/carreras.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConferenciasServiceService} from '../../../services/tutorias/coord_institucional/conferencias-service.service';
import {number} from '@amcharts/amcharts4/core';

@Component({
    selector: 'app-conferencias',
    templateUrl: '../../../views/tutorias/coord_institucional/invitacion-conferencias.component.html',
    styleUrls: ['../../../views/tutorias/coord_institucional/invitacion-conferencias.component.scss']
})
export class InvitacionConferenciasComponent implements OnInit {

    public error = null;
    public display = 'block';
    public lista_invitaciones: any = [];
    public lista_carreras: any = [];
    public conferencia: any = [];
    public formulario_registro: FormGroup;
    public aplicacion_semestre = false;
    private pk_conferencia = null;

    @ViewChild('modal_registro') modal_registro;

    constructor(private invitaciones_service: InvitracionConferenciasService,
                private form_builder: FormBuilder,
                private carreras_service: CarrerasService,
                private conferencias_service: ConferenciasServiceService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        if (this.route.snapshot.queryParamMap.get('conferencia') !== null) {
            this.pk_conferencia = this.route.snapshot.queryParamMap.get('conferencia');
        } else {
            // enviar a conferencias
            this.router.navigate(['/2a107d6270125877f8ff8c3a223501c2']);
        }

        this.display = 'block';
        this._init();
        this.buscar_invitaciones();
        this.buscar_carreras();
        this.buscar_conferencia();
    }

    onSubmitRegistro() {
        if (confirm('¿Está seguro de generar la invitación?')) {
            if (parseInt(this.formulario_registro.value.tipo_invitacion, 10) !== 0) {
                if (this.valida_form()) {
                    if (this.formulario_registro.value.pk_invitacion === 0) {
                        // crear
                        this.registra_invitacion();
                    } else {
                        // actualizar
                        this.actualiza_invitacion();
                    }
                }
            } else {
                alert('Seleccione el tipo de invitación');
            }
        }
    }

    valida_form(): boolean {
        if (parseInt(this.formulario_registro.value.tipo_invitacion, 10) === 1) {
            return true;
        } else {
            if (parseInt(this.formulario_registro.value.carrera, 10) === -1) {
                alert('Seleccione una opción de carrera');
                return false;
            } else {
                return true;
            }
        }
    }

    eliminar_invitacion(pk_conferencia: number) {
        // eliminar
        if (confirm('¿Desea eliminar la conferencia y a todos los invitados?')) {
            this.display = 'block';
            this.invitaciones_service.eliminar(pk_conferencia).subscribe(
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

    editar_invitacion(pk_conferencia: number) {
        this.invitaciones_service.get_invitacion(
            '/' + pk_conferencia
        ).subscribe(
            (data) => {
                let carrera = null;
                if (parseInt(data.data.TIPO_INVITACION, 10) === 2) {
                    this.aplicacion_semestre = true;
                    carrera = (data.data.FK_CARRERA !== null) ? data.data.FK_CARRERA : 0;
                } else {
                    this.aplicacion_semestre = false;
                }
                this.formulario_registro = this.form_builder.group({
                    pk_invitacion: [data.data.PK_INVITACION],
                    tipo_invitacion: [data.data.TIPO_INVITACION],
                    carrera: carrera,
                    semestre: [data.data.SEMESTRE],
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

    actualiza_invitacion() {
        this.display = 'block';
        // llamada a web service
        this.invitaciones_service.actualizar(this.formulario_registro.value, this.formulario_registro.value.pk_invitacion).subscribe(
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

    registra_invitacion() {
        this.display = 'block';
        // llamada a web service
        this.invitaciones_service.guardar(this.formulario_registro.value, this.conferencia.PK_JORNADA).subscribe(
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

    buscar_conferencia() {
        this.conferencias_service.get_conferencia(
            '/' + this.pk_conferencia
        ).subscribe(
            data => {
                this.conferencia = data.data;
            },
            error => {
                this.error = error.error.error;
            },
            () => {
                this.display = 'none';
            }
        );
    }

    buscar_carreras() {
        this.carreras_service.get_carreras('').subscribe(
            data => {
                this.lista_carreras = data;
            },
            error => {
                this.error = error.error.error;
            },
            () => {
            }
        );
    }

    buscar_invitaciones() {
        this.invitaciones_service.get_invitaciones(
            '?pk_conferencia=' + this.pk_conferencia
        ).subscribe(
            data => {
                this.lista_invitaciones = data.data;
            },
            error => {
                this.error = error.error.error;
            },
            () => {
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

    verifica_aplicacion() {
        if (this.formulario_registro.value.tipo_invitacion === '2') {
            this.aplicacion_semestre = true;
        } else {
            this.aplicacion_semestre = false;
        }
    }

    _init() {
        this.aplicacion_semestre = false;
        this.modal_registro.hide();
        this.formulario_registro = this.form_builder.group({
            pk_invitacion: [0],
            tipo_invitacion: [0],
            carrera: [-1],
            semestre: [''],
        });
    }
}
