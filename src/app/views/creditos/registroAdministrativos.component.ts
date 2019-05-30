import { Component } from '@angular/core';
import { CreditosService } from '../../services/creditos.service';
import { Router} from '@angular/router';

@Component({
    templateUrl: './registroAdministrativos.component.html'
  })

  export class registroAdministrativosComponent {

    public form = {
        email: null,
        name: null,
        PRIMER_APELLIDO:  null,
        SEGUNDO_APELLIDO: null,
        password: null,
        password_confirmation: null,
        curp: null,
    }

    constructor(private creditosService: CreditosService, private router: Router){


    }

    registrar(){
        this.creditosService.singupAdmin(this.form).subscribe(
            data => this.handleResponse(),
            error => this.handleError()
        );
    }

    handleResponse() {
        //this.Token.handle(data.access_token);
        alert("Usuario registrado correctamente");
        this.router.navigate(['./creditos/registro_administrativos']);
        //this.router.navigateByUrl('./login');
    }

    handleError() {
        alert("Ocurrió un error");
    }


  }