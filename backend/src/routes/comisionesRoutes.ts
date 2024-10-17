import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import comisionesController from '../controllers/comisionesController';

class ComisionesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // 
        this.router.get('/listar/:desde/:p_fecha_inicio/:p_fecha_fin/:id_empleado_seleccionado',[mdAutenticacion.verificaToken],comisionesController.listar_comisiones);
        this.router.post('/alta/:IdPersona',[mdAutenticacion.verificaToken],comisionesController.alta_comision);

    }

}

const comisionesRoutes = new ComisionesRoutes();
export default comisionesRoutes.router;