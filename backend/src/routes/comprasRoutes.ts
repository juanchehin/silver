import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import comprasController from '../controllers/comprasController';

class ComprasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // 
        this.router.get('/listar/:desde/:FechaInicio/:FechaFin/:pTurno',[mdAutenticacion.verificaToken],comprasController.listarCompras);
        this.router.get('/listar/mis-compras/:pDesde/:pFecha/:pIdPersona',comprasController.listarComprasIdUsuario);
        this.router.get('/listar/tipos-pago',comprasController.listarTiposPago);
        this.router.get('/dame/:id_transaccion/:IdPersona',[mdAutenticacion.verificaToken],comprasController.dame_transaccion);

        this.router.post('/alta/:IdPersona',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], comprasController.altaCompra);
        this.router.get('/baja/:id_transaccion/:IdPersona',[mdAutenticacion.verificaToken],comprasController.baja_transaccion);
        this.router.post('/egreso/alta/:IdPersona',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], comprasController.alta_egreso);

    }

}

const comprasRoutes = new ComprasRoutes();
export default comprasRoutes.router;