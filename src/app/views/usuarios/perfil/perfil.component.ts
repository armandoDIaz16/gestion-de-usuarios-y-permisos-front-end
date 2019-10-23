import {Component, OnInit, ViewChild} from '@angular/core';
import {InterfacePerfil} from '../_models/PerfilModel';
import {InterfaceDatosCodigoPostal, InterfaceEstadoCivil, InterfaceSituacionResidencia} from '../../_models/GeneralModels';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {PerfilService} from './perfil.service';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

    public error = null;
    public data = null;
    public perfil: InterfacePerfil = null;
    public estados_civiles: InterfaceEstadoCivil[] = [];
    public datos_codigo_postal: InterfaceDatosCodigoPostal = null;
    public situaciones_residencia: InterfaceSituacionResidencia[] = [];
    public pk_usuario = sessionStorage.getItem('IdEncriptada');

    // Datos de formulario
    public form = {
        FECHA_NACIMIENTO: "",
        CODIGO_POSTAL: "",
        SEXO: 0,
        ESTADO_CIVIL: 0,
        SITUACION_RESIDENCIA: 0,
        CORREO1: "",
        CORREO2: "",
        TELEFONO_CASA: "",
        TELEFONO_MOVIL: "",
        COLONIA: 0,
        CALLE: "",
        NUMERO_EXTERIOR: "",
        NUMERO_INTERIOR: "",
        NOMBRE_CONTACTO: "",
        PARENTESCO_CONTACTO: "",
        TELEFONO_CONTACTO: "",
        CORREO_CONTACTO: ""
    };

    @ViewChild('loaderModal') loaderModal;

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router,
        private perfil_service: PerfilService
    ) {
        this.form.SEXO = (this.perfil.SEXO) ? this.perfil.SEXO : 0;
        this.form.ESTADO_CIVIL = (this.perfil.FK_ESTADO_CIVIL) ? this.perfil.FK_ESTADO_CIVIL : 0;
        this.form.SITUACION_RESIDENCIA = (this.perfil.SITUACION_RESIDENCIA) ? this.perfil.SITUACION_RESIDENCIA : 0;
        this.form.COLONIA = (this.perfil.FK_COLONIA) ? this.perfil.FK_COLONIA : 0;

        this.form.FECHA_NACIMIENTO = (this.perfil.FECHA_NACIMIENTO) ? this.perfil.FECHA_NACIMIENTO : '';
        this.form.CODIGO_POSTAL = this.perfil.CODIGO_POSTAL;
        this.form.CORREO1 = this.perfil.CORREO1;
        this.form.CORREO2 = this.perfil.CORREO2;
        this.form.TELEFONO_CASA = this.perfil.TELEFONO_CASA;
        this.form.TELEFONO_MOVIL = this.perfil.TELEFONO_MOVIL;
        this.form.CALLE = this.perfil.CALLE;
        this.form.NUMERO_EXTERIOR = this.perfil.NUMERO_EXTERIOR;
        this.form.NUMERO_INTERIOR = this.perfil.NUMERO_INTERIOR;
        this.form.NOMBRE_CONTACTO = this.perfil.NOMBRE_CONTACTO;
        this.form.PARENTESCO_CONTACTO = this.perfil.PARENTESCO_CONTACTO;
        this.form.TELEFONO_CONTACTO = this.perfil.TELEFONO_CONTACTO;
        this.form.CORREO_CONTACTO = this.perfil.CORREO_CONTACTO;

        this.datos_codigo_postal = <InterfaceDatosCodigoPostal>{};
        this.datos_codigo_postal.COLONIAS = [];
    }

    async ngOnInit() {
        // this.loaderModal.show(); .

        const data_perfil = await this.perfil_service.get_perfil(parseInt(this.pk_usuario));
        if (data_perfil) {
            this.perfil = <InterfacePerfil>data_perfil;
        }

        const data_estados_civiles = await this.perfil_service.get_estados_civiles();
        if (data_estados_civiles) {
            this.estados_civiles = <InterfaceEstadoCivil[]>data_estados_civiles;
        }

        const data_situaciones_residencia = await this.perfil_service.get_situaciones_residencia();
        if (data_situaciones_residencia) {
            this.situaciones_residencia = <InterfaceSituacionResidencia[]>data_situaciones_residencia;
        }

        this.form.CORREO1       = this.perfil.CORREO1;
        this.form.TELEFONO_CASA = this.perfil.TELEFONO_CASA;
        this.form.TELEFONO_MOVIL = this.perfil.TELEFONO_MOVIL;

        // this.loaderModal.hide();
    }

    onSubmit() {
        if (this.valida_perfil()) {
            let body = {
                PK_USUARIO: this.perfil.PK_USUARIO,
                FECHA_NACIMIENTO: this.form.FECHA_NACIMIENTO,
            };
            this.perfil_service.guardar_perfil(body).subscribe(
                data => this.handleResponse(data),
                error => this.handleError(error)
            );
        }
    }

    valida_perfil() {
        if (this.form.FECHA_NACIMIENTO == '0'){
            alert('Indica la fecha de nacimiento');
            return false;
        }
        if (this.form.SEXO == 0){
            alert('Indica el sexo');
            return false;
        }
        if (this.form.ESTADO_CIVIL == 0){
            alert('Indica el estado civil');
            return false;
        }
        if (this.form.SITUACION_RESIDENCIA == 0){
            alert('Indica la situación de residencia');
            return false;
        }
        if (this.form.CORREO1.trim() == ''){
            alert('Indica el correo principal');
            return false;
        }
        if (this.form.TELEFONO_CASA.trim() == ''){
            alert('Indica el teléfono de casa');
            return false;
        }
        if (this.form.TELEFONO_MOVIL.trim() == ''){
            alert('Indica el teléfono móvil');
            return false;
        }
        if (this.form.COLONIA == 0){
            alert('Indica la colonia');
            return false;
        }
        if (this.form.CALLE.trim() == ''){
            alert('Indica la calle');
            return false;
        }
        if (this.form.NUMERO_EXTERIOR.trim() == ''){
            alert('Indica el número exterior');
            return false;
        }
        if (this.form.NOMBRE_CONTACTO.trim() == ''){
            alert('Indica el nombre del contacto en caso de emergencia');
            return false;
        }
        if (this.form.PARENTESCO_CONTACTO.trim() == ''){
            alert('Indica el parentesco del contacto en caso de emergencia');
            return false;
        }
        if (this.form.TELEFONO_CONTACTO.trim() == ''){
            alert('Indica el número de teléfono de contacto en caso de emergencia');
            return false;
        }
        if (this.form.CORREO_CONTACTO.trim() == ''){
            alert('Indica el correo electrónico de contacto en caso de emergencia');
            return false;
        }

        return true;
    }

    handleResponse(data) {
        // localStorage.setItem('datos_alumno', JSON.stringify(this.data));
        if (data.data === true) {
            this.router.navigateByUrl('/home');
        }
    }

    handleError(error) {
    }

    volver() {
        history.back();
    }

    valida_codigo_postal() {
        if (this.form.CODIGO_POSTAL.toString().length > 0) {
            let codigo_postal = this.form.CODIGO_POSTAL.toString().trim();

            if (codigo_postal.length > 3) {
                if (codigo_postal.length > 5) {
                    this.form.CODIGO_POSTAL = codigo_postal.substr(0, 5);
                }

                return true;
            }
            this.datos_codigo_postal = <InterfaceDatosCodigoPostal>{};
            return false;
        } else {
            this.datos_codigo_postal = <InterfaceDatosCodigoPostal>{};
        }
    }

    async procesa_codigo_postal() {
        if (this.valida_codigo_postal()) {
            const data_codigo_postal = await this.perfil_service.procesa_codigo_postal(this.form.CODIGO_POSTAL.toString().trim());

            this.datos_codigo_postal = <InterfaceDatosCodigoPostal>data_codigo_postal;
        }
    }

}