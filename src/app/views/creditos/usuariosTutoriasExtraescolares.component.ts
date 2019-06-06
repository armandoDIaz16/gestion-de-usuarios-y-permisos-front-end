import { Component } from '@angular/core';
import { CreditosService } from '../../services/creditos.service';
import { Usuario } from './interfaces/usuario';
import { Router} from '@angular/router';

@Component({
    templateUrl: './usuarioJefeCarrera-form.component.html'
  })

  export class UsuariosTutoriasExtraescolaresComponent {
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
        this.creditosService.AgregarUsuarioTE(pk_usuario).subscribe(
            data=>{alert("Agregado correctamente");
            this.router.navigate(['./creditos']);
        },
            error=>alert("Ocurrio un error")
            );

    }

  }