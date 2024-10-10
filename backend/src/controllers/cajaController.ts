import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class CajaController {   

// ==================================================
//        
// ==================================================
public async listar_movimientos_caja(req: Request, res: Response): Promise<void> {

    var desde = req.params.pDesde || 0;
    desde  = Number(desde);
        
    pool.query(`call bsp_listar_movimientos_caja('${desde}')`, function(err: any, result: any, fields: any){

        if(result == undefined || err){
            logger.error("Error en listar_movimientos_caja - CajaController - " + err);

            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//        
// ==================================================
public async apertura_caja(req: Request, res: Response): Promise<void> {

    var monto = req.body.monto;
    var observaciones = req.body.observaciones;

    if(observaciones == null || observaciones == 'null' || observaciones == '-' || observaciones == '' || observaciones == 'undefined' || observaciones == undefined)
    {
        observaciones = '-';
    }

    pool.query(`call bsp_apertura_caja('${monto}','${observaciones}')`, function(err: any, result: any){


        if(result == undefined || err || result[0].mensaje !== 'Ok'){
            logger.error("Error en apertura_caja - CajaController - " + err);

            return res.status(200).json({
                ok: false,
                mensaje: result[0][0].mensaje
            });
        }
        
        res.status(200).json(result);
    })
}

// ==================================================
//        
// ==================================================
public async cierre_caja(req: Request, res: Response): Promise<void> {

    var monto = req.body.monto;
    var observaciones = req.body.observaciones;

    if(observaciones == null || observaciones == 'null' || observaciones == '-' || observaciones == '' || observaciones == 'undefined' || observaciones == undefined)
    {
        observaciones = '-';
    }

    pool.query(`call bsp_cierre_caja('${monto}','${observaciones}')`, function(err: any, result: any){

        if(err || result[0].mensaje !== 'Ok'){
            logger.error("Error en bsp_cierre_caja - CajaController - " + err);

            return res.status(200).json({
                ok: false,
                mensaje: result[0][0].mensaje
            });
        }
        
        res.status(200).json(result);
    })
}


}


const productosController = new CajaController;
export default productosController;