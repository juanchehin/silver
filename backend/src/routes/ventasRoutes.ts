import { Router } from 'express';

var mdAutenticacion = require('../middlewares/autenticacion');

import ventasController from '../controllers/ventasController';

class VentasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // 
        this.router.get('/listar/:desde/:FechaInicio/:FechaFin/:pIdSucursal/:pTurno',[mdAutenticacion.verificaToken],ventasController.listarVentas);
        this.router.get('/listar/mis-ventas/:pDesde/:pFecha/:pIdPersona',ventasController.listarVentasIdUsuario);
        this.router.get('/listar/tipos-pago',ventasController.listarTiposPago);
        this.router.get('/dame/:id_transaccion/:IdPersona',[mdAutenticacion.verificaToken],ventasController.dame_transaccion);

        this.router.post('/alta/:IdPersona',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], ventasController.altaVenta);
        this.router.get('/baja/:id_transaccion/:IdPersona',[mdAutenticacion.verificaToken],ventasController.baja_transaccion);
        this.router.post('/egreso/alta/:IdPersona',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], ventasController.alta_egreso);

    }

}

const ventasRoutes = new VentasRoutes();
export default ventasRoutes.router;