import { Request, Response } from 'express';
import pool from '../database';
const bcrypt = require('bcrypt');
const logger = require("../utils/logger").logger;

class ProveedoresController {
// ==================================================
//        Lista personas desde cierto valor
// ==================================================
public async listarProveedoresPaginado(req: Request, res: Response): Promise<void> {
    var desde = req.query.desde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_proveedores_paginado('${req.params.IdPersona}','${desde}')`, function(err: any, result: any, fields: any){
        if(err){
            return;
        }
        res.json(result);
    })
}


// ==================================================
//   Listado de proveedores en panel
// ==================================================
public async buscarProveedorPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);
    var pParametroBusqueda = req.params.pParametroBusqueda || '';

    if(pParametroBusqueda == null || pParametroBusqueda == 'null' || pParametroBusqueda == '-' || pParametroBusqueda == '')
    {
        pParametroBusqueda = '-';
    }

    pool.query(`call bsp_buscar_proveedores_paginado('${pParametroBusqueda}','${desde}')`, function(err: any, result: any){
        
        console.log("🚀 ~ ProveedoresController ~ result:", result)
        console.log("🚀 ~ ProveedoresController ~ err:", err)
        if(err){
            logger.error("Error en bsp_buscar_proveedores_paginado - ProveedoresController - " + err);

            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}
// ==================================================
//        Inserta un proveedor
// ==================================================
public async altaProveedor(req: Request, res: Response) {

    var IdProveedor = req.params.IdPersona;

    var Apellidos = req.body[0];
    var Nombres = req.body[1];
    var cedula = req.body[2];
    var telefono = req.body[3];
    var mail = req.body[4];
    var direccion = req.body[5];
    var fecha_nac = req.body[6];
    var observaciones = req.body[7];
    var codigo = req.body[8];
    var pass = req.body[9];
    var id_rol = req.body[10];
    
    const saltRounds = 10;  //  Data processing speed

    bcrypt.genSalt(saltRounds, function(err: any, salt: any) {
        bcrypt.hash(pass, salt, async function(err: any, hash: any) {

            pool.query(`call bsp_alta_proveedor('${IdProveedor}','${Apellidos}','${Nombres}'
                ,'${hash}','${telefono}','${cedula}','${mail}','${fecha_nac}'
                ,'${direccion}','${codigo}','${id_rol}','${observaciones}')`, function(err: any, result: any, fields: any){        
            
                if(err && result && result[0] && result[0][0].mensaje != 'Ok'){
                    logger.error("Error bsp_alta_proveedor - altaProveedor - proveedoresController ");

                    return res.json({
                        ok: false,
                        mensaje: result[0][0].mensaje
                    });
                }

                // =============Fin permisos================                
                return res.json({
                    ok: true,
                    mensaje: result[0][0].mensaje
                });

            })

        });
    });

}

// ==================================================
//        Lista personas desde cierto valor
// ==================================================
public async dameProveedor(req: Request, res: Response): Promise<void> {
    var pIdPersona = req.params.pIdPersona;

    pool.query(`call bsp_dame_proveedor('${pIdPersona}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json({ text: err });
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//        Lista personas desde cierto valor
// ==================================================
public async bajaProveedor(req: Request, res: Response): Promise<void> {
    
    var pIdPersona = req.params.IdPersona; // persona que realiza la transaccion
    var pIdProveedor = req.params.pIdProveedor; // proveedor que sera dado de baja

    pool.query(`call bsp_baja_proveedor('${pIdPersona}','${pIdProveedor}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json({ text: err });
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//     
// ==================================================
public async cargarDatosFormEditarProveedor(req: Request, res: Response): Promise<void> {
    var pIdPersona = req.params.IdPersona;
    var pIdProveedor = req.params.IdProveedor;

    pool.query(`call bsp_dame_datos_form_editar_proveedor('${pIdPersona}','${pIdProveedor}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json({ text: err });
            return;
        }
        res.status(200).json(result);
    })
}



// ==================================================
//       
// ==================================================
public async editarProveedor(req: Request, res: Response) {

    var respuestaFinal = 'Ok';
    var IdPersona = req.params.IdPersona;
    var IdProveedor = req.params.IdProveedor;
    var Apellidos = req.body[0];
    var Nombres = req.body[1];
    var Proveedor = req.body[2];
    var Correo = req.body[3];
    var Telefono = req.body[4];
    var DNI = req.body[5];
    var Password = req.body[6];
    var Observaciones = req.body[7];
    var FechaNac = req.body[8];
    var IdSucursal = req.body[9];
    var arrayPermisos = req.body[10];
    
    if(FechaNac != null && FechaNac != 'null')
    {
        var myDateString = FechaNac;
    }
    else
    {
        var myDateString = null;
    }

    const saltRounds = 10;  //  Data processing speed

    if(Password != null && Password != '' && Password != 'null' && Password != 'undefined' && Password != undefined)
    {
        bcrypt.genSalt(saltRounds, function(err: any, salt: any) {
            bcrypt.hash(Password, salt, async function(err: any, hash: any) {
    
                pool.query(`call bsp_editar_proveedor('${IdPersona}','${IdProveedor}','${Apellidos}','${Nombres}','${hash}','${Telefono}','${DNI}','${Correo}','${myDateString}','${Proveedor}','${IdSucursal}','${Observaciones}')`, function(err: any, result: any){        
                                    
                    if(err || result[0][0].mensaje != 'Ok'){
                        logger.error("Error bsp_editar_proveedor - editarProveedor - proveedoresController " + err);

                        respuestaFinal = 'Ocurrio un error, contactese con el administrador';
                        return;
                    }
    
                    // =========== Cargo los permisos para el proveedor ===================
                    arrayPermisos.forEach(function (pIdPermiso: any) {
    
                        pool.query(`call bsp_editar_permisos_proveedor('${IdPersona}','${IdProveedor}','${pIdPermiso}')`, function(err2: any, result2: any){

                            if(err2 || result2[0][0].mensaje != 'Ok'){
                                logger.error("Error bsp_editar_permisos_proveedor - editarProveedor - proveedoresController " + err);

                                respuestaFinal = result2[0][0].mensaje;
                                return;
                            }
                            
                        })
    
                    }); 
                    // =============Fin permisos=================
                    return res.json({ mensaje: respuestaFinal });
                })
    
            });
        });
    }
    else
    {
        pool.query(`call bsp_editar_proveedor('${IdPersona}','${IdProveedor}','${Apellidos}','${Nombres}',null,'${Telefono}','${DNI}','${Correo}','${myDateString}','${Proveedor}','${IdSucursal}','${Observaciones}')`, function(err: any, result: any){        

            if(err || result[0][0].mensaje != 'Ok'){
                logger.error("Error bsp_editar_proveedor 2 - editarProveedor - proveedoresController " + err);

                return res.json({
                    ok: false,
                    mensaje: 'Ocurrio un error, contactese con el administrador'
                });
            }
    
            // =========== Cargo los permisos para el proveedor ===================
            arrayPermisos.forEach(function (pIdPermiso: any) {
    
                pool.query(`call bsp_editar_permisos_proveedor('${IdPersona}','${IdProveedor}','${pIdPermiso}')`, function(err2: any, result2: any){

                    if(err2 || result2[0][0].mensaje != 'Ok'){
                        logger.error("Error bsp_editar_proveedor 2 - editarProveedor - proveedoresController " + err2);

                        return res.json({
                            ok: false,
                            mensaje: 'Ocurrio un error, contactese con el administrador'
                        });
                    }
                    
                })
    
            }); 
            // =============Fin permisos=================
            return res.json({ mensaje: 'Ok' });
        })
    }   

    return;  

}

}


const proveedoresController = new ProveedoresController;
export default proveedoresController;