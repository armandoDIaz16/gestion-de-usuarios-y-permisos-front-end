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
            title: 'Aspirantes'
        },
        children: [
            /* ******************************* *
            *  ****** RUTAS DE ASPIRANTES **** *
            * ******************************** */
            {
                path: 'dc7161be3dbf2250c8954e560cc35060', // dashboard
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
            /* ********************************************* *
            *  ****** RUTAS DE COORDINADOR INSTITUCIONAL **** *
            * *********************************************** */
            {
                path: '009063c5b618c9de8ea7c01836d9ae52', // prefichas
                component: PrefichasComponent,
                data: {
                    title: 'Prefichas'
                }
            },
            {
                path: '5b51dd05ab3955ecda2130d5631d30e0', // prefichas_pagadas
                component: PrefichasPagadasComponent,
                data: {
                    title: 'Prefichas pagadas'
                }
            },
            {
                path: '4a1a72c788d1afaeaf46cfa21c4b0439', // lista_grupos
                component: ListaGruposComponent,
                data: {
                    title: 'Lista grupos'
                }
            },
            {
                path: 'db86484759b9a1821c4f64ef3c354b87', // crear_grupos
                component: CrearGruposComponent,
                data: {
                    title: 'Crear grupos'
                }
            },
            {
                path: '33b8b0195fa5a3d546181cf4ba36d5aa', // archivos
                component: ArchivosComponent,
                data: {
                    title: 'Archivos'
                }
            },
            {
                path: 'ea56b27b8858cc33c59875c2f6303439', // graficas
                component: GraficasComponent,
                data: {
                    title: 'Gráficas'
                }
            },
            {
                path: 'b98917264cbb9144fcf9ce9861bbcd37', // periodo
                component: PeriodoComponent,
                data: {
                    title: 'Periodo'
                }
            },
            /* ***************************************** *
            *  ****** RUTAS DE RECURSOS FINANCIEROS **** *
            * ****************************************** */
            {
                path: '49e5c368585ec9557db038d7904121a8', // archivos_de_pagos
                component: ArchivosPagosComponent,
                data: {
                    title: 'Archivos de pagos'
                }
            },
            {
                path: '81f01f264dfb07a9ef2e1ed108a15114', // referencias_pagadas
                component: ReferenciasPagadasComponent,
                data: {
                    title: 'Referencias pagadas'
                }
            },
            /* **************************************** *
            *  ****** RUTAS DE SERVICIOS ESCOLARES **** *
            * ***************************************** */
            {
                path: '6ae1c213cad7fca191a5355d21ed5b17', // plantilla_siia
                component: PlantillaSIIAComponent,
                data: {
                    title: 'Plantilla SIIA'
                }
            },
            {
                path: 'f44481864c5480bba492078f6e748da7', // referencias
                component: ReferenciasComponent,
                data: {
                    title: 'Referencias'
                }
            },
            /* ******************************** *
            *  ****** RUTAS DE VINCULACIÓN **** *
            * ********************************* */
            {
                path: '4857c37b05b992816eaca21ead04c723', // examen_ubicacion
                component: ExamenUbicacionComponent,
                data: {
                    title: 'Examen ubicación'
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
