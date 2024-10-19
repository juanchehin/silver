import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { IItemCompraStructure } from 'src/app/interfaces/item-compra.interface';
import { IItemTipoPagoStructure } from 'src/app/interfaces/item_tp.interface';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ComprasService } from 'src/app/services/compras.service';
import { UtilService } from '../../../../services/util.service';
import { ServiciosService } from 'src/app/services/servicios.service';
// import { ProveedorsService } from 'src/app/services/empleados.service';
import { TasasService } from 'src/app/services/tasas.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';

@Component({
  selector: 'app-nueva-compra',
  templateUrl: './nueva-compra.component.html',
  styleUrls: []
})
export class NuevaCompraComponent implements OnInit {

  currentDate = new Date();

  keywordProducto = 'producto';

  descuentoEfectivo: any = 0;
  tasa_dia: any = 0;
  productos: any;
  clienteBuscado = '';
  productoBuscado = '';
  IdPersona = '';
  local = '';
  descripcion_compra: any;
  lineas_compra: any[] = [];
  checkExists: any[] = [];
  lineas_tipos_pago: IItemTipoPagoStructure[] = [];  
  itemPendienteServicio: any = [];
  itemPendienteProducto: any = [];
  cantidadLineaCompraProducto = 1;

  tiposPago: any;
  clientes = [];
  datosVendedor: any;
  total_compra_bs: number = 0; // bolivares venezolanos
  total_compra_dolares: number = 0;  // usd

  //
  IdItem = 0;
  IdItemTipoPago = 0;
  IdTipoPagoSelect = 0;
  monto = 0;
  total_tipos_pagos_restantes_usd = 0;
  total_tipos_pagos_restantes_bs = 0;

  // cantidadLineaCompraProducto = 1;
  

  IdCliente = 0;
  arrayCompra: any = [];
  itemCheckExists: any = 0;
  itemIdProductoSabor: any;
  fecha_compra: any;

  precio_producto_pendiente: any;
  precio_servicio_pendiente: any;

  // Servicios
  servicios: any;
  keywordServicio = 'servicio';
  servicioBuscado = '';
  cantidadLineaCompraServicio = 1;

  // Proveedores
  proveedores: any;
  keywordProveedor = 'proveedor';
  proveedorBuscado = '';
  IdProveedor = 0;

  // Modals
  activarModal = false;
  activarModalDescuentoEfectivo = false;
  @ViewChild('divCerrarModal') divCerrarModal!: ElementRef<HTMLElement>;
  @ViewChild('divCerrarModalDescuentoEfectivo') divCerrarModalDescuentoEfectivo!: ElementRef<HTMLElement>;
  @ViewChild('buttonAbrirModalDescuentoEfectivo') buttonAbrirModalDescuentoEfectivo!: ElementRef<HTMLElement>;
  @ViewChild('divCerrarModalFormaPago') divCerrarModalFormaPago!: ElementRef<HTMLElement>;
  @ViewChild('botonCerrarModalNuevoCliente') botonCerrarModalNuevoCliente!: ElementRef<HTMLElement>;

  // =====
  porcentaje_un_pago: any;
  porcentaje_tres_pago: any;
  porcentaje_seis_pago: any;
  total_compra_inicial: any;
  porcentajeDescuentoEfectivo: any = 0;
  montoEfectivo = 0;
  total_tipos_pagos_usd = 0;
  total_tipos_pagos_bs = 0;


  constructor(
    public productosService: ProductosService, 
    public serviciosService: ServiciosService,
    public comprasService: ComprasService, 
    public authService: AuthService, 
    public usuariosService: UsuariosService,
    public activatedRoute: ActivatedRoute,
    public clientesService: ClientesService,
    // public empleadosService: ProveedorsService,
    public alertaService: AlertService,
    private utilService: UtilService,
    private router: Router,
    private proveedoresService: ProveedoresService,
    public tasasService: TasasService
    ) {
    
  }

