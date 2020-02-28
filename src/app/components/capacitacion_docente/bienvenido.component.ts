import { Component, OnInit } from '@angular/core';
import { CursoCadoService } from '../../services/capacitacion_docente/curso-cado.service';

@Component({
  selector: 'app-bienvenido',
  templateUrl: '../../views/capacitacion_docente/bienvenido.component.html',
    styleUrls: ['../../views/capacitacion_docente/cado-component.style.scss']
})
export class BienvenidoComponent implements OnInit {
public  usuario: object; // = sessionStorage.getItem('permisos');
public  participante: object;

  constructor(private curso_service: CursoCadoService) {
      this.usuario = JSON.parse( sessionStorage.getItem('permisos'));
      console.log(this.usuario);
      console.log(this.usuario['nombre_usuario']);
      this.cargar_participante();
  }

  ngOnInit() {
  }
    cargar_participante() {
        this.participante  = null;

        this.curso_service.consulta_participante(this.usuario['numero_control']).subscribe (
            data => {
                this.participante = data;
                console.log(this.participante);
                sessionStorage.setItem('participante', this.participante['PK_PARTICIPANTE_CADO']);
                sessionStorage.setItem('tipo_participante', this.participante['FK_TIPO_PARTICIPANTE']);
            },
            error => {
                sessionStorage.setItem('participante', '0');
            }
        );
    }
}
