import { Component } from '@angular/core';
import { Actividad } from './interfaces/actividad';
import {UsuarioActividad } from './interfaces/usuarioActividad';
import { CreditosService } from '../../services/creditos.service';
import { ActivatedRoute, Router} from '@angular/router'; 

@Component({
    templateUrl: './detalleActividad.component.html'
})

export class DetalleActividadComponent {
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
  };

    actividadInscrita: Actividad = {
    NOMBRE: null,
    DESCRIPCION: null,
    LUGAR: null,
    FECHA: null,
    HORA: null,
    CUPO: null,
    FK_LINEAMIENTO: null,
    FK_TIPO: null,
    FK_RESPONSABLE: null,
    };

    id: any;
    actividades: Actividad[];
    actividadesInscritas: Actividad[];
    inscrito: boolean = true;
    idAlumno= sessionStorage.getItem('IdUsuario');

    usuarioActividades: UsuarioActividad = {
      FK_ACTIVIDAD: null,
      FK_ALUMNO:  null
    };
    

    constructor(private actividadesService: CreditosService, private activatedRoute: ActivatedRoute, private router: Router){
        this.getActividad();
        this.botonInscribir();
    }

    getActividad(){
        this.id = this.activatedRoute.snapshot.params['id'];
        this.actividadesService.getActividades().subscribe((data: Actividad[])=>{
            this.actividades = data;
            this.actividad = this.actividades.find((m)=>{return m.PK_ACTIVIDAD == this.id});
            console.log(this.actividad);
          },(error)=>{
            console.log(error);
          });
    }

    botonInscribir(){
      this.id = this.activatedRoute.snapshot.params['id'];
      this.actividadesService.getActividadesInscitas(this.idAlumno).subscribe((data: Actividad[])=>{
        this.actividadesInscritas = data;
        this.actividadInscrita = this.actividadesInscritas.find((m)=>{return m.PK_ACTIVIDAD == this.id});
        //if(Object.keys(this.actividadInscrita).length === 0){
        if(this.actividadInscrita == null){
          this.inscrito = false;
        }
      },(error)=>{
        alert('Ocurrio un error');
        console.log(error);
      });

    }


    registrarse(id_actividad, registrados, cupo){
      console.log(id_actividad," ",registrados, " ",cupo);
      if(confirm("¿Estas seguro que deseas registrarte en esta actividad?. Recibiras un correo con tu codigo de pase")){
      if(registrados < cupo){
        this.usuarioActividades.FK_ACTIVIDAD = id_actividad;
        this.usuarioActividades.FK_ALUMNO = sessionStorage.getItem('IdUsuario');

        //console.log(this.usuarioActividades.FK_ACTIVIDAD," ",this.usuarioActividades.FK_ALUMNO);
  
        this.actividadesService.saveAlumnoActividad(this.usuarioActividades).subscribe((data)=>{
        alert("Te has registrado. Revisa tu correo");
        this.router.navigate(['./creditos/actividades']);
        },(error)=>{
        alert("ocurrio un error");
        console.log(error);
        }); 

      }else{
        alert("ya no hay lugares disponibles");
      }
    }
    
  }
    
}