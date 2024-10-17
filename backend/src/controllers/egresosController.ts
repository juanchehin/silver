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

    var pIdVendedor = req.params.IdPersona;
    var pIdVenta;

    var pIdEmpleado = req.body[0];
    var pIdUsuarioActual = req.body[1];
    var pMonto = req.body[2];
    var pIdTipoPago = req.body[3];
    var pMetodoPago = req.body[4];
    var pDescripcion = req.body[5];

    // ==============================
    try {
        // ====================== Alta  ===========================================
        let sql = `call bsp_alta_egreso('${pMonto}','${pIdTipoPago}','${pMetodoPago}','${pIdEmpleado}','${pIdUsuarioActual}','${pDescripcion}')`;
        const [result] = await pool.promise().query(sql)
        

        if(result[0][0].Mensaje != 'Ok')
        {
            logger.error("Error bsp_alta_egreso - altaEgreso - egresosController");

        }

        // return result
      } catch (error) {
        logger.error("Error funcion alta egreso - egresosController");
        res.status(404).json({ "error" : error});
        return;
      }
      res.json({ Mensaje : 'Ok'});
    //   res.json({"mensaje": await confirmarTransaccion(pIdVenta)});
}


}


const egresosController = new EgresosController;
export default egresosController;