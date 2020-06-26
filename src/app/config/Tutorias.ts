export class Modulos {
    /* GRUPOS DE TUTORIA INICIAL */
    static VER_GRUPOS_TUTORIA_INICIAL = 'VER_GRUPOS_TUTORIA_INICIAL';
    static VER_PERFIL_GRUPAL = 'VER_PERFIL_GRUPAL';
    static VER_DETALLES_GRUPO = 'VER_DETALLES_GRUPO';
    /* /GRUPOS DE TUTORIA INICIAL */

    /* DETALLE DE GRUPOS DE TUTORIA INICIAL */
    static VER_HORARIO_ALUMNO = 'VER_HORARIO_ALUMNO';
    static VER_DATOS_PERSONALES_ALUMNO = 'VER_DATOS_PERSONALES_ALUMNO';
    static VER_DETALLE_ENCUESTAS_ALUMNO = 'VER_DETALLE_ENCUESTAS_ALUMNO';
    static VER_PERFIL_PERSONAL = 'VER_PERFIL_PERSONAL';
    /* /GRUPOS DE TUTORIA INICIAL */

    /* RESPUESTAS DE ENCUESTAS */
    static RESPUESTAS_ENCUESTA_PASATIEMPOS = 'RESPUESTAS_ENCUESTA_PASATIEMPOS';
    static RESPUESTAS_ENCUESTA_SALUD = 'RESPUESTAS_ENCUESTA_SALUD';
    static RESPUESTAS_ENCUESTA_COND_SOCIOECONOMICA = 'RESPUESTAS_ENCUESTA_COND_SOCIOECONOMICA';
    static RESPUESTAS_ENCUESTA_COND_ACADEMICA = 'RESPUESTAS_ENCUESTA_COND_ACADEMICA';
    static RESPUESTAS_ENCUESTA_COND_FAMILIAR = 'RESPUESTAS_ENCUESTA_COND_FAMILIAR';
    static RESPUESTAS_ENCUESTA_HABITOS = 'RESPUESTAS_ENCUESTA_HABITOS';
    static RESPUESTAS_ENCUESTA_16PF = 'RESPUESTAS_ENCUESTA_16PF';
    /* /RESPUESTAS DE ENCUESTAS */

    /* REPORTE DE ENCUESTAS */
    static REPORTE_ENCUESTA_PASATIEMPOS = 'REPORTE_ENCUESTA_PASATIEMPOS';
    static REPORTE_ENCUESTA_SALUD = 'REPORTE_ENCUESTA_SALUD';
    static REPORTE_ENCUESTA_COND_SOCIOECONOMICA = 'REPORTE_ENCUESTA_COND_SOCIOECONOMICA';
    static REPORTE_ENCUESTA_COND_ACADEMICA = 'REPORTE_ENCUESTA_COND_ACADEMICA';
    static REPORTE_ENCUESTA_COND_FAMILIAR = 'REPORTE_ENCUESTA_COND_FAMILIAR';
    static REPORTE_ENCUESTA_HABITOS = 'REPORTE_ENCUESTA_HABITOS';
    static REPORTE_ENCUESTA_16PF = 'REPORTE_ENCUESTA_16PF';
    /* /REPORTE DE ENCUESTAS */

    /* MODULO DE USUARIOS DE TUTORIA */
    static EDITAR_USUARIO = 'EDITAR_USUARIO';
    static CORREO_RECUPERAR_CONTRASENIA = 'CORREO_RECUPERAR_CONTRASENIA';
    /* /MODULO DE USUARIOS DE TUTORIA */

    /* MODULO DE REPORTES DE ENCUESTAS */
    static VER_REPORTE_ENCUESTA = 'VER_REPORTE_ENCUESTA';
    static EXPORTA_REPORTE_ENCUESTA = 'EXPORTA_REPORTE_ENCUESTA';
    /* /MODULO DE USUARIOS DE TUTORIA */

    /*
    * Validar accion mediante rol y accion
    * */
    static valida_rol_accion(rol: string, accion: string) {
        const sistemas = JSON.parse(sessionStorage['sistemas']);
        const acciones_rol = sistemas[0].ACCIONES;

        // console.log(acciones_rol);

        const valido = acciones_rol.filter(element => (element.ACCION === accion && element.ROL === rol));

        return (valido.length > 0);
    }

    /*
    * Obtener rol mediante token
    * */
    static rol_token(option: string) {
        switch (option) {
            case 'ADM_TUT': // administrador
                return 'b52d42ae5202ea8a7322b688194ae762';
            case 'b52d42ae5202ea8a7322b688194ae762': // administrador inverso
                return 'ADM_TUT';

            case 'COORI_TUT': // Coordinador institucional
                return '46d3355174bd29580de1beffa9f20aed';
            case '46d3355174bd29580de1beffa9f20aed': // Coordinador institucional inverso
                return 'COORI_TUT';

            case 'COORD_TUT': // Coordinador Departamental
                return 'fe39d2395bf73e47abf0b6fb05daaff3';
            case 'fe39d2395bf73e47abf0b6fb05daaff3': // Coordinador Departamental inverso
                return 'COORD_TUT';

            case 'TUT_TUT': // Tutor
                return 'ce84b2b6985c65460a18d7c151a51059';
            case 'ce84b2b6985c65460a18d7c151a51059': // Tutor inverso
                return 'TUT_TUT';

            case 'EST_TUT': // estudiante
                return '55f1c2ea89aec2d407c652961d575401';
            case '55f1c2ea89aec2d407c652961d575401': // estudiante inverso
                return 'EST_TUT';

            case 'CAP_TUT': // capturista
                return '6023ac0f5317cb539fda86968fe8bcbd';
            case '6023ac0f5317cb539fda86968fe8bcbd': // capturista inverso
                return 'CAP_TUT';

            default:
                return false;
        }
    }
}
