import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class ComisionesController {

// ==================================================
//        Lista las comisiones entre un rango de fechas
// ==================================================
public async listar_comisiones(req: Request, res: Response): Promise<void> {
    
    var desde = req.query.desde || 0;
    desde  = Number(desde);

    var p_fecha_inicio = req.params.p_fecha_inicio || 0;
    var p_fecha_fin = req.params.p_fecha_fin || 0;
    var id_empleado_seleccionado = req.params.id_empleado_seleccionado || 0;

    pool.query(`call bsp_listar_comisiones_fecha('${desde}','${p_fecha_inicio}',
        '${p_fecha_fin}','${id_empleado_seleccionado}')`, function(err: any, result: any, fields: any){

        if(err){
            logger.error("Error en bsp_listar_comisiones_paginado - ComisionesController ");

            res.status(404).json(err);
            return;
        }
        res.json(result);
    })
}


// ==================================================
//         
// ==================================================
async alta_comision(req: Request, res: Response) {

    var pMontoEgreso = req.body[0];
    var pDescripcion = req.body[1];

    pool.query(`call bsp_alta_comision('${pMontoEgreso}','${pDescripcion}')`, function(err: any, result: any, fields: any){
        if(err){
            logger.error("Error bsp_alta_comision - altaEgreso - comisionesController");

             res.status(404).json(err);
            return;
        }
        res.json(result);
    })

}


}


const comisionesController = new ComisionesController;
export default comisionesController;