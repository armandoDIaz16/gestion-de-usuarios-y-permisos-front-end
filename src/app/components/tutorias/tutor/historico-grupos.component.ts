import {Component, OnInit, ViewChild} from '@angular/core';
import {InterfaceHistoricoGrupoTutoria} from '../../../models/tutorias/GrupoModel';
import {GruposService} from '../../../services/grupos.service';

@Component({
    selector: 'app-historico-grupos',
    templateUrl: '../../../views/tutorias/tutor/historico-grupos.component.html',
    styleUrls: ['../../../views/tutorias/tutor/historico-grupos.component.scss']
})
export class HistoricoGruposComponent implements OnInit {

    public error = null;
    public lista_grupos: InterfaceHistoricoGrupoTutoria[];
    public display = 'block';

    @ViewChild('loaderModal') loaderModal;

    constructor(private grupos_service: GruposService) {
        this.lista_grupos = <InterfaceHistoricoGrupoTutoria[]>{};
    }

    ngOnInit() {
        this.grupos_service.get_historico_grupos().subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }

    handleResponse(data) {
        if (data.data) {
            this.display = 'none';
            this.lista_grupos = data.data;
        }
    }

    handleError(error) {
        this.error = error.error;
        this.display = 'none';
    }
}
