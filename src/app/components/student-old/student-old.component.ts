import {Component, OnInit} from '@angular/core';
import {JarwisService} from '../../services/jarwis.service';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
    templateUrl: './student-old.component.html',
    styleUrls: ['./student-old.component.scss']
})
export class StudentOldComponent implements OnInit {

    public get_datos_alumno(){
        let json = JSON.parse(localStorage.getItem('datos_alumno'));
        return json;
    }

  	public datos_alumno = this.get_datos_alumno();

    public form = {
        email: null,
        //name:null,
        numero_control:   this.datos_alumno.numero_control,
        name:             this.datos_alumno.nombre,
        PRIMER_APELLIDO:  this.datos_alumno.primer_apellido,
        SEGUNDO_APELLIDO: this.datos_alumno.segundo_apellido,
        password: null,
        password_confirmation: null,
        curp: null,
        //PRIMER_APELLIDO:'chavez',
        //SEGUNDO_APELLIDO:'barajas',
        /*  FECHA_NACIMIENTO:'2019-01-11',
          CURP: 'cabe960224hgthrd02',
          ESTADO:1,
          TELEFONO_CASA: '4771234567',
          TELEFONO_MOVIL: '4771234567',
          CORREO1:'14240683@itleon.edu.mx' ,
          CORREO2: '14240683@itleon.edu.mx' ,
          CORREO_INSTITUCIONAL: '14240683@itleon.edu.mx' ,
          //CONTRASENIA:'123' ,
          CALLE:'lomas',
          NUMERO_EXTERIOR: '12',
          NUMERO_INTERIOR: '2014',
          NACIONALIDAD: 'mexicana',
          SEXO: 'm',
          TIPO_SANGUINEO: 'o+',
          NSS: '1222114',
          NOMBRE_CONTACTO: 'juan',
          TELEFONO_CONTACTO: '4771234567',
          CORREO_CONTACTO: '14240683@itleon.edu.mx' ,
          FK_COLONIA:1 ,
          FK_ESTADO_CIVIL: 1 ,
          FK_USUARIO_REGISTRO: 1 ,
          FECHA_REGISTRO: '2019-01-11',
          FK_USUARIO_MODIFICACION:1 ,
          FECHA_MODIFICACION:'2019-01-11',
          BORRADO:'0' */
    };

    public error = [];

  constructor(private Jarwis: JarwisService,
                private Token: TokenService,
                private router: Router) {
    }

    onSubmit() {
        this.Jarwis.signup(this.form).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }

    handleResponse(data) {
        //this.Token.handle(data.access_token);
        localStorage.clear();
        this.router.navigateByUrl('/login');
    }


    handleError(error) {
        this.error = error.error.errors;
    }

    ngOnInit() {
    }

}
