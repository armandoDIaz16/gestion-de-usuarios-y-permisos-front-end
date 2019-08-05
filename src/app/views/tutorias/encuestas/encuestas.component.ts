import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-encuestas',
    templateUrl: './encuestas.component.html',
    styleUrls: ['./encuestas.component.scss']
})
export class EncuestasComponent implements OnInit {

    private hay_encuestas   = null;
    private array_encuestas = null;

    constructor() {
        this.hay_encuestas   = false;
        this.array_encuestas = [
            {
                numero: 1,
                nombre: 'Encuesta 1',
                fechaa: '16/05/2019',
                fechar: '17/05/2019',
                estatus: 'activo'

            }
        ];
    }

    ngOnInit() {
    }

}
