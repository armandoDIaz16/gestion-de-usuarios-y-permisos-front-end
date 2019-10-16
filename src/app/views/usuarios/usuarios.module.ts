import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Buttons Routing
import { UsuariosRoutingModule } from './usuarios-routing.module';

// Component
import {CollapseModule, TooltipModule} from 'ngx-bootstrap';
import {PerfilComponent} from './perfil/perfil.component';
// Angular

@NgModule({
    imports: [
        CommonModule,
        UsuariosRoutingModule,
        BsDropdownModule.forRoot(),
        FormsModule,
        CollapseModule,
        TooltipModule.forRoot()
    ],
    declarations: [
        PerfilComponent
    ]
})
export class UsuariosModule { }
