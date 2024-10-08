import { Router } from 'express';
var mdAutenticacion = require('../middlewares/autenticacion');
import cajaController from '../controllers/cajaController';

class CajaRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // ***  ***
        this.router.get('/listar/:pDesde/:pIdPersona',cajaController.listar_movimientos_caja);

        this.router.post('/apertura',cajaController.apertura_caja);
        this.router.post('/cierre',cajaController.cierre_caja);
    
   }

}

const cajaRoutes = new CajaRoutes();
export default cajaRoutes.router;