import { Component, OnInit } from '@angular/core';

import { Actividad } from './interfaces/actividad';
import { Lineamiento } from './interfaces/lineamiento'
import { Tipo } from './interfaces/tipo';
import { Responsable } from './interfaces/responsable';

import { CreditosService } from '../../services/creditos.service';

import { ActivatedRoute, Router} from '@angular/router'; 
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-gestion-actividades-form',
  templateUrl: './gestion-actividades-form.component.html',
})
export class GestionActividadesFormComponent implements OnInit {

  actividad: Actividad = {
    NOMBRE: null,
    DESCRIPCION: null,
    LUGAR: null,
    FECHA: null,
    HORA: null,
    CUPO: null,
    FK_LINEAMIENTO: null,
    FK_TIPO: null,
    FK_RESPONSABLE: null,
    IMAGEN: null
  };

  titulo: string = "Registrar Actividad";
  id: any;
  editing: boolean = false;
  actividades: Actividad[];
  pruebal = "Tutoria 2";

  /*-------*/
  lineamientos: Lineamiento[];
  tipos: Tipo[];
  responsables: Responsable[];

  constructor(private actividadesService: CreditosService, private activatedRoute: ActivatedRoute, private router: Router) { 
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id){
      this.titulo = "Editar actividad";
      this.editing = true;
      this.actividadesService.getActividadesRaw().subscribe((data: Actividad[])=>{
        this.actividades = data;
        this.actividad = this.actividades.find((m)=>{return m.PK_ACTIVIDAD == this.id});
        console.log(this.actividad);
      },(error)=>{
        console.log(error);
      });
    }
    

    this.actividadesService.getTipos().subscribe((data: Tipo[])=>{
      this.tipos = data;
    });

    this.actividadesService.getResponsables().subscribe((data: Responsable[])=>{
      this.responsables = data;
    });

    this.actividadesService.get().subscribe((data: Lineamiento[])=>{
      this.lineamientos = data;
    });
  }

  saveActividad(){
    console.log(this.actividad);
    if(this.editing){
      this.actividadesService.putActividades(this.actividad).subscribe((data)=>{
        alert("Actividad actualizada correctamente");
        this.router.navigate(['./creditos/gestion_de_actividades']);
      },(error)=>{
        alert("ocurrio un error" + error);
        console.log(error);
      })
      
    }else{
      this.actividadesService.saveActividades(this.actividad).subscribe((data)=>{
        alert("Actividad registrada correctamente");
        this.router.navigate(['./creditos/gestion_de_actividades']);
      },(error)=>{
        alert("ocurrio un error" + error);
        console.log(error);
      })

    }
  }

  onDropdownChange(e){
    this.actividad.FK_LINEAMIENTO = e //if you want to bind it to your model
    console.log('FK_LINEAMIENTO: ' + this.actividad.FK_LINEAMIENTO);
  }
  onDropdownChange1(e){
    this.actividad.FK_TIPO = e //if you want to bind it to your model
    console.log('FK_TIPO: ' + this.actividad.FK_TIPO);
  }
  onDropdownChange2(e){
    this.actividad.FK_RESPONSABLE = e //if you want to bind it to your model
    console.log('FK_RESPONSABLE: ' + this.actividad.FK_RESPONSABLE);
  }

  ngOnInit() {
  }


}
