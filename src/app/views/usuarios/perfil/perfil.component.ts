import {Component, OnInit, ViewChild} from '@angular/core';
import {InterfacePerfil} from '../_models/PerfilModel';
import {InterfaceDatosCodigoPostal, InterfaceEstadoCivil, InterfaceSituacionResidencia} from '../../_models/GeneralModels';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {PerfilService} from './perfil.service';
import {FormularioService} from '../../../services/formulario.service';

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
    public datos_codigo_postal: InterfaceDatosCodigoPostal;
    public situaciones_residencia: InterfaceSituacionResidencia[] = [];
    public colonias: InterfaceSituacionResidencia[] = [];
    public pk_usuario = sessionStorage.getItem('IdEncriptada');
    public entidad_federativa;
    public municipio;
    public FECHA_NACIMIENTO = this.FECHA_NACIMIENTO;
    public CODIGO_POSTAL = this.CODIGO_POSTAL;
    public coloniaLista = [];
    @ViewChild('loaderModal') loaderModal;

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router,
        private perfil_service: PerfilService,
        private formularioService: FormularioService,
    ) { }

    async ngOnInit() {
        // this.loaderModal.show();

        /*const data_perfil = await this.perfil_service.get_perfil(parseInt(this.pk_usuario));
        if (data_perfil) {
            this.perfil = data_perfil.data;
        }

        const data_estados_civiles = await this.perfil_service.get_estados_civiles();
        if (data_estados_civiles) {
            this.estados_civiles = data_estados_civiles.data;
        }

        const data_situaciones_residencia = await this.perfil_service.get_situaciones_residencia();
        if (data_situaciones_residencia) {
            this.situaciones_residencia = data_situaciones_residencia.data;
        }*/

        // this.loaderModal.hide();
    }

    onSubmit() {
        this.perfil_service.guardar_perfil(this.perfil).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
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
        console.log(this.CODIGO_POSTAL);

        if (this.CODIGO_POSTAL.length > 0) {
            let codigo_postal = this.CODIGO_POSTAL.toString().trim();

            if (codigo_postal.length > 3) {
                if (codigo_postal.length > 5) {
                    this.CODIGO_POSTAL = codigo_postal.substr(0, 5);
                }
            }

            return true;
        }
    }

    procesa_codigo_postal() {
        if (this.valida_codigo_postal()) {
            this.formularioService.getColonia(this.CODIGO_POSTAL.toString().trim()).subscribe(data => this.coloniaLista = data);
            /*const data_codigo_postal = this.perfil_service.procesa_codigo_postal(this.CODIGO_POSTAL.toString().trim());
            if (data_codigo_postal) {
                this.datos_codigo_postal = data_codigo_postal.data;

                console.log(data_codigo_postal.data);
            }*/
        }
    }

}
