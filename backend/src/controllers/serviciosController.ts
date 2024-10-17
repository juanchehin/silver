import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class ServiciosController {

    
// ==================================================
//        Inserta 
// ==================================================
public async altaServicio(req: Request, res: Response) {
    
    console.log("🚀 ~ ServiciosController ~ altaServicio ~ req.body:", req.body)
    var servicio = req.body[0];
    var id_cat_servicio = req.body[1];
    var precio = req.body[2];
    var comision = req.body[3];
    var codigo = req.body[4];
    var descripcion = req.body[5];

    pool.query(`call bsp_alta_servicio('${servicio}','${id_cat_servicio}',
        '${precio}','${comision}','${codigo}','${descripcion}')`, async function(err: any, result: any, fields: any){
        console.log("🚀 ~ ServiciosController ~ '${precio}','${comision}','${codigo}','${descripcion}')`,function ~ err:", err)
        console.log("🚀 ~ ServiciosController ~ '${precio}','${comision}','${codigo}','${descripcion}')`,function ~ result:", result)
        
        if(err || result[0][0].mensaje != 'Ok'){
            logger.error("Error en bsp_alta_servicio - serviciosController " + err);

            res.status(404).json({ text: err });
            return;
        }

        return res.json({ mensaje: 'Ok' });
    })

}

// ==================================================
//        Lista servicios
// ==================================================
public async listarServiciosPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_servicios_paginado('${desde}')`, function(err: any, result: any, fields: any){
        if(err){
            logger.error("Error en bsp_listar_servicios_paginado - serviciosController " + err);

            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//        Lista servicios
// ==================================================
public async bajaServicio(req: Request, res: Response): Promise<void> {

    var IdPersona = req.params.IdPersona;
    var IdServicio = req.params.pIdServicio;

    pool.query(`call bsp_baja_servicio('${IdServicio}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//   Listado de servicios en panel
// ==================================================
public async buscarServicioPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.pDesde || 0;
    desde  = Number(desde);
    
    var pParametroBusqueda = req.params.pParametroBusqueda || '';

    if(pParametroBusqueda == null || pParametroBusqueda == 'null' || pParametroBusqueda == '-' || pParametroBusqueda == '')
    {
        pParametroBusqueda = '-';
    }

    pool.query(`call bsp_buscar_servicios_paginado('${req.params.IdPersona}','${pParametroBusqueda}','${desde}')`, function(err: any, result: any){
        
        if(err){
            logger.error("Error en bsp_buscar_servicio_paginado - serviciosController");

            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==================================================
//        Autocomplete servicios
// ==================================================
public async buscarServicioAutoComplete(req: Request, res: Response): Promise<void> {

    var pParametroBusqueda = req.params.pServicioBuscado || '';
    var pIdUsuario = req.params.IdPersona;

    if(pParametroBusqueda == null || pParametroBusqueda == 'null')
    {
        pParametroBusqueda = '';
    }

    pool.query(`call bsp_buscar_servicio_autocomplete('${pParametroBusqueda}','${pIdUsuario}')`, function(err: any, result: any){

        if(err){
            logger.error("Error en bsp_buscar_servicio_autocomplete - serviciosController");

            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}


// ==================================================
//  Obtiene loss detalles del servicio para el e-commerce
// ==================================================
public async dameDatosServicio(req: Request, res: Response): Promise<void> {

    const { pIdSabor } = req.params;
    const { pIdServicio } = req.params;

    pool.query(`call bsp_dame_servicio_front('${pIdServicio}','${pIdSabor}')`, function(err: any, result: any){
        if(err){
            logger.error("Error en bsp_dame_servicio_front - serviciosController - dameDatosServicio");

            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==================================================
//       
// ==================================================
public async listarServiciosRelacionados(req: Request, res: Response): Promise<void> {

    const { pIdServicio } = req.params;

    pool.query(`call bsp_dame_servicios_relacionados('${pIdServicio}')`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}
// ==================================================
//   Cargo las marcas,categorias,subcategorias,unidades,sucursal principal
// ==================================================
public async cargarDatosFormEditarServicio(req: Request, res: Response): Promise<void> {

    const { pIdServicio } = req.params;
    const { IdPersona } = req.params;

    pool.query(`call bsp_dame_datos_form_editar_servicio('${IdPersona}','${pIdServicio}')`, function(err: any, result: any){
        if(err){
            logger.error("Error en bsp_dame_datos_form_editar_servicio - serviciosController - cargarDatosFormEditarServicio");

            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==================================================
//   Cargo las marcas,categorias,subcategorias,unidades,sucursal principal
// ==================================================
public async cargarDatosFormNuevoServicio(req: Request, res: Response): Promise<void> {

    pool.query(`call bsp_dame_datos_form_nuevo_servicio()`, function(err: any, result: any){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}


// ==================================================
//        Edita una 
// ==================================================
public async editarServicio(req: Request, res: Response) {

    var pIdServicio = req.body[0];
    var pServicio = req.body[1];
    var pPrecio = req.body[2];
    var pDescripcion = req.body[3];

    pool.query(`call bsp_editar_servicio('${pIdServicio}','${pServicio}','${pPrecio}','${pDescripcion}')`, function(err: any, result: any){
        
        if(err || result.mensaje !== 'Ok'){
            logger.error("Error en editarServicio - bsp_editar_servicio - serviciosController");

            return res.json({
                ok: false,
                mensaje: result[0][0].mensaje
            });
        }

        return res.json({ mensaje: 'Ok' });
    })

}

// ==================================================
//       
// ==================================================
public async listarCategoriasServicios(req: Request, res: Response): Promise<void> {

    pool.query(`call bsp_listar_categorias_servicios()`, function(err: any, result: any){

        if(err){
            logger.error("Error en listarCategoriasServicios - serviciosController");

            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

}


const serviciosController = new ServiciosController;
export default serviciosController;