  ngOnInit() {   
    // this.resetearVariables();
    this.fecha_compra = this.utilService.formatDateNow(new Date(Date.now()));
    this.IdPersona = this.authService.IdPersona;
    this.datosVendedor = [];
    this.dame_tasa_dia();
    // this.cargarDatosVendedor();
  }
  
// ==================================================
//        Crear 
// ==================================================

altaCompra() {
  
  this.IdPersona = this.authService.IdPersona;

  // if((this.IdTipoPagoSelect == undefined) ||(this.IdTipoPagoSelect <= 0))
  // { 
  //   this.alertaService.alertFail('Mensaje','Tipo de pago invalido',2000);
  //   return;
  // }

  // if ( (this.total_compra_dolares - this.total_tipos_pagos_usd) > 0.9 ) {
  //   this.alertaService.alertFail('Los totales no coinciden',false,2000);
  //   return;
  // }

    this.arrayCompra.push(        
      this.IdProveedor,
      this.lineas_compra,
      this.lineas_tipos_pago,
      this.total_compra_dolares,
      this.fecha_compra,
      this.descripcion_compra
    );
      this.comprasService.altaCompra(  this.arrayCompra )
      .subscribe({
        next: (resp: any) => {
          
          if ( resp.mensaje == 'ok') {
            this.alertaService.alertSuccess('Mensaje','Compra cargada',2000);

            // this.resetearVariables();
            this.router.navigate(['/dashboard/compras/listar']);

            
          } else {
            this.alertaService.alertFail('Ocurrio un error',false,2000);
          }
          return;
         },
        error: () => { this.alertaService.alertFail('Ocurrio un error',false,2000) }
      });

}

// ==================================================
// Carga
// ==================================================

cargarProveedores() {

  this.proveedoresService.buscarProveedoresPaginado( 0 ,  this.proveedorBuscado )
             .subscribe( (resp: any) => {

              this.proveedores = resp[0];

            });

}
// ==================================================
// Autocompletar de productos
// ==================================================

cargarProductos() {

  this.productosService.cargarProductos( this.productoBuscado )
             .subscribe( (resp: any) => {

              this.productos = resp[0];

            });

}


// ==================================================
// Carga
// ==================================================
cargarTiposPago() {

  // this.comprasService.cargarTiposPago( )
  //            .subscribe( {
  //             next: (resp: any) => {
              
  //             this.tiposPago = resp[0];

  //             this.porcentaje_un_pago = resp[1][0].tarjeta1pagos;
  //             this.porcentaje_tres_pago = resp[1][0].tarjeta3pagos;
  //             this.porcentaje_seis_pago = resp[1][0].tarjeta6pagos;

  //           },
  //           error: (err: any) => {
  //             this.alertaService.alertFail('Ocurrio un error al cargar los tipos de pago ' + err,false,400); }
  //         });

}

// ==================================================
// Carga los datos de la persona que esta realizando la compra
// ==================================================

cargarDatosVendedor() {
  
    this.usuariosService.cargarDatosVendedor(  this.IdPersona )
               .subscribe( {

                next: (resp: any) => { 

                  this.datosVendedor = resp[0][0];
                  this.fecha_compra = this.utilService.formatDateNow(resp[1][0].fecha_bd);

                },
                error: (err: any) => {
                  this.alertaService.alertFail('Ocurrio un error al cargar los datos del vendedor' + err,false,400); }
              });

  }

// ==================================================
// 
// ==================================================
  cambiaCantidadCompraProducto(cantidad: any) {
    
    // this.cantidadLineaCompra = cantidad.data;
    
  }
  
