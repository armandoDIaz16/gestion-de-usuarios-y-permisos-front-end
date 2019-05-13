import { Component, OnInit } from '@angular/core';
import { SalonService } from '../../../services/salon.service';
import { TurnoService } from '../../../services/turno.service';
import { AspiranteService } from '../../../services/aspirante.service';


@Component({
  selector: 'app-lista_grupos',
  templateUrl: './lista_grupos.component.html',
  styleUrls: ['./lista_grupos.component.scss'],
  providers: [SalonService,
    TurnoService,
  AspiranteService]
})
export class ListaGruposComponent implements OnInit {
  constructor(private salonService: SalonService,
    private turnoService: TurnoService,
    private aspiranteService: AspiranteService) {
  }

  public salonLista = [];
  public turnoLista = [];
  public aspirantes = [];
  public salon = null;
  public dia = null;
  public hora = null;

  ngOnInit() {
    this.salonService.getSalon().subscribe(data => this.salonLista = data);
    this.turnoService.getTurno().subscribe(data => this.turnoLista = data);
  }

  generarLista(){
    this.aspiranteService.getGrupos(this.salon,this.dia,this.hora).subscribe(data => this.aspirantes = data);
  }
}