import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {DatosComponent} from './datos/datos.component';
import {GraficasComponent} from './graficas/graficas.component';
import {ArchivosComponent} from './archivos/archivos.component';
import {PrefichasPagadasComponent} from './prefichas_pagadas/prefichas_pagadas.component';
import {ListaGruposComponent} from './lista_grupos/lista_grupos.component';
import {PrefichasComponent} from './prefichas/prefichas.component';
import {PeriodoComponent} from './periodo/periodo.component';
import {CrearGruposComponent} from './crear_grupos/crear_grupos.component';
import {ArchivosPagosComponent} from './archivos_pagos/archivos_pagos.component';
import {PlantillaSIIAComponent} from './plantilla_siia/plantilla_siia.component';
import {ExamenUbicacionComponent} from './examen_ubicacion/examen_ubicacion.component';
import {ReferenciasPagadasComponent} from './referencias_pagadas/referencias_pagadas.component';
import {ReferenciasComponent} from './referencias/referencias.component';
import {DocumentosComponent} from './documentos/documentos.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Aspitantes'
        },
        children: [
            /* ******************************* *
            *  ****** RUTAS DE ASPIRANTES **** *
            * ******************************** */
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: {
                    title: 'Dashboard'
                }
            },
            {
                path: '99d1b6a6e7257f98d75d8f4846df8671', // datos
                component: DatosComponent,
                data: {
                    title: 'Datos'
                }
            },
            {
                path: '9c969972f31be24de51532534aada5c1', // documentos
                component: DocumentosComponent,
                data: {
                    title: 'Documentos'
                }
            },
            {
                path: 'prefichas',
                component: PrefichasComponent,
                data: {
                    title: 'Prefichas'
                }
            },
            {
                path: 'prefichas_pagadas',
                component: PrefichasPagadasComponent,
                data: {
                    title: 'Prefichas pagadas'
                }
            },
            {
                path: 'lista_grupos',
                component: ListaGruposComponent,
                data: {
                    title: 'Lista grupos'
                }
            },
            {
                path: 'crear_grupos',
                component: CrearGruposComponent,
                data: {
                    title: 'Crear grupos'
                }
            },
            {
                path: 'archivos',
                component: ArchivosComponent,
                data: {
                    title: 'Archivos'
                }
            },
            {
                path: 'archivos_de_pagos',
                component: ArchivosPagosComponent,
                data: {
                    title: 'Archivos de pagos'
                }
            },
            {
                path: 'graficas',
                component: GraficasComponent,
                data: {
                    title: 'Gráficas'
                }
            },
            {
                path: 'periodo',
                component: PeriodoComponent,
                data: {
                    title: 'Periodo'
                }
            },
            {
                path: 'plantilla_siia',
                component: PlantillaSIIAComponent,
                data: {
                    title: 'Plantilla SIIA'
                }
            },
            {
                path: 'examen_ubicacion',
                component: ExamenUbicacionComponent,
                data: {
                    title: 'Examen ubicación'
                }
            },
            {
                path: 'referencias_pagadas',
                component: ReferenciasPagadasComponent,
                data: {
                    title: 'Referencias pagadas'
                }
            },
            {
                path: 'referencias',
                component: ReferenciasComponent,
                data: {
                    title: 'Referencias'
                }
            },
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AspirantesRoutingModule {
}
