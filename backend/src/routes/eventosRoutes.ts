import { Router } from 'express';
var mdAutenticacion = require('../middlewares/autenticacion');
import eventosController from '../controllers/eventosController';

class EventosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        this.router.post('/alta/:IdPersona/',eventosController.alta_evento);
        this.router.get('/baja/:IdPersona/:pIdProducto',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],eventosController.baja_evento);
        this.router.get('/confirmar/:id_transaccion/:id_empleado/:pIdPersona',  [mdAutenticacion.verificaToken],eventosController.confirmar_evento);
        this.router.get('/listar/:IdPersona/',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],eventosController.listar_eventos_paginado);

    }

}

const eventosRoutes = new EventosRoutes();
export default eventosRoutes.router;