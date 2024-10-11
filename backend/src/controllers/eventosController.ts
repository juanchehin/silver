import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class EventosController {   

// ==================================================
//        Inserta un cliente enviando un correo de confirmacion
// ==================================================
public async alta_evento(req: Request, res: Response) {
    
    const { IdPersona } = req.params;

    var fecha_evento = req.body.fecha;
    var descripcion_evento = req.body.descripcion_evento;
    
    if(descripcion_evento == null || descripcion_evento == 'null' || descripcion_evento == '-' || descripcion_evento == '' || descripcion_evento == 'undefined' || descripcion_evento == undefined)
    {
        descripcion_evento = '-';
    }
    
    pool.query(`call bsp_alta_evento('${fecha_evento}','${descripcion_evento}')`, function(err: any, result: any, fields: any){

        if(err){
            logger.error("Error en bsp_alta_evento - EventosController - " + err);

            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })

}
// ==================================================
//        Lista eventos
// ==================================================
public async listarEventosPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_eventos_paginado('${desde}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//       
// ==================================================
public async baja_evento(req: Request, res: Response): Promise<void> {

    var IdPersona = req.params.IdPersona;
    var IdVoucher = req.params.pIdVoucher;

    pool.query(`call bsp_baja_evento('${IdPersona}','${IdVoucher}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//   Listado de eventos
// ==================================================
public async listar_eventos_paginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.pDesde || 0;
    desde  = Number(desde);
    
    var pEstadoVoucher = req.params.estado_evento || 'T';
    var id_sucursal = req.params.id_sucursal || 1;

    if(pEstadoVoucher == null || pEstadoVoucher == 'null' || pEstadoVoucher == '-' || pEstadoVoucher == '')
    {
        pEstadoVoucher = 'T';
    }

    pool.query(`call bsp_listar_eventos_paginado('${desde}','${pEstadoVoucher}','${id_sucursal}')`, function(err: any, result: any){
        if(err){
            logger.error("Error en listar_eventos_paginado - eventosController");

            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==================================================
//        
// ==================================================
public async confirmar_evento(req: Request, res: Response): Promise<void> {

    var id_transaccion = req.params.id_transaccion;
    var id_empleado = req.params.id_empleado;

    pool.query(`call bsp_confirmar_evento('${id_transaccion}','${id_empleado}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}



}


const eventosController = new EventosController;
export default eventosController;