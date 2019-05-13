import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Buttons Routing
import { EgresadosRoutingModule } from './egresados-routing.module';

// Component
import { AdministradorComponent} from './administrador/administrador.component';
import { ReportesComponent } from './reportes/reportes.component';
import { EncuestasComponent} from './encuestas/encuestas.component';
import { AdminCarruselComponent } from './admin-carrusel/admin-carrusel.component';
import { NoticiasCarruselComponent } from './noticias-carrusel/noticias-carrusel.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { SeccionesComponent } from './secciones/secciones.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { AltasComponent } from './encuestas/altas/altas.component';


@NgModule({
  imports: [
    CommonModule,
    EgresadosRoutingModule,
    BsDropdownModule.forRoot(),
    FormsModule
  ],
  declarations: [
    EncuestasComponent,
    AdministradorComponent,
    ReportesComponent,
    AdminCarruselComponent,
    NoticiasCarruselComponent,
    AdminUsuariosComponent,
    SeccionesComponent,
    PreguntasComponent,
    EncuestaComponent,
    AltasComponent
  ]
})
export class EgresadosModule { }
