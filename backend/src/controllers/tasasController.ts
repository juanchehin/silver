import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class TasasController {
  

// ==================================================
//        Lista
// ==================================================

public async dame_tasas(req: Request, res: Response): Promise<void> {

  var desde = req.params.pDesde || 0;
  desde  = Number(desde);

  pool.query(`call bsp_listar_tasas('${desde}')`, function(err: any, result: any, fields: any){
    
      if(err){
        logger.error("Error en bsp_listar_tasas - dame_tasas " + err);

          console.log("error", err);
          return;
      }
      res.json(result);
  })
}

// ==================================================
//        update 
// ==================================================

public async tasasConfiguraciones(req: Request, res: Response): Promise<void> {

  var IdUsuario = req.params.IdPersona;

  var porcentaje_comision = req.body[0] || '';
  var empresa = req.body[1] || '';
  var direccion_empresa = req.body[2]|| '';
  var cuit = req.body[3] || '';
  var telefono_empresa = req.body[4] || '';
  var ing_brutos = req.body[5] || '';

  var pTarjeta1 = req.body[6] || 0;
  var pTarjeta3 = req.body[7] || 0;
  var pTarjeta6 = req.body[8] || 0;

  pool.query(`call bsp_actualizar_tasas('${porcentaje_comision}','${empresa}','${direccion_empresa}','${cuit}','${telefono_empresa}','${ing_brutos}'
  ,'${pTarjeta1}','${pTarjeta3}','${pTarjeta6}'
    )`, function(err: any, result: any, fields: any){
      if(err){
        logger.error("Error en tasasConfiguraciones - bsp_actualizar_tasas - tasasConfiguraciones");

          res.status(400).json(err);
          return;
      }
      res.status(200).json(result);
  })
}

// ==================================================
//       
// ==================================================

public async dame_tasa_dia(req: Request, res: Response): Promise<void> {

  pool.query(`call bsp_dame_tasa_dia()`, function(err: any, result: any, fields: any){
    
      if(err){
        logger.error("Error en dame_tasa_dia " + err);

          console.log("error", err);
          return;
      }
      res.json(result);
  })
}

}

const tasasController = new TasasController;
export default tasasController;