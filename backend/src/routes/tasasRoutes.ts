import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import tasasController from '../controllers/tasasController';

class TasasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // 
        this.router.get('/listar/empresa',[mdAutenticacion.verificaToken],tasasController.dame_tasas);
        this.router.put('/actualizar/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], tasasController.tasasConfiguraciones);

    }

}

const tasasRoutes = new TasasRoutes();
export default tasasRoutes.router;