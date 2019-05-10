import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';


import { LineamientosComponent} from './lineamientos.component';
import { LineamientosFormComponent} from './lineamientosForm.component';
import { GestionActividadesComponent} from './gestionActividades.component';
import { GestionActividadesFormComponent } from './gestion-actividades-form.component';
import { ActividadesComponent} from './actividades.component';
import { DetalleActividadComponent} from './detalleActividad.component';
import { SeguimientoAlumnoComponent } from './seguimientoAlumno.component';
import { ActividadesResponsableComponent } from './actividadesResponsable.component';
import { AsistentesResponsableComponent } from './asistentesResponsable.component';
// Dropdowns Component


// Buttons Routing
import { CreditosRoutingModule } from './creditos-routing.module';
 import { from } from 'rxjs';

// Angular

@NgModule({
  imports: [
    CommonModule,
    CreditosRoutingModule,
    FormsModule,
    TabsModule,
  ],
  declarations: [
    LineamientosComponent,
    LineamientosFormComponent,
    GestionActividadesComponent,
    GestionActividadesFormComponent,
    ActividadesComponent,
    DetalleActividadComponent,
    SeguimientoAlumnoComponent,
    ActividadesResponsableComponent,
    AsistentesResponsableComponent
  ]
})
export class CreditosModule { }
