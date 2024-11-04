import { Router } from 'express';
var mdAutenticacion = require('../middlewares/autenticacion');
import eventosController from '../controllers/eventosController';

class EventosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        this.router.post('/alta/:IdPersona/',  [mdAutenticacion.verificaToken],eventosController.alta_evento);
        this.router.post('/baja/:IdPersona/',  [mdAutenticacion.verificaToken],eventosController.baja_evento);
        this.router.post('/cancelar/evento/:IdPersona/',  [mdAutenticacion.verificaToken],eventosController.cancelar_evento);

        this.router.post('/detalle/:IdPersona/',  [mdAutenticacion.verificaToken],eventosController.dame_detalle_evento);

        // this.router.get('/listar/:mes_eventos/:ano_eventos/:IdPersona/',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],eventosController.listar_eventos);
        this.router.get('/listar/fecha/:fecha_evento/:IdPersona/',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],eventosController.listar_citas_fecha);
        this.router.get('/info',  [mdAutenticacion.verificaToken],eventosController.cargar_info_calendario);
        this.router.get('/hora/:fecha_evento/:horario/:IdPersona/',  [mdAutenticacion.verificaToken],eventosController.listar_eventos_hora);
        //
        this.router.get('/listar/fecha/:fecha_inicio/:fecha_fin/:IdPersona/',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],eventosController.listar_eventos_fecha);

    }

}

const eventosRoutes = new EventosRoutes();
export default eventosRoutes.router;