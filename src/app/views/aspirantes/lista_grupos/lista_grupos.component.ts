import { Component, OnInit } from '@angular/core';
import { LugarExamenService } from '../../../services/lugar-examen.service';
import { AspiranteService } from '../../../services/aspirante.service';


@Component({
  selector: 'app-lista_grupos',
  templateUrl: './lista_grupos.component.html',
  styleUrls: ['./lista_grupos.component.scss'],
  providers: [LugarExamenService,
  AspiranteService]
})
export class ListaGruposComponent implements OnInit {
  constructor(private lugarExamenService: LugarExamenService,
    private aspiranteService: AspiranteService) {
  }

  public espacioLista = [];
  public diaLista = [];
  public horaLista = [];
  public aspirantes = [];
  public espacio = null;
  public dia = null;
  public hora = null;

  ngOnInit() {
    this.lugarExamenService.getEspacio().subscribe(data => this.espacioLista = data);
    this.lugarExamenService.getTurno().subscribe(data =>{ 
      this.diaLista = data[0].DIAS;
      this.horaLista = data[0].HORAS;
    });
  }

  generarLista(){
    this.aspiranteService.getGrupos(this.espacio,this.dia,this.hora).subscribe(data => this.aspirantes = data);
  }
}