import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import egresosController from '../controllers/egresosController';

class EgresosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // 
        this.router.get('/listar/:desde',[mdAutenticacion.verificaToken],egresosController.listar_egresos);
        this.router.post('/alta/:IdPersona',[mdAutenticacion.verificaToken],egresosController.alta_egreso);

    }

}

const egresosRoutes = new EgresosRoutes();
export default egresosRoutes.router;