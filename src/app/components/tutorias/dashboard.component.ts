import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: '../../views/tutorias/dashboard.component.html',
    styleUrls: ['../../views/tutorias/dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
        // vefiricar que haya completado perfil, sino mandar a modificar perfil
        if (sessionStorage.getItem('perfil_completo') !== undefined
            && sessionStorage.getItem('tipo_usuario')  !== undefined
            && sessionStorage.getItem('primer_login')  !== undefined) {
            if (parseInt(sessionStorage.getItem('perfil_completo')) === 0
                && (
                    parseInt(sessionStorage.getItem('tipo_usuario')) === 1
                    || parseInt(sessionStorage.getItem('tipo_usuario')) === 2
                ) && parseInt(sessionStorage.getItem('primer_login')) === 1) {
                if (parseInt(sessionStorage.getItem('tipo_usuario')) === 1) {
                    this.router.navigateByUrl('/usuarios/perfil');
                } else if (parseInt(sessionStorage.getItem('tipo_usuario')) === 2) {
                    this.router.navigateByUrl('/usuarios/perfil_docente');
                }
            }
        }
    }
}
