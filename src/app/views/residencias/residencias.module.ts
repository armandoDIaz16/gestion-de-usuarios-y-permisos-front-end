import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Buttons Routing
import { ResidenciasRoutingModule } from './residencias-routing.module';

// Component
import { BancoProyectosComponent } from './banco_proyectos/banco_proyectos.component';
import { DocumentacionComponent } from './documentacion/documentacion.component';
import { CorreosComponent } from './correos/correos.component';
import { Banco_vistaComponent } from './banco_vista/banco_vista.component';
import { Banco_seleccionComponent } from './banco_seleccion/banco_seleccion.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { BancoEdicionComponent } from './banco_edicion/banco_edicion.component';
import { BancoAprobacionComponent } from './banco_aprobacion/banco_aprobacion.component';
import { MaestrosComponent } from './maestros/maestros.component';
import { ReporteVistaComponent } from './reporte_vista/reporte_vista.component';
import { VistaComentariosComponent } from './vista_comentarios/vista_comentarios.component';
import {CollapseModule} from 'ngx-bootstrap';
import { Reporte_docenteComponent } from './reporte_docente/reporte_docente.component';
import { Vista_reportesComponent } from './vista_reportes/vista_reportes.component';
import {FichaUnicaAsignacionComponent } from './ficha_unica_asignacion/ficha_unica_asignacion.component';
import { ConveniosComponent } from './convenios/convenios.component';
import { PeriodosComponent } from './periodos/periodos.component';
import { Periodos_reportesComponent } from './periodos_reportes/periodos_reportes.component';
import { Calificacion_alumnoComponent } from './calificacion_alumno/calificacion_alumno.component';
import { Habilitar_residentesComponent } from './habilitar_residentes/habilitar_residentes.component';
import { Reporte_asesor_externoComponent } from './reporte_asesor_externo/reporte_asesor_externo.component';
import { Vista_documentacionComponent } from './vista_documentacion/vista_documentacion.component';
import { Banco_estadisticaComponent } from './banco_estadistica/banco_estadistica.component';
import { Estadisticas_reportesComponent } from './estadisticas_reportes/estadisticas_reportes.component';
import { Informe_tecnicoComponent } from './informe_tecnico/informe_tecnico.component';
import { Generar_conveniosComponent } from './generar_convenios/generar_convenios.component';
import {Configuracion_actaComponent} from './configuracion_acta/configuracion_acta.component';

// Angular

@NgModule({
    imports: [
        CommonModule,
        ResidenciasRoutingModule,
        BsDropdownModule.forRoot(),
        FormsModule,
        CollapseModule
    ],
  declarations: [
    BancoProyectosComponent,
    DocumentacionComponent,
    CorreosComponent,
    Banco_vistaComponent,
    Banco_seleccionComponent,
    ProyectosComponent,
    BancoEdicionComponent,
    BancoAprobacionComponent,
    MaestrosComponent,
    ReporteVistaComponent,
    VistaComentariosComponent,
    Reporte_docenteComponent,
    Vista_reportesComponent,
    FichaUnicaAsignacionComponent,
    ConveniosComponent,
    PeriodosComponent,
    Periodos_reportesComponent,
    Calificacion_alumnoComponent,
    Habilitar_residentesComponent,
    Reporte_asesor_externoComponent,
    Vista_documentacionComponent,
    Banco_estadisticaComponent,
    Estadisticas_reportesComponent,
    Informe_tecnicoComponent,
    Generar_conveniosComponent,
    Configuracion_actaComponent
  ]
})
export class ResidenciasModule { }
