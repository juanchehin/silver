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
        this.router.get('/listar/:mes_eventos/:ano_eventos/:IdPersona/',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],eventosController.listar_eventos);

    }

}

const eventosRoutes = new EventosRoutes();
export default eventosRoutes.router;