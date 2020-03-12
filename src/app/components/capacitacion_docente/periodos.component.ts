// Angular libs
import { Component, OnInit, ViewChild } from '@angular/core';
// Services
import { PeriodosCadoService } from '../../services/capacitacion_docente/periodos-cado.service';
// Modelos
import { Periodo } from '../../models/capacitacion_docente/cado-model.model';
// Funciones
import { formatDate } from '@angular/common';
// Iconos
import { faEdit, faTrashAlt, faPlus, faHdd, faTimes, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
// SweetAlert2
import Swal from 'sweetalert2';

@Component({
  selector: 'app-periodos',
  templateUrl: '../../views/capacitacion_docente/periodos.component.html',
  styleUrls: ['../../views/capacitacion_docente/cado-component.style.scss']
})
export class PeriodosComponent implements OnInit {

    // Modales
  @ViewChild('loaderModal') loaderModal;
  @ViewChild('loaderModalEdit')loaderModalEdit;
    @ViewChild('loaderModal2') loaderModal2;
    public display: string;

  // iconos
    edit = faEdit;
    delete = faTrashAlt;
    add = faPlus;
    save = faHdd;
    cancel = faTimes;
    date = faCalendarAlt;

  periodo: Periodo = {
    pk_periodo_cado : -1,
    nombre_periodo:  '',
    fecha_inicio:   null,
    fecha_fin:     null
    // estado_periodo:  1
  };

  public receptor;
  public validado = false;
  public fecha_actual_sistema = new Date();
  public lista_periodos: object;
  public lista_periodos_con_cursos: Array<Object>;

  constructor(private periodo_service: PeriodosCadoService) {
    // this._init_components();
   }

  ngOnInit() {
    this.lista_periodos = null;
    this.display = 'block';
    // llamada servicio consulta
    this.periodo_service.consulta_periodos().subscribe(
      data => {
        this.lista_periodos = data;
        // let {} = this.lista_periodos;
        // tslint:disable-next-line: forin
          console.log(this.lista_periodos);
        for ( const i in this.lista_periodos) {
          const fecha = new Date(this.lista_periodos[i].FECHA_FIN);
          this.lista_periodos[i].FECHA_FIN = fecha;
        }
          this.display = 'none';
      },
      error => {
          this.display = 'none';

          Swal.fire({
              icon: 'error',
              title: '¡Lo sentimos ha ocurrido un error, intentalo más tarde!',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              // timer: 2000
          });
      }
    );
  }

  editar_periodo(pk_periodo: number) {
    console.log(pk_periodo);
    this.periodo_service.busca_un_periodo(pk_periodo).subscribe(
      data => {  // cuando sale bien todo
        if (data) {
          console.log(data);
          this.receptor = data;
          this.periodo.pk_periodo_cado = this.receptor.PK_PERIODO_CADO;
          this.periodo.nombre_periodo = this.receptor.NOMBRE_PERIODO;
          this.periodo.fecha_inicio = formatDate(new Date(this.receptor.FECHA_INICIO), 'yyyy-MM-dd', 'en-US', '');
          this.periodo.fecha_fin = formatDate(new Date(this.receptor.FECHA_FIN), 'yyyy-MM-dd', 'en-US', '');
          this.validado = false;
          this.loaderModalEdit.show();
        }
      },
      error => { // cuando ocurre un error
          Swal.fire({
              icon: 'error',
              title: '¡Lo sentimos ha ocurrido un error, intentalo más tarde!',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              // timer: 2000
          });
      }
  );

  }

  eliminar_periodo(pk_periodo: number) {
    // console.log(pk_periodo); todo validar que no tenga cursos asignados activos y avisar que debe dar de baja primero los cursos
      this.periodo_service.busca_periodo_con_cursos(pk_periodo).subscribe(
          data => {
              console.log(data);
              this.lista_periodos_con_cursos = [];
              for ( const i in data) {
                  this.lista_periodos_con_cursos.push( this.lista_periodos_con_cursos[i] );
              }

              if (this.lista_periodos_con_cursos.length > 0) {
                  Swal.fire({
                      icon: 'warning',
                      title: '¡No se puede eliminar un Periodo con Cursos Asignados, elimine primero los cursos del Periodo!',
                      showConfirmButton: true,
                      confirmButtonText: 'OK',
                  });
                  return false;
              } else {
                  // eliminar periodo
                  Swal.fire({
                      title: '¿Está seguro que desea eliminar el  periodo?',
                      // text: "You won't be able to revert this!",
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Continuar'
                  }).then((result) => {
                      if (result.value) {
                          // definiendo body
                          let body = {
                              pk_periodo_cado: pk_periodo
                          };
                          // eliminar mediante WS
                          this.periodo_service.eliminar_periodo(body).subscribe(
                              data => {  // cuando sale bien todo
                                  if (data) {
                                      this._init_components();
                                      Swal.fire({
                                          icon: 'success',
                                          title: '¡Se ha eliminado el periodo correctamente!',
                                          showConfirmButton: true,
                                          confirmButtonText: 'OK',
                                          // timer: 2000
                                      });
                                      this.ngOnInit();
                                      //  volver a consultar los periodos
                                  }
                              },
                              error => { // cuando ocurre un error
                                  Swal.fire({
                                      icon: 'error',
                                      title: '¡Lo sentimos ha ocurrido un error, intentalo más tarde!',
                                      showConfirmButton: true,
                                      confirmButtonText: 'OK',
                                      // timer: 2000
                                  });
                              }
                          ); // fin subscribe eliminar periodo
                      } // fin confirmacion
                  }); // fin confirmacion alert
              } // fin else
          }, // fin data
          error => { // cuando ocurre un error
              Swal.fire({
                  icon: 'error',
                  title: '¡Lo sentimos ha ocurrido un error, intentalo más tarde!',
                  showConfirmButton: true,
                  confirmButtonText: 'OK',
                  // timer: 2000
              }); // fin error
          } // fin error al busca_periodo_con_cursos
      );// fin busca_periodo_con_cursos

  }

  registra_periodo() {
    // console.log(this.periodo.fecha_fin);
    // console.log(this.fecha_actual_sistema);
    if (this.valida_form()) {
        Swal.fire({
            title: '¿Está seguro que desea registrar el nuevo periodo?',
            // text: "You won't be able to revert this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar'
        }).then((result) => {
            if (result.value) {
                // definiendo body
                let body = {
                    nombre_periodo: this.periodo.nombre_periodo,
                    fecha_inicio:   this.periodo.fecha_inicio,
                    fecha_fin:      this.periodo.fecha_fin
                    // tipo_periodo:   this.periodo.estado_periodo
                };

                // registrar mediante WS
                this.periodo_service.registra_periodo(body).subscribe(
                    data => {  // cuando sale bien todo
                        if (data) {
                            this._init_components();
                            this.loaderModal.hide();
                            Swal.fire({
                                icon: 'success',
                                title: '¡Se ha registrado el nuevo periodo correctamente!',
                                showConfirmButton: true,
                                confirmButtonText: 'OK',
                                // timer: 2000
                            });
                            // alert('Se ha registrado el periodo');
                            //  volver a consultar los periodos
                            this.ngOnInit();
                        }
                    },
                    error => { // cuando ocurre un error
                        // alert('Ha ocurrido un error');
                        Swal.fire({
                            icon: 'error',
                            title: '¡Lo sentimos ha ocurrido un error, intentalo más tarde!',
                            showConfirmButton: true,
                            confirmButtonText: 'OK',
                            // timer: 2000
                        });
                    }
                );

                // this.ngOnInit();
            }
        });
    }
  }

  valida_form() {
    if (this.periodo.nombre_periodo.trim() === '') {
        Swal.fire({
            icon: 'info',
            title: 'Debes indicar el nombre del periodo',
            showConfirmButton: true,
            confirmButtonText: 'OK',
            // timer: 2000
        });
        // alert('Debes indicar el nombre del periodo');
      return false;
    }
    if (this.periodo.fecha_inicio === '') {
        Swal.fire({
            icon: 'info',
            title: 'Debes indicar la fecha de inicio del periodo',
            showConfirmButton: true,
            confirmButtonText: 'OK',
            // timer: 2000
        });
      // alert('Debes indicar la fecha de inicio del periodo');
      return false;
    }
    if (this.periodo.fecha_fin === '') {
        Swal.fire({
            icon: 'info',
            title: 'Debes indicar la fecha de fin del periodo',
            showConfirmButton: true,
            confirmButtonText: 'OK',
            // timer: 2000
        });
      // alert('Debes indicar la /**/fecha de fin del periodo');
      return false;
    }
      if (this.periodo.fecha_inicio > this.periodo.fecha_fin ) {
          Swal.fire({
              icon: 'info',
              title: 'La fecha de inicio no puede ser mayor a la fecha de finalización',
              showConfirmButton: true,
              confirmButtonText: 'OK',
              // timer: 2000
          });
          // alert('Debes indicar el nombre del periodo');
          return false;
      }
    return true;
  }

  _init_components() {
    this.periodo.pk_periodo_cado = -1;
    this.periodo.nombre_periodo = '';
    this.periodo.fecha_fin = '';
    this.periodo.fecha_inicio = '';
    // this.periodo.estado_periodo = 1;
    this.fecha_actual_sistema = new Date();
    this.validado = false;
  }

  mostrarModal() {
    this._init_components();
    this.loaderModal.show();
  }

  modificar_periodo() {
    console.log('modificar');
    console.log(this.periodo);
    if (this.valida_form()) {
        Swal.fire({
            title: '¿Está seguro que desea modificar el  periodo?',
            // text: "You won't be able to revert this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar'
        }).then((result) => {
            if (result.value) {
                // definiendo body
                let body = {
                    pk_periodo_cado: this.periodo.pk_periodo_cado,
                    nombre_periodo: this.periodo.nombre_periodo,
                    fecha_inicio:   this.periodo.fecha_inicio,
                    fecha_fin:      this.periodo.fecha_fin
                    // tipo_periodo:   this.periodo.estado_periodo
                };

                // registrar mediante WS
                this.periodo_service.modificar_periodo(body).subscribe(
                    data => {  // cuando sale bien todo
                        if (data) {
                            this._init_components();
                            this.loaderModalEdit.hide();
                            Swal.fire({
                                icon: 'success',
                                title: '¡Se ha modificado el periodo correctamente!',
                                showConfirmButton: true,
                                confirmButtonText: 'OK',
                                // timer: 2000
                            });
                            //  volver a consultar los periodos
                            this.ngOnInit();
                        }
                    },
                    error => { // cuando ocurre un error
                        Swal.fire({
                            icon: 'error',
                            title: '¡Lo sentimos ha ocurrido un error, intentalo más tarde!',
                            showConfirmButton: true,
                            confirmButtonText: 'OK',
                            // timer: 2000
                        });
                    }
                );
                // this.ngOnInit();
            }
        });
    }
  }

}
