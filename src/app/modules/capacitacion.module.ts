// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// ventanas modales
import {ModalModule} from 'ngx-bootstrap';
// fONTaWESOME
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Buttons Routing
import {CapacitacionRoutingModule} from './capacitacion-routing.module';


// Component
import {CollapseModule, TooltipModule} from 'ngx-bootstrap';
import {LoaderModule} from '../components/loader/loader.module';
import { PeriodosComponent } from '../components/capacitacion_docente/periodos.component';
import {CursosComponent} from '../components/capacitacion_docente/cursos.component';
import {BienvenidoComponent} from '../components/capacitacion_docente/bienvenido.component';
import {CapturaCursoComponent} from '../components/capacitacion_docente/captura-curso.component';
// PrimeNG
import {InputSwitchModule} from 'primeng/inputswitch';
import {CalendarModule} from 'primeng/calendar';
import {AccordionModule} from 'primeng/accordion';

@NgModule({
  imports: [
      // BrowserAnimationsModule,
      CommonModule,
    ModalModule.forRoot(),
    CapacitacionRoutingModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    CollapseModule,
    TooltipModule.forRoot(),
    LoaderModule,
    FontAwesomeModule,
    InputSwitchModule,
    CalendarModule,
    AccordionModule

  ],
  declarations: [
    PeriodosComponent,
      CursosComponent,
      BienvenidoComponent,
      CapturaCursoComponent

  ],
  exports: [
      ModalModule
  ]

})
export class CapacitacionModule { }
