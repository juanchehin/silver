import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class ComprasController {

// ==================================================
//        Lista las compras entre un rango de fechas
// ==================================================
public async listarUsuariosPaginado(req: Request, res: Response): Promise<void> {
    var desde = req.query.desde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_usuarios_paginado('${desde}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.json(result);
    })
}


// ==================================================
//        Lista los ingresos
// ==================================================

public async listarCompras(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);

    var fecha_inicio = req.params.FechaInicio;
    var fecha_fin = req.params.FechaFin;
    var pTurno = req.params.pTurno;
        
    if(pTurno == 'manana')
    {
        fecha_inicio = fecha_inicio + " 09:00:00";
        fecha_fin = fecha_fin + " 15:00:00";
    }else{
        if (pTurno == 'tarde'){ 
                fecha_inicio = fecha_inicio + " 15:00:00";
                fecha_fin = fecha_fin + " 21:00:00";
            }else{
                fecha_inicio = fecha_inicio + " 00:00:01";
                fecha_fin = fecha_fin + " 23:59:59";
            }
    }


    pool.query(`call bsp_listar_transacciones_fecha('${desde}','${fecha_inicio}','${fecha_fin}')`, function(err: any, result: any, fields: any){

       if(err){
            logger.error("Error bsp_listar_transacciones_fecha - listarCompras - comprasController");
            res.status(404).json(err);
            return;
       }
       res.json(result);
   })

}


// ==================================================
//        Lista 
// ==================================================

public async listarComprasIdUsuario(req: Request, res: Response): Promise<void> {

    var desde = req.params.pDesde || 0;
    desde  = Number(desde);
    var pFecha = req.params.pFecha;
    var pIdPersona = req.params.pIdPersona;


    pool.query(`call bsp_listar_compras_idusuario('${desde}','${pFecha}','${pIdPersona}')`, function(err: any, result: any, fields: any){
       if(err){
            res.status(404).json(err);
           return;
       }
       res.json(result);
   })

}

// ==================================================
//         
// ==================================================
async altaCompra(req: Request, res: Response) {    

    // var pIdVendedor = req.params.IdPersona;
    var pIdCompra;

    var pIdProveedor = req.body[0];
    var pLineasCompra = req.body[1];
    var pMontoTotal = req.body[3];
    var pFechaCompra = req.body[4];
    var pDescripcion = req.body[5];
    
    if(pDescripcion == null || pDescripcion == 'null' || pDescripcion == '-' || pDescripcion == '' || pDescripcion == 'undefined' || pDescripcion == undefined)
    {
        pDescripcion = '-';
    }


    // ==============================
    try {
        // ====================== Alta Compra ===========================================
        let sql = `call bsp_alta_compra('${pIdProveedor}','${pMontoTotal}','${pDescripcion}')`;
        const [result] = await pool.promise().query(sql)
        
        if(result[0][0].Mensaje != 'Ok')
        {
            logger.error("Error bsp_alta_compra - altaCompra - comprasController");

        }       
        // ========================== Lineas de compra =======================================

        pLineasCompra.forEach(async function (value: any) {

            let sql2 = `call bsp_alta_linea_compra('${result[0][0].id_compra}','${value.IdProductoServicio}',
            '${value.precio_compra}','${value.cantidad}')`;
            
            const [result2] = await pool.promise().query(sql2)

            if(result2[0][0].mensaje != 'Ok')
            {
                logger.error("Error bsp_alta_linea_compra - comprasController");
            }
        });


        pIdCompra = result[0][0].IdCompra;

        // ======================= Confirmar transferencia exitosa ==========================================
      

        // return result
      } catch (error) {
        logger.error("Error funcion altaCompra - comprasController");
        res.status(404).json({ "error" : error});
        return;
      }
      res.json({"mensaje": 'ok'});
}


// ==================================================
//         
// ==================================================
async alta_egreso(req: Request, res: Response) {

    var pIdVendedor = req.params.IdPersona;
    var pIdCompra;

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
            logger.error("Error bsp_alta_egreso - altaEgreso - comprasController");

        }

        // return result
      } catch (error) {
        logger.error("Error funcion alta egreso - comprasController");
        res.status(404).json({ "error" : error});
        return;
      }
      res.json({ Mensaje : 'Ok'});
    //   res.json({"mensaje": await confirmarTransaccion(pIdCompra)});
}


// ==================================================
//        Lista 
// ==================================================
listarTiposPago(req: Request, res: Response) {

    pool.query(`call bsp_listar_tipos_pago()`, function(err: any, result: any){
       if(err){
           return;
       }
       res.json(result);
   })

}


// ==================================================
//        
// ==================================================
listar_transacciones(req: Request, res: Response) {

    var desde = req.params.desde || 0;
    desde  = Number(desde);

    var FechaInicio = req.params.FechaInicio;
    var FechaFin = req.params.FechaFin;

    pool.query(`call listar_transacciones_fecha('${desde}','${FechaInicio}','${FechaFin}')`, function(err: any, result: any){
       if(err){
           return;
       }
       res.json(result);
   })

}

// ==================================================
//  
// ==================================================
public async baja_transaccion(req: Request, res: Response): Promise<any> {
    
    // const { IdPersona } = req.params;
    const { id_transaccion } = req.params;

    pool.query(`call bsp_baja_transaccion('${id_transaccion}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        
        res.status(200).json(result[0]);
    })

}

// ==================================================
//        
// ==================================================
dame_transaccion(req: Request, res: Response) {

    var id_transaccion = req.params.id_transaccion;

    pool.query(`call bsp_dame_transaccion('${id_transaccion}')`, function(err: any, result: any){
       if(err){
           return;
       }
       res.json(result);
   })

}

}


const comprasController = new ComprasController;
export default comprasController;
