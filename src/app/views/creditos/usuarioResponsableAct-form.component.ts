import { Component } from '@angular/core';
import { CreditosService } from '../../services/creditos.service';
import { Usuario } from './interfaces/usuario';
import { Router} from '@angular/router';

@Component({
    templateUrl: './usuarioResponsableAct-form.component.html'
  })

  export class UsuarioResponsableActFormComponent {

    curp: any;
    usuario: Usuario[];


    constructor(private creditosService: CreditosService, private router: Router){

    }

    getUsuario(){
        this.creditosService.getUsuarioByCurp(this.curp).subscribe((data: Usuario[])=>{
            this.usuario = data;
        })
    }

    agregar(pk_usuario){
        this.creditosService.AgregarUsuarioRA(pk_usuario).subscribe(
            data=>{alert("Agregado correctamente");
            this.router.navigate(['./creditos']);
        },
            error=>alert("Ocurrio un error")
            );

    }
  }