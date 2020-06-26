import {Component, OnInit, ViewChild} from '@angular/core';
import {EncuestasService} from '../../../services/tutorias/encuestas.service';

@Component({
    selector: 'app-encuestas',
    templateUrl: '../../../views/tutorias/estudiante/encuestas.component.html',
    styleUrls: ['../../../views/tutorias/estudiante/encuestas.component.scss']
})
export class EncuestasComponent implements OnInit {

    public hay_encuestas = null;
    public lista_encuestas: null;
    public periodo_select = null;

    @ViewChild('loaderModal') loaderModal;
    public display: string;
    public lista_periodos = [];

    constructor(private encuestas_service: EncuestasService) {
        this.hay_encuestas = false;
        this.display = 'none';
    }

    ngOnInit() {
        // buscar periodos
        // this.buscar_periodos();
        // buscar encuestas
        this.buscar_encuestas();
    }

    buscar_periodos() {
        this.display = 'block';
        this.hay_encuestas = false;
        this.encuestas_service.get_periodos_encuestas(sessionStorage.getItem('IdEncriptada')).subscribe(
            (data) => {
                if (data.data.length > 0) {
                    this.periodo_select = data.data[0].PERIODO;
                }
                this.lista_periodos = data.data;
            },
            () => {
                alert('Ha ocurrido un error');
            },
            () => {
                this.display = 'none';
            }
        );
    }

    buscar_encuestas() {
        this.display = 'block';
        this.hay_encuestas = false;
        this.encuestas_service.get_encuestas(sessionStorage.getItem('IdEncriptada')).subscribe(
            (data) => {
                this.hay_encuestas = true;
                this.lista_encuestas = data.data;
            },
            () => {
                alert('Ha ocurrido un error');
            },
            () => {
                this.display = 'none';
            }
        );
    }
}
