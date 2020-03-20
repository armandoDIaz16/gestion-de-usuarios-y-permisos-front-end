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

// FECHAS EN ESPAÑOL
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs);

// Component
import {CollapseModule, TooltipModule} from 'ngx-bootstrap';
import {LoaderModule} from '../components/loader/loader.module';
import { PeriodosComponent } from '../components/capacitacion_docente/periodos.component';
import {CursosComponent} from '../components/capacitacion_docente/cursos.component';
import {BienvenidoComponent} from '../components/capacitacion_docente/bienvenido.component';
import {CapturaCursoComponent} from '../components/capacitacion_docente/captura-curso.component';
import {InstructorCvComponent} from '../components/capacitacion_docente/instructor-cv.component';
import {VerCursoComponent} from '../components/capacitacion_docente/ver-curso.component';
import {VerCursoParticipanteComponent} from '../components/capacitacion_docente/ver-curso-participante.component';
// PrimeNG
import {InputSwitchModule} from 'primeng/inputswitch';
import {CalendarModule} from 'primeng/calendar';
import {AccordionModule} from 'primeng/accordion';
import {AutoCompleteModule} from 'primeng/autocomplete';

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
    AccordionModule,
    AutoCompleteModule

  ],
  declarations: [
    PeriodosComponent,
      CursosComponent,
      BienvenidoComponent,
      CapturaCursoComponent,
      InstructorCvComponent,
      VerCursoComponent,
      VerCursoParticipanteComponent
  ],
  exports: [
      ModalModule
  ],
  providers: [ {
        provide: LOCALE_ID, useValue: 'es'
    }
  ],
})
export class CapacitacionModule { }