  // ==================================================
// 
// ==================================================
cambiaCantidadCompraServicio(cantidad: any) {
    
  // this.cantidadLineaCompra = cantidad.data;
  
}
// ==================================================
// 
// ==================================================
agregarLineaCompraProducto() {

  if(isNaN(Number(this.cantidadLineaCompraProducto)))
  { 
    this.alertaService.alertFail('Cantidad invalida',false,2000);
    return;
  }

  if(this.itemPendienteProducto.length <= 0)
  { 
    this.alertaService.alertFailWithText('Atencion','Debe seleccionar un producto en el buscador',2000);
    return;
  }

  this.total_compra_dolares += Number(this.precio_producto_pendiente) * this.cantidadLineaCompraProducto;

  const checkExistsLineaCompra = this.lineas_compra.find((linea_compra) => {
    if((linea_compra.IdProductoServicio == this.itemPendienteProducto.id_producto) && (linea_compra.tipo == 'producto'))
    {
      return true;
    }else{
      return false;
    }
  });
  

  if(!(checkExistsLineaCompra != undefined))
  {
    this.lineas_compra.push(
      {
        id_item: this.IdItem,
        IdProductoServicio: Number(this.itemPendienteProducto.id_producto),
        codigo: this.itemPendienteProducto.Codigo,
        producto_servicio: this.itemPendienteProducto.producto,
        cantidad: this.cantidadLineaCompraProducto,
        precio_compra: this.precio_producto_pendiente,
        tipo: 'producto'
      }
    );

    this.IdItem += 1;
  
    this.cantidadLineaCompraProducto = 1;
  }
  else{
    this.itemCheckExists = checkExistsLineaCompra;

    for (let item of this.lineas_compra) {

      if(this.itemPendienteProducto.Stock < (Number(item.cantidad) + Number(this.cantidadLineaCompraProducto)))
      { 
        this.alertaService.alertFail('Mensaje','Stock insuficiente para ' + this.itemPendienteProducto.Producto,3000);
        return;
      }

      if((item.IdProductoServicio == this.itemCheckExists.IdProductoServicio)  && (item.tipo == 'producto'))
      { 
        item.cantidad = Number(item.cantidad) + Number(this.cantidadLineaCompraProducto);

      }
     }
  }
 

}

// ==================================================
// 
// ==================================================
agregarLineaCompraServicio() {

  if(isNaN(Number(this.cantidadLineaCompraServicio)))
  { 
    this.alertaService.alertFail('Error en cantidad',false,2000);
    return;
  }


  if(this.itemPendienteServicio.length <= 0)
  { 
    this.alertaService.alertFailWithText('Atencion','Debe seleccionar un servicio en el buscador',2000);
    return;
  }

  if(isNaN(Number(this.precio_servicio_pendiente)) || (this.precio_servicio_pendiente <= 0))
  { 
    this.alertaService.alertFailWithText('Atencion','Error en precio producto',2000);
    return;
  }

  this.total_compra_dolares += Number(this.precio_servicio_pendiente) * this.cantidadLineaCompraServicio;

  this.total_compra_bs = this.total_compra_dolares;

  if(isNaN(Number(this.tasa_dia)) || (this.tasa_dia <= 0))
  { 
    this.alertaService.alertFailWithText('Atencion','Error en tasa del dia',2000);
    return;
  }


  this.total_compra_bs = this.total_compra_dolares * this.tasa_dia;


  
  const checkExistsLineaCompra = this.lineas_compra.find((linea_compra) => {
    if((linea_compra.IdProductoServicio == this.itemPendienteServicio.id_servicio) && (linea_compra.tipo == 'servicio'))
    {
      return true;
    }else{
      return false;
    }
  });

  if(!(checkExistsLineaCompra != undefined))
  {
    this.lineas_compra.push(
      {
        id_item: this.IdItem,
        IdProductoServicio: Number(this.itemPendienteServicio.id_servicio),
        codigo: this.itemPendienteServicio.Codigo,
        producto_servicio: this.itemPendienteServicio.servicio,
        cantidad: this.cantidadLineaCompraServicio,
        precio_compra: this.precio_servicio_pendiente,
        tipo: 'servicio'
      }
    );

    this.IdItem += 1;
  
    this.cantidadLineaCompraProducto = 1;
  }
  else{
    this.itemCheckExists = checkExistsLineaCompra;

    for (let item of this.lineas_compra) {

      if((item.IdProductoServicio == this.itemCheckExists.IdProductoServicio) && (item.tipo == 'servicio'))
      { 
        item.cantidad = Number(item.cantidad) + Number(this.cantidadLineaCompraServicio);
      }
     }
  }
 

}

// ==================================================
// Carga las lineas en el modal de tipos de pago
// ==================================================
agregarLineaTipoPago(): any {
  var bandera = false;

  if((Number(this.monto) <= 0) || (this.monto == undefined))
  {
    this.alertaService.alertFail('Debe seleccionar un monto',false,2000);
    return;
  }
  

  // ============== control caso pago USD =======================
  if((this.IdTipoPagoSelect == 18) || (this.IdTipoPagoSelect == 19))
  {

      if ( (+this.total_compra_dolares - +this.monto) <= 0.2 )
      {
        this.alertaService.alertFail('El monto es mayor que el total de la compra (USD) 1',false,2000);
        return;
      }
    
      if(((+this.total_tipos_pagos_usd + +this.monto) - +this.total_compra_dolares) >= 0.9)
      {
        this.alertaService.alertFail('El monto total es mayor que el total de la compra (USD) 2',false,2000);
        return;
      }
  }

  // ============== control caso pago VES =======================
  if((this.IdTipoPagoSelect == 15) || (this.IdTipoPagoSelect == 16) || (this.IdTipoPagoSelect == 17))
  {

    if((+this.total_compra_bs - +this.monto) <= 0.9)
      {
        this.alertaService.alertFail('El monto es mayor que el total de la compra (Bs.) 1',false,2000);
        return;
      }
    
      if(((this.total_tipos_pagos_bs + +this.monto) - this.total_compra_bs) >= 0.9 )
      {
        this.alertaService.alertFail('El monto total es mayor que el total de la compra (Bs.) 2',false,2000);
        return;
      }
    
  }
  
  // =====================================
  if((this.IdTipoPagoSelect == 13) && ((+this.monto) > this.total_compra_dolares))
  {
    this.alertaService.alertFail('El monto total es menor que el total de la compra',false,2000);
    return;
  }


  if((this.IdTipoPagoSelect == 13) && (this.lineas_tipos_pago.length <= 0))
  {
    this.alertaService.alertFail('Debe ingresar un tipo de pago antes de aplicar un descuento',false,2000);
    return;
  }

    //
  let obj = this.tiposPago.find((o: any) => 
  {
    if(o.id_tipo_pago == this.IdTipoPagoSelect)
    {
      return o;
    }
  }  
);


// Busco si ya existe el IdTipoPago en el array de lineas_tipos_pago
let exists_ltp = this.lineas_tipos_pago.find((ltp_item: any) => 
{
    if(ltp_item.IdTipoPago == this.IdTipoPagoSelect)
    { // linea_tipo_pago existente
      // No suma el subtotal en caso de ser con tarjeta en cuotas
      if((ltp_item.IdTipoPago == 8) || (ltp_item.IdTipoPago == 9) || (ltp_item.IdTipoPago == 10))
      {
        bandera = true;
      }else
      {
        return ltp_item;
      }
    }else{
      if(
          ((this.IdTipoPagoSelect == 8) || (this.IdTipoPagoSelect == 9) || (this.IdTipoPagoSelect == 10))
          &&
          ((ltp_item.IdTipoPago == 8) || (ltp_item.IdTipoPago == 9) || (ltp_item.IdTipoPago == 10)) 
        )
        {
          bandera = true;
        }
    }
  }
);


if(!bandera)
{    
  // SI existe el tipo pago en lineas_tipos_pago
  if(exists_ltp)
  {
     // ============== control caso pago USD =======================
    if((this.IdTipoPagoSelect == 18) || (this.IdTipoPagoSelect == 19))
    {
      let monto_usd = this.monto;
      let monto_bs = this.monto * this.tasa_dia;

      exists_ltp.SubTotal = +exists_ltp.SubTotal + +this.monto; // sumo al descuento existente

      this.total_tipos_pagos_usd = this.total_tipos_pagos_usd - +this.monto;

      // usd
      this.total_compra_dolares = this.total_compra_dolares - monto_usd;
      this.total_tipos_pagos_restantes_usd = this.total_compra_dolares - +this.total_tipos_pagos_usd;
      // bs
      this.total_compra_bs = this.total_compra_bs - monto_bs;
      this.total_tipos_pagos_restantes_bs = this.total_compra_bs + monto_bs;

    }

    // ============== control caso pago Bs. =======================
    if((this.IdTipoPagoSelect == 15) || (this.IdTipoPagoSelect == 16) || (this.IdTipoPagoSelect == 17))
    {
      let monto_usd = (this.monto / this.tasa_dia);
      let monto_bs = this.monto;

      exists_ltp.SubTotal = +exists_ltp.SubTotal + monto_bs; // sumo al descuento existente

      this.total_tipos_pagos_bs = this.total_tipos_pagos_bs - monto_bs;

      // bs
      this.total_compra_bs = this.total_compra_bs - monto_bs;
      this.total_tipos_pagos_restantes_bs = this.total_compra_bs + monto_bs;
      // usd
      this.total_compra_dolares = this.total_compra_dolares - monto_usd;
      this.total_tipos_pagos_restantes_usd = this.total_compra_dolares - monto_usd;
      
    }    

    return;
  }else{  // No existe el tipo de pago  

    this.lineas_tipos_pago.push(
    {
        IdItem: this.IdItemTipoPago,
        IdTipoPago: this.IdTipoPagoSelect,
        TipoPago: obj.tipo_pago,
        SubTotal: this.monto
    });

    
    switch (obj.id_tipo_pago) {
      case 1: // Pago efectivo
            this.total_tipos_pagos_usd = this.total_tipos_pagos_usd + +this.monto;
            this.total_tipos_pagos_restantes_usd = this.total_compra_dolares - +this.total_tipos_pagos_usd;

            break;
      case 9: // 1 pago
        var monto_aumento = +this.monto * ((this.porcentaje_un_pago / 100)); 
        this.total_compra_dolares = +this.total_compra_dolares + +monto_aumento;
        this.total_tipos_pagos_usd = this.total_tipos_pagos_usd + +this.monto + monto_aumento;          
        this.total_tipos_pagos_restantes_usd = this.total_compra_dolares - +this.total_tipos_pagos_usd;

        this.lineas_tipos_pago.push(
          {
            IdItem: this.IdItemTipoPago + 1,
            IdTipoPago: 12,
            TipoPago: 'Recargo Tarjeta',
            SubTotal: monto_aumento
          });

          break;
      case 10: // 3 pago            
          var monto_aumento = +this.monto * ((this.porcentaje_tres_pago / 100)); 
          this.total_compra_dolares = +this.total_compra_dolares + +monto_aumento;
          this.total_tipos_pagos_usd = this.total_tipos_pagos_usd + +this.monto + monto_aumento;          
          this.total_tipos_pagos_restantes_usd = this.total_compra_dolares - +this.total_tipos_pagos_usd;

          this.lineas_tipos_pago.push(
            {
              IdItem: this.IdItemTipoPago + 1,
              IdTipoPago: 12,
              TipoPago: 'Recargo Tarjeta',
              SubTotal: monto_aumento
            });

          break;
      case 11:  // 6 pago
        var monto_aumento = +this.monto * ((this.porcentaje_seis_pago / 100)); 
        this.total_compra_dolares = +this.total_compra_dolares + +monto_aumento;
        this.total_tipos_pagos_usd = this.total_tipos_pagos_usd + +this.monto + monto_aumento;          
        this.total_tipos_pagos_restantes_usd = this.total_compra_dolares - +this.total_tipos_pagos_usd;

        this.lineas_tipos_pago.push(
          {
            IdItem: this.IdItemTipoPago + 1,
            IdTipoPago: 12,
            TipoPago: 'Recargo Tarjeta',
            SubTotal: monto_aumento
          });

          break;
      case 13:  // Descuento
        this.total_compra_dolares = +this.total_compra_dolares - +this.monto;
        this.total_tipos_pagos_usd = this.total_tipos_pagos_usd - +this.monto;

          break;
      // ========== 15 - Pago movil Bs ===============
      case 15:
        
        this.total_tipos_pagos_usd = +(this.total_tipos_pagos_usd + (+this.monto / this.tasa_dia)).toFixed(1);
        this.total_tipos_pagos_bs = this.total_tipos_pagos_bs + +this.monto; 
        
        this.total_tipos_pagos_restantes_usd = this.total_compra_dolares - +this.total_tipos_pagos_usd;
        this.total_tipos_pagos_restantes_bs = this.total_compra_bs - +this.total_tipos_pagos_bs;

        break;
      // ========== 16 - tarjeta debito bs ===============
      case 16:

      this.total_tipos_pagos_usd = +(this.total_tipos_pagos_usd + (+this.monto / this.tasa_dia)).toFixed(1);
      this.total_tipos_pagos_bs = this.total_tipos_pagos_bs + +this.monto; 
      
      this.total_tipos_pagos_restantes_usd = this.total_compra_dolares - +this.total_tipos_pagos_usd;
      this.total_tipos_pagos_restantes_bs = this.total_compra_bs - +this.total_tipos_pagos_bs;
        break;
      // ========== 17 - tarjeta cred bs ===============
      case 17:
        this.total_tipos_pagos_usd = +(this.total_tipos_pagos_usd + (+this.monto / this.tasa_dia)).toFixed(1);
        this.total_tipos_pagos_bs = this.total_tipos_pagos_bs + +this.monto; 
        
        this.total_tipos_pagos_restantes_usd = this.total_compra_dolares - +this.total_tipos_pagos_usd;
        this.total_tipos_pagos_restantes_bs = this.total_compra_bs - +this.total_tipos_pagos_bs;

        break;
      // ========== 18 - Dolares efectivo USD ===============
      case 18:      

        this.total_tipos_pagos_usd = this.total_tipos_pagos_usd + +this.monto;  
        this.total_tipos_pagos_bs = +(this.total_tipos_pagos_usd + (+this.monto * this.tasa_dia)).toFixed(1);

        this.total_tipos_pagos_restantes_usd = this.total_compra_dolares - +this.total_tipos_pagos_usd;
        this.total_tipos_pagos_restantes_bs = +(+this.total_tipos_pagos_restantes_usd * this.tasa_dia).toFixed(1);

        break;
      // ========== 19 - zelle USD ===============
      case 19:
        this.total_tipos_pagos_usd = this.total_tipos_pagos_usd + +this.monto;  
        this.total_tipos_pagos_bs = this.total_tipos_pagos_usd * this.tasa_dia; 

        this.total_tipos_pagos_restantes_usd = this.total_compra_dolares - +this.total_tipos_pagos_usd;
        this.total_tipos_pagos_restantes_bs = +(+this.total_tipos_pagos_restantes_usd * this.tasa_dia).toFixed(1);

      break;
      // ========== default ===============
      default:
          this.total_tipos_pagos_usd = +this.total_tipos_pagos_usd + +this.monto;
          break;
    }

    

    this.IdItemTipoPago += 1;
  }

}else{
  this.alertaService.alertFail('No puede agregar dos tipos de pago con tarjeta',false,3000);
}


this.monto = 0;

}

// ==============================
  // Para proveedores
  // ================================
  selectEventProveedor(item: any) {
    this.IdProveedor = item.id_persona;
    // this.agregarLineaCompra(item);
    // do something with selected item
  }

