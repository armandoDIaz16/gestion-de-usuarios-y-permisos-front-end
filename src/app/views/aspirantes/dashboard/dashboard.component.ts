import {Component, OnInit} from '@angular/core';
import {AspiranteService} from '../../../services/aspirante.service';
import {ValidarModuloService} from '../../../services/validarModulo.service';
import {GenericServicesService} from '../../../services/generic-services.service';
import {HttpClient} from '@angular/common/http';
import {PeriodoService} from '../../../services/periodo.service';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./prueba.scss'],
    providers: [AspiranteService, ValidarModuloService, PeriodoService]
})
export class DashboardComponent extends GenericServicesService implements OnInit {
    private baseUrl = GenericServicesService.API_ENDPOINT;
    private baseUrlFile = GenericServicesService.ENDPOINT;
    private headers = GenericServicesService.HEADERS;
    public mostrarModulo = false;
    public aspirante = [];
    public referencia = [];
    paso2 = null;
    paso3 = null;
    paso4 = null;
    paso5 = null;
    paso6 = null;
    habilitarReferencia = false;
    habilitarCurso = false;
    habilitarInscripcion = false;
    habilitarInscripcionCero = false;
    habilitarFicha = false;
    habilitarRegistro = false;
    habilitarResultados = false;
    habilitarAceptado = false;
    habilitarAceptadoCero = false;
    habilitarRechazado = false;
    habilitarGuia = true;
    fechaInicio = null;
    fechaFin = null;
    fechaInicioCurso = null;
    fechaFinCurso = null;
    fechaInicioInscripcion = null;
    fechaFinInscripcion = null;
    fechaInicioInscripcionCero = null;
    fechaFinInscripcionCero = null;
    fechaActual = null;
    puntaje = null;
    matematicas = null;
    mostrarResultados = null;
    mensaje = null;
    mensajeCero = null;
    mensajeRechazado = null;

    constructor(private http: HttpClient,
                private aspiranteService: AspiranteService,
                private validarModuloService: ValidarModuloService,
                private periodoService: PeriodoService) {
        super(http);
    }

