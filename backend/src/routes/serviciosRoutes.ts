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
        
        // tipos / categorias de servicios
        this.router.post('/alta/tipo/:IdPersona',serviciosController.alta_tipo_servicio);
        this.router.get('/tipos/buscar/:pDesde/:pServicioBuscado/:IdPersona',  [mdAutenticacion.verificaToken],serviciosController.buscarTiposServicioPaginado); 
        this.router.get('/categorias/listar',  [mdAutenticacion.verificaToken],serviciosController.listarCategoriasServicios); 
        this.router.get('/tipos/baja/:pIdServicio/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario],serviciosController.baja_tipo_servicio); 

        this.router.get('/tipos/editar/datos-formulario/:pIdTipoServicio/:IdPersona',  [mdAutenticacion.verificaToken,mdAutenticacion.MismoUsuario], serviciosController.cargarTiposDatosFormEditarServicio);
        this.router.post('/tipos/editar/:IdPersona', serviciosController.editarTipoServicio);

    }

}

const serviciosRoutes = new ServiciosRoutes();
export default serviciosRoutes.router;