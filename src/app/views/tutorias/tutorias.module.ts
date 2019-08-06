import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Buttons Routing
import { TutoriasRoutingModule } from './tutorias-routing.module';

// Component
import {CollapseModule} from 'ngx-bootstrap';
import { UsuariosTutoriasComponent } from './usuarios_tutorias/usuarios_tutorias.component';
import { EncuestasComponent } from './encuestas/encuestas.component';
import { VerEncuestasComponent } from './ver-encuestas/ver-encuestas.component';

// Angular

@NgModule({
    imports: [
        CommonModule,
        TutoriasRoutingModule,
        BsDropdownModule.forRoot(),
        FormsModule,
        CollapseModule
    ],
    declarations: [
        UsuariosTutoriasComponent,
        EncuestasComponent,
        VerEncuestasComponent
    ]
})
export class TutoriasModule { }