    ngOnInit() {
        this.mostrarModulo = this.validarModuloService.getMostrarModulo('Dashboard');
        if (!this.mostrarModulo) {
            return;
        }

        this.periodoService.getPeriodoAspirante().subscribe(data => {
            if (data) {
                this.fechaInicio = data[0].FECHA_INICIO;
                this.fechaFin = data[0].FECHA_FIN;
                this.fechaInicioCurso = data[0].FECHA_INICIO_CURSO;
                this.fechaFinCurso = data[0].FECHA_FIN_CURSO;
                this.fechaInicioInscripcion = data[0].FECHA_INICIO_INSCRIPCION;
                this.fechaFinInscripcion = data[0].FECHA_FIN_INSCRIPCION;
                this.fechaInicioInscripcionCero = data[0].FECHA_INICIO_INSCRIPCION_BIS;
                this.fechaFinInscripcionCero = data[0].FECHA_FIN_INSCRIPCION_BIS;
                this.mensaje = data[0].MENSAJE_SEMESTRE;
                this.mensajeCero = data[0].MENSAJE_SEMESTRE_BIS;
                this.mensajeRechazado = data[0].MENSAJE_RECHAZADO;
                this.fechaActual = data[0].FECHA_ACTUAL;
                this.mostrarResultados = data[0].RESULTADOS;

                this.aspiranteService.getAspirante().subscribe(data2 => {
                    if (data2) {
                        this.aspirante = data2;
                        // this.aspirante[0].PREFICHA = this.aspirante[0].PREFICHA.replace(/ /g, "")
                        // this.aspiranteService.getReferencia(this.aspirante[0].PREFICHA).subscribe(data => this.referencia = data);
                        if (this.aspirante[0].SEGUNDO_APELLIDO == null) {
                            this.aspirante[0].SEGUNDO_APELLIDO = '';
                        }
                        switch (Number(this.aspirante[0].FK_ESTATUS)) {
                            case 1:
                                if (this.compararFechas(this.fechaInicio, this.fechaFin, this.fechaActual, 2)) {
                                    this.habilitarReferencia = true;
                                }
                                break;
                            case 2:
                                this.paso2 = 'active';
                                this.habilitarReferencia = false;
                                break;
                            case 3:
                                this.paso2 = 'active';
                                this.habilitarReferencia = false;
                                this.habilitarRegistro = true;
                                break;
                            case 4:
                                this.paso2 = 'active';
                                this.paso3 = 'active';
                                this.paso4 = 'active';
                                this.habilitarReferencia = false;
                                this.habilitarFicha = true;
                                break;
                            case 5:
                                this.paso2 = 'active';
                                this.paso3 = 'active';
                                this.paso4 = 'active';
                                this.paso5 = 'active';
                                break;
                        }

                        if (this.mostrarResultados == 1) {
                            this.paso6 = 'active';
                            this.habilitarRegistro = false;
                            this.habilitarGuia = false;
                            this.habilitarFicha = false;
                            switch (Number(this.aspirante[0].ACEPTADO)) {
                                case 0:
                                    this.habilitarRechazado = true;
                                    break;
                                case 1:
                                    this.habilitarAceptado = true;
                                    if (this.compararFechas(this.fechaInicioCurso, this.fechaFinCurso, this.fechaActual, 0)) {
                                        this.habilitarCurso = true;
                                    }
                                    if (this.compararFechas(this.fechaInicioInscripcion, this.fechaFinInscripcion, this.fechaActual, 0)) {
                                        this.habilitarInscripcion = true;
                                    }
                                    break;
                                case 2:
                                    this.habilitarAceptadoCero = true;
                                    if (this.compararFechas(
                                        this.fechaInicioInscripcionCero,
                                        this.fechaFinInscripcionCero,
                                        this.fechaActual, 0)) {
                                        this.habilitarInscripcionCero = true;
                                    }
                                    break;
                            }
                        }


                        if (this.mostrarResultados == 1) {
                            this.habilitarFicha = false;
                            this.habilitarResultados = true;
                            this.puntaje = this.aspirante[0].ICNE;
                            switch (Number(this.aspirante[0].DDD_MG_MAT)) {
                                case 1:
                                    this.matematicas = 'insatisfactorio';
                                    break;
                                case 2:
                                    this.matematicas = 'Satisfactorio';
                                    break;
                            }
                        }
                    }
                });
            }
        });
    }

    generarReferencia() {
        window.open(this.baseUrl + 'Referencia/' + sessionStorage.getItem('IdEncriptada'));
    }

    generarReferenciaCurso() {
        window.open(this.baseUrl + 'ReferenciaCurso/' + sessionStorage.getItem('IdEncriptada'));
    }

    generarReferenciaInscripcion() {
        window.open(this.baseUrl + 'ReferenciaInscripcion/' + sessionStorage.getItem('IdEncriptada'));
    }

    generarReferenciaInscripcionCero() {
        window.open(this.baseUrl + 'ReferenciaInscripcionCero/' + sessionStorage.getItem('IdEncriptada'));
    }

    generarFicha() {
        window.open(this.baseUrl + 'Ficha/' + sessionStorage.getItem('IdEncriptada'));
    }

    descargarGuiaExamen() {
        window.open(this.baseUrlFile + 'GuiaExamen.pdf');
    }

    descargarGuiaAspirantes() {
        window.open(this.baseUrlFile + 'GuiaAspirante.pdf');
    }

    compararFechas(fInicio, fFin, fActual, sumar) {
        var fechaInicio = fInicio.split('-');
        var fechaFin = fFin.split('-');
        var fechaActual = fActual.split('-');
        var fechaInicio2 = new Date(fechaInicio[0], (fechaInicio[1] - 1), fechaInicio[2]);
        var fechaFin2 = new Date(fechaFin[0], (fechaFin[1] - 1), fechaFin[2]);
        var fechaActual2 = new Date(fechaActual[0], (fechaActual[1] - 1), fechaActual[2]);
        fechaFin2.setDate(fechaFin2.getDate() + sumar);
        if (fechaActual2 >= fechaInicio2 && fechaActual2 <= fechaFin2) {
            return true;
        }
        return false;
    }
}
