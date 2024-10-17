import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class EgresosController {

// ==================================================
//        Lista las egresos entre un rango de fechas
// ==================================================
public async listar_egresos(req: Request, res: Response): Promise<void> {
    var desde = req.query.desde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_egresos_paginado('${desde}')`, function(err: any, result: any, fields: any){
        if(err){
            logger.error("Error en bsp_listar_egresos_paginado - EgresosController ");

            res.status(404).json(err);
            return;
        }
        res.json(result);
    })
}


// ==================================================
//         
// ==================================================
async alta_egreso(req: Request, res: Response) {

    var pMontoEgreso = req.body[0];
    var pDescripcion = req.body[1];

    pool.query(`call bsp_alta_egreso('${pMontoEgreso}','${pDescripcion}')`, function(err: any, result: any, fields: any){
        if(err){
            logger.error("Error bsp_alta_egreso - altaEgreso - egresosController");

             res.status(404).json(err);
            return;
        }
        res.json(result);
    })

}


}


const egresosController = new EgresosController;
export default egresosController;