  onChangeSearchProveedor(val: any) {

    if(val == '' || val == null)
    {
      return;
    }

    this.proveedorBuscado = val;
    this.cargarProveedores();
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }


  // ==============================
  // Para productos
  // ================================
  selectEventProducto(item: any) {
    
    this.precio_producto_pendiente = item.precio_compra;
    
    this.itemPendienteProducto = item;
  }
  //
  onChangeSearchProducto(val: any) {
    if(val == '' || val == null)
    {
      return;
    }
    this.productoBuscado = val;
    this.cargarProductos();
  }
  
  onFocusedProducto(e: any){
  }


  // ==============================
  // 
  // ================================
  continuarCompra()
  {

    if(this.total_compra_dolares <= 0)
    {
      this.alertaService.alertFail('El total de la compra debe ser mayor que cero',false,2000);
      return;
    }

    if((Number(this.IdProveedor) <= 0) || (this.IdProveedor == undefined))
    {
      this.alertaService.alertFail('Debe seleccionar un proveedor',false,2000);
      return;
    }

    this.total_compra_inicial = this.total_compra_dolares;
    this.activarModal = true;

    this.cargarTiposPago();
  }
  // ==============================
  // 
  // ================================
  eliminarItemCompra(pIdProductoServicio: any){

    this.lineas_compra.forEach( (item, index) => {
      if(item.IdProductoServicio == pIdProductoServicio) 
      {
        this.total_compra_dolares -= item.precio_compra * item.cantidad;
        this.lineas_compra.splice(index,1);
      }
        
    });

  }

  // ==============================
  // 
  // ================================
  eliminarItemTipoPago(linea_tp: any){

    this.lineas_tipos_pago.forEach( (item, index) => {
      if((item.IdItem === linea_tp.IdItem)) 
      {
        if(linea_tp.IdTipoPago != 13){
          this.lineas_tipos_pago.splice(index,1);

          this.total_tipos_pagos_usd -= +item.SubTotal;
  
          this.total_compra_dolares = this.total_compra_inicial;
          
          this.total_tipos_pagos_restantes_usd = this.total_compra_dolares - +this.total_tipos_pagos_usd;
        }else{  // Descuento
          this.lineas_tipos_pago.splice(index,1);

          this.total_tipos_pagos_usd += +item.SubTotal;
  
          this.total_compra_dolares = this.total_compra_inicial;
          
          this.total_tipos_pagos_restantes_usd = this.total_compra_dolares - +this.total_tipos_pagos_usd;
        }
      

      }

    });

  }

  // ==============================
  // 
  // ================================
  cerrarModalDescuentoEfectivo(){
    let el: HTMLElement = this.divCerrarModalDescuentoEfectivo.nativeElement;
    el.click();
  }

  // ============================================================
  // Se dispara al seleccionar (clic) un tipo de pago
  // ==============================================================
  onChangeTipoPago(val: any){
    this.IdTipoPagoSelect = val;

    if(this.IdTipoPagoSelect == 13)
    {
      const porcentaje = 20;
      const resultado_porcentaje = (this.total_compra_dolares) * (porcentaje / 100);
      this.monto = resultado_porcentaje;
    }

    if(this.IdTipoPagoSelect == 14)
    {
      const porcentaje = 30;      
      const resultado_porcentaje = (this.total_compra_dolares) * (porcentaje / 100);
      this.monto = resultado_porcentaje;
    }

  }


// ==============================
// 
// ================================
cerrarModal(){
  let el: HTMLElement = this.divCerrarModal.nativeElement;
  el.click();
}

validateNumericInput(event: KeyboardEvent) {
  // Permitir teclas como Backspace, Tab, etc.
  if (['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
    return;
  }

  // Verificar si la tecla presionada es un número
  if (!/^\d$/.test(event.key)) {
    this.alertaService.alertFail('Solo permitir números (0-9)',false,2000);
    event.preventDefault();  // Bloquear cualquier carácter que no sea numérico
  }
}


  // ==================================================
//  
// ==================================================
dame_tasa_dia() {

  this.tasasService.dame_tasa_dia( )
  .subscribe( {
          next: (resp: any) => {
            if((resp[1][0].mensaje == 'Ok')) {

              if((resp[0][0] !== null && resp[0][0] !== undefined))
              {
                this.tasa_dia = resp[0][0].tasa;
              }
              
            } else {                      
              this.alertaService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',1200);
            }            
      },
      error: () => { 
      this.alertaService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) 
      }
  });
}

}

