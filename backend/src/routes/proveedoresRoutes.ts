import { Router } from 'express';
var mdAutenticacion = require('../middlewares/autenticacion');
import proveedoresController from '../controllers/proveedoresController';

class ProveedoresRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // 
        this.router.get('/listarPaginado/:desde/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],proveedoresController.listarProveedoresPaginado);
        this.router.post('/alta/:IdPersona' ,  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario] , proveedoresController.altaProveedor); 
        this.router.get('/:pIdPersona', proveedoresController.dameProveedor);
        this.router.get('/baja/:IdPersona/:pIdProveedor',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], proveedoresController.bajaProveedor);
        this.router.get('/editar/datos-formulario/:IdProveedor/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], proveedoresController.cargarDatosFormEditarProveedor);
        this.router.post('/editar/:IdProveedor/:IdPersona',[mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], proveedoresController.editarProveedor);
        this.router.get('/buscar/:pDesde/:pParametroBusqueda/:IdPersona',  [mdAutenticacion.verificaToken],proveedoresController.buscarProveedorPaginado); 

    }

}

const proveedoresRoutes = new ProveedoresRoutes();
export default proveedoresRoutes.router;