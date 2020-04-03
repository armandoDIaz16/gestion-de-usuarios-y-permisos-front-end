import {Component, OnInit, ViewChild} from '@angular/core';
import {GruposTutoriasSiiaServiceService} from '../../../services/tutorias/coord_institucional/grupos-tutorias-siia-service.service';
import {InterfaceGrupoSiia} from '../../../models/tutorias/GrupoModel';

@Component({
    selector: 'app-grupos-tutorias-siia',
    templateUrl: '../../../views/tutorias/coord_institucional/grupos-tutorias-siia.component.html',
    styleUrls: ['../../../views/tutorias/coord_institucional/grupos-tutorias-siia.component.scss']
})
export class GruposTutoriasSiiaComponent implements OnInit {

    public error = null;
    public display = '';
    public lista_grupos = <InterfaceGrupoSiia[]>{};
    @ViewChild('loaderModal') loaderModal;

    constructor(private grupos_siia_service: GruposTutoriasSiiaServiceService) {
        this.display = 'none';
    }

    ngOnInit() {
        this.display = 'block';
        this.grupos_siia_service.get_grupos_siia().subscribe(
            data => this.ok_get_grupos_siia(data),
            error => this.error_get_grupos_siia(error)
        );
    }

    ok_get_grupos_siia(data) {
        this.display = 'none';
        this.lista_grupos = data.data;
        // console.log(data);
    }

    error_get_grupos_siia(error) {
        this.display = 'none';
        this.error = error.message;
        // console.log(error);
    }
}
