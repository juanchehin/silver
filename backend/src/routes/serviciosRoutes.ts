import { Router } from 'express';
var mdAutenticacion = require('../middlewares/autenticacion');
import serviciosController from '../controllers/serviciosController';

class ServiciosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {

        // *** Front ***
        this.router.get('/servicio/detalle/:pIdServicio/:pIdSabor',serviciosController.dameDatosServicio); 
        this.router.post('/alta/:IdPersona',serviciosController.altaServicio);
        this.router.get('/baja/:pIdServicio/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],serviciosController.bajaServicio); 
        this.router.get('/listar/busqueda/autocomplete/:pServicioBuscado/:IdPersona',  [mdAutenticacion.verificaToken],serviciosController.buscarServicioAutoComplete); 
        this.router.get('/buscar/:pDesde/:pParametroBusqueda/:IdPersona',  [mdAutenticacion.verificaToken],serviciosController.buscarServicioPaginado); 
        this.router.get('/editar/datos-formulario/:pIdServicio/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], serviciosController.cargarDatosFormEditarServicio);
        this.router.post('/editar/:IdPersona', serviciosController.editarServicio);
        this.router.get('/categorias/listar',  [mdAutenticacion.verificaToken],serviciosController.listarCategoriasServicios); 

    }

}

const serviciosRoutes = new ServiciosRoutes();
export default serviciosRoutes.router;