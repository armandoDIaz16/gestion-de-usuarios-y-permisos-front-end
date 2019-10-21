import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../../services/formulario.service';
import { AspiranteService } from '../../services/aspirante.service';
import { PeriodoService } from '../../services/periodo.service';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  providers: [
    FormularioService,
    PeriodoService,
    AspiranteService]
})
export class FormularioComponent implements OnInit {
  formGroup: FormGroup | null = null;
  //form: FormGroup;
  discapacidades = "";

  habilitarNacionalidad = true;
  habilitarNacionalidadOtro = true;
  habilitarAyuda = true;
  habilitarUniversidad = true;

  genero = null;
  estadoCivil = null;
  nacioPais = null;
  nacioEntidadFederativa = null;
  contactoEntidadFederativa = null;
  contactoCiudad = null;
  nacioCiudad = null;
  especialidad1 = null;
  especialidad2 = null;
  escuelaEstado = null;
  escuelaMunicio = null;
  escuela = null;
  institucion = null;
  carreraUniversidad = null;
  dependencia = null;
  trabajas = null;
  propaganda = null;

  CURP = null;
  nombre = null;
  pApellido = null;
  sApellido = null;
  fechaNacimiento = null;
  calle = null;
  numExt = null;
  numInt = null;
  colonia = null;
  localidad = null;
  cp = null;
  tFijo = null;
  tMovil = null;
  correo = null;
  correo2 = null;
  nombrePadre = null;
  nombreMadre = null;
  incapacidad = null;
  ayuda = null;
  nacionalidad = null;
  escuelaEspecialidad = null;
  promedio = null;

  activado = false;
  pkPeriodo = null;
  fechaInicio = null;
  fechaFin = null;
  fechaActual = null;

  mensaje0 = null;
  mensaje1 = null;
  mensaje2 = null;
  cerrarModal = false;
  respuesta = null;
  lenguaIndigena = null;


  public estadoCivilLista = [];
  public dependenciaLista = [];
  public propagandaTecnologicoLista = [];
  public incapacidadLista = [];
  public carreraLista = [];
  public entidadFederativaLista = [];
  public ciudadLista = [];
  public ciudadLista2 = [];
  public ciudadLista3 = [];
  public universidadLista = [];
  public carreraUniversidadLista = [];
  public bachilleratoLista = [];
  public coloniaLista = [];

  constructor(private formBuilder: FormBuilder,
    //private fb: FormBuilder,
    private periodoService: PeriodoService,
    private formularioService: FormularioService,
    private aspiranteService: AspiranteService,
    private router: Router) {
    this.formGroup = this.formBuilder.group({
      incapacidadLista: new FormArray([], minSelectedCheckboxes(0)),
      CORREO1: ['', [Validators.required]],
      repeat_CORREO1: ''
    });
    this.formularioService.getIncapacidad().subscribe(data => {
      this.incapacidadLista = data;
      this.addCheckboxes();
    });
    /*     this.formGroup = this.fb.group({
          CORREO1: ['', [Validators.required]],
          repeat_CORREO1: ''
        }); */

    this.formGroup.get('repeat_CORREO1').setValidators(
      CustomValidators.equals(this.formGroup.get('CORREO1'))
    );
  }


  ngOnInit() {
    this.periodoService.getPeriodo().subscribe(data => {
      this.pkPeriodo = data[0].PK_PERIODO_PREFICHAS;
      this.fechaInicio = data[0].FECHA_INICIO;
      this.fechaFin = data[0].FECHA_FIN;
      this.fechaActual = data[0].FECHA_ACTUAL;
      if(this.compararFechas()){
        return;
      }
      this.formularioService.getCarrera2(this.pkPeriodo).subscribe(data => this.carreraLista = data);
      this.formularioService.getEstadoCivil().subscribe(data => this.estadoCivilLista = data);
      this.formularioService.getDependencia().subscribe(data => this.dependenciaLista = data);
      this.formularioService.getPropagandaTecnologico().subscribe(data => this.propagandaTecnologicoLista = data);
      this.formularioService.getEntidadFederativa().subscribe(data => this.entidadFederativaLista = data);
      this.formularioService.getUniversidad().subscribe(data => this.universidadLista = data);
      this.formularioService.getCarreraUniversidad().subscribe(data => this.carreraUniversidadLista = data);
    });
  }

  compararFechas() {
    var fechaInicio = this.fechaInicio.split('-');
    var fechaFin = this.fechaFin.split('-');
    var fechaActual = this.fechaActual.split('-');
    var fechaInicio2 = new Date(fechaInicio[0], (fechaInicio[1] - 1), fechaInicio[2]);
    var fechaFin2 = new Date(fechaFin[0], (fechaFin[1] - 1), fechaFin[2]);
    var fechaActual2 = new Date(fechaActual[0], (fechaActual[1] - 1), fechaActual[2]);
    if (fechaActual2 >= fechaInicio2 && fechaActual2 <= fechaFin2) {
      //console.log('La fecha esta en el rango');
      this.activado = true;
    } else {
      return true;
      //console.log('La fecha no esta en el rango');
    }
  }

  cargarCiudades() {
    //localStorage.setItem("nacioEntidadFederativa", this.nacioEntidadFederativa);
    this.formularioService.getCiudad(this.nacioEntidadFederativa).subscribe(data => this.ciudadLista = data);
  }
  cargarCiudades2() {
    //localStorage.setItem("nacioEntidadFederativa", this.nacioEntidadFederativa);
    this.formularioService.getCiudad(this.escuelaEstado).subscribe(data => this.ciudadLista2 = data);
  }
  cargarCiudades3() {
    //localStorage.setItem("nacioEntidadFederativa", this.nacioEntidadFederativa);
    this.formularioService.getCiudad(this.contactoEntidadFederativa).subscribe(data => this.ciudadLista3 = data);
  }
  cargarColonias() {
    //localStorage.setItem("nacioEntidadFederativa", this.nacioEntidadFederativa);
    this.formularioService.getColonia(this.cp).subscribe(data => this.coloniaLista = data);
  }
  cargarEscuelas() {
    //localStorage.setItem("nacioEntidadFederativa", this.nacioEntidadFederativa);
    this.formularioService.getBachillerato(this.escuelaMunicio).subscribe(data => this.bachilleratoLista = data);
  }

  validarPromedio() {
    if (this.promedio >= 10) {
      this.promedio = 10.0;
    } else if (this.promedio <= 0) {
      this.promedio = 0.0;
    }
  }



  habilitarAyuda2() {
    const selectedOrderIds = this.formGroup.value.incapacidadLista
      .map((v, i) => v ? this.incapacidadLista[i].PK_INCAPACIDAD : null)
      .filter(v => v !== null);
    this.discapacidades = "";
    for (var sistema in selectedOrderIds) {
      /*         this.discapacidades.push(
                selectedOrderIds[sistema]
                );   */
      if (this.discapacidades == "") {
        this.discapacidades = selectedOrderIds[sistema];
      } else {
        this.discapacidades = this.discapacidades + "," + selectedOrderIds[sistema];
      }
    }
    //console.log(this.discapacidades);
    //console.log(selectedOrderIds);
    if (selectedOrderIds.length == 0) {
      this.habilitarAyuda = true;
      this.ayuda = null;
    } else {
      this.habilitarAyuda = false;
    }

  }
  compararCarreras1() {
    if (this.especialidad1 == this.especialidad2) {
      this.especialidad2 = null;
    }
  }
  compararCarreras2() {
    if (this.especialidad1 == this.especialidad2) {
      this.especialidad1 = null;
    }
  }

  habilitarUniversidad2() {
    if (this.institucion == "ninguna") {
      this.habilitarUniversidad = true;
      this.carreraUniversidad = null;
    } else {
      this.habilitarUniversidad = false;
    }
  }

  habilitarNacionalidad2() {
    if (this.nacioPais == 1) {
      this.habilitarNacionalidad = false;
      this.habilitarNacionalidadOtro = true;
      this.nacionalidad = null;
    } else if (this.nacioPais == 2) {
      this.habilitarNacionalidad = true;
      this.habilitarNacionalidadOtro = false;
      this.nacioEntidadFederativa = null;
      this.nacioCiudad = null;
      this.ciudadLista = null;
    } else {
      this.habilitarNacionalidad = true;
      this.habilitarNacionalidadOtro = true;
      this.nacioEntidadFederativa = null;
      this.nacioCiudad = null;
      this.nacionalidad = null;
      this.ciudadLista = null;
    }
  }
  async onSubmit() {
    if (this.colonia == 0) {
      this.colonia = "null";
    }
    if (this.sApellido == null) {
      this.sApellido = ""
    }
    if (this.numInt == null) {
      this.numInt = ""
    }
    if (this.tMovil == null) {
      this.tMovil = ""
    }
    if (this.especialidad2 == null) {
      this.especialidad2 = "null"
    }
    if (this.nombreMadre == null) {
      this.nombreMadre = ""
    }
    if (this.ayuda == null) {
      this.ayuda = ""
    }
    if (this.nacioEntidadFederativa == null) {
      this.nacioEntidadFederativa = "null"
    }
    if (this.nacioCiudad == null) {
      this.nacioCiudad = "null"
    }
    if (this.nacionalidad == null) {
      this.nacionalidad = ""
    }
    if (this.institucion == "ninguna") {
      this.institucion = "null"
    }
    if (this.carreraUniversidad == null) {
      this.carreraUniversidad = "null"
    }
    if (this.lenguaIndigena == null) {
      this.lenguaIndigena = ""
    }
    const data = await this.aspiranteService.addAspirante(
      {
        "PK_PERIODO": this.pkPeriodo,
        "NOMBRE": "'" + this.nombre.toUpperCase() + "'",
        "PRIMER_APELLIDO": "'" + this.pApellido.toUpperCase() + "'",
        "SEGUNDO_APELLIDO": "'" + this.sApellido.toUpperCase() + "'",
        "FECHA_NACIMIENTO": "'" + this.fechaNacimiento + "'",
        "SEXO": this.genero,
        "CURP": "'" + this.CURP + "'",
        "FK_ESTADO_CIVIL": this.estadoCivil,
        "CALLE": "'" + this.calle + "'",
        "NUMERO_EXTERIOR": "'" + this.numExt + "'",
        "NUMERO_INTERIOR": "'" + this.numInt + "'",
        "CP": "'" + this.cp + "'",
        "FK_COLONIA": this.colonia,
        "TELEFONO_CASA": "'" + this.tFijo + "'",
        "TELEFONO_MOVIL": "'" + this.tMovil + "'",
        "CORREO1": "'" + this.formGroup.get('CORREO1').value.replace(' ','') + "'",
        "PADRE_TUTOR": "'" + this.nombrePadre + "'",
        "MADRE": "'" + this.nombreMadre + "'",
        "FK_BACHILLERATO": this.escuela,
        "ESPECIALIDAD": "'" + this.escuelaEspecialidad + "'",
        "PROMEDIO": "'" + this.promedio + "'",
        "NACIONALIDAD": "'" + this.nacionalidad + "'",
        "FK_CIUDAD": this.nacioCiudad,
        "FK_CARRERA_1": this.especialidad1,
        "FK_CARRERA_2": this.especialidad2,
        "FK_PROPAGANDA_TECNOLOGICO": this.propaganda,
        "FK_UNIVERSIDAD": this.institucion,
        "FK_CARRERA_UNIVERSIDAD": this.carreraUniversidad,
        "FK_DEPENDENCIA": this.dependencia,
        "TRABAJAS_Y_ESTUDIAS": this.trabajas,
        "AYUDA_INCAPACIDAD": "'" + this.ayuda + "'",
        "DISCAPASIDADES": this.discapacidades,
        "LENGUA_INDIGENA": "'" + this.lenguaIndigena + "'"
      });
    switch (data[0].RESPUESTA) {
      case '1':
        this.mensaje1 = "YA ESTA REGISTRADA ESA CURP EN ESTE PERIODO";
        this.cerrarModal = true;
        break;
      case '2':
        this.mensaje1 = "YA ESTA REGISTRADO ESE CORREO A OTRO USUARIO";
        this.cerrarModal = true;
        break;
      case '3':
        this.mensaje0 = "SE ACTUALIZO USUARIO Y SE REGISTRO LA PREFICHA";
        this.mensaje2 = "REGISTRO COMPLETO, REVISTA TU BANDEJA DE CORREO";
        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 30000);

        break;
      case '4':
        this.mensaje1 = "YA ESTA REGISTRADO ESE CORREO A OTRO USUARIO";
        this.cerrarModal = true;
        break;
      case '5':
        this.mensaje0 = "Te has registrado correctamente, "
          + "hemos enviado un correo electrónico para que realices la activación de tu cuenta.";
        this.mensaje1 = "Recuerda revisar tu bandeja de correo no deseado";
        this.mensaje2 = "(Esta ventana se cerrará automáticamente en 30 segundos)";
        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 30000);
        break;
    }
  }
  private addCheckboxes() {
    this.incapacidadLista.map((o, i) => {
      const control = new FormControl(i === null); // if first item set to true, else false
      (this.formGroup.controls.incapacidadLista as FormArray).push(control);
    });
  }
}
function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : { required: true };
  };
  return validator;
}

function equalsValidator(otherControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const value: any = control.value;
    const otherValue: any = otherControl.value;
    return otherValue === value ? null : { 'notEquals': { value, otherValue } };
  };
}

export const CustomValidators = {
  equals: equalsValidator
};