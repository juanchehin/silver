import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IItemVentaStructure } from 'src/app/interfaces/item-venta.interface';
import { IItemTipoPagoStructure } from 'src/app/interfaces/item_tp.interface';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { VentasService } from 'src/app/services/ventas.service';
import { UtilService } from '../../../../services/util.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { TasasService } from 'src/app/services/tasas.service';

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrls: []
})
export class NuevaVentaComponent implements OnInit {

  currentDate = new Date();

  keywordCliente = 'NombreCompleto';
  keywordProducto = 'producto';

  descuentoEfectivo: any = 0;
  tasa_dia: any = 0;
  productos: any;
  clienteBuscado = '';
  productoBuscado = '';
  IdPersona = '';
  local = '';
  descripcion_venta: any;
  lineas_venta: IItemVentaStructure[] = [];
  checkExists: IItemVentaStructure[] = [];
  lineas_tipos_pago: IItemTipoPagoStructure[] = [];  
  itemPendienteServicio: any = [];
  itemPendienteProducto: any = [];

  tiposPago: any;
  clientes = [];
  datosVendedor: any;
  total_venta_bs: any = 0; // bolivares venezolanos
  total_venta_dolares: any = 0;  // usd

  //
  IdItem = 0;
  IdItemTipoPago = 0;
  IdTipoPagoSelect = 0;
  monto: any = 0;
  total_tipos_pagos_restantes_usd = 0;
  total_tipos_pagos_restantes_bs = 0;

  cantidadLineaVentaProducto = 1;
  

  IdCliente = 0;
  arrayVenta: any = [];
  itemCheckExists: any = 0;
  itemIdProductoSabor: any;
  fecha_venta: any;

  precio_producto_pendiente: any;
  precio_servicio_pendiente: any;

  // Servicios
  servicios: any;
  keywordServicio = 'servicio';
  servicioBuscado = '';
  cantidadLineaVentaServicio = 1;

  // Empleados
  empleados: any;
  keywordEmpleado = 'empleado';
  empleadoBuscado = '';
  IdEmpleado = 0;

  // Nuevo cliente
  apellidos_nuevo_cliente: any;
  nombres_nuevo_cliente: any;
  dni_nuevo_cliente: any;
  telefono_nuevo_cliente: any;
  email_nuevo_cliente: any;
  direccion_nuevo_cliente: any;
  fecha_nac_nuevo_cliente: any;
  observaciones_nuevo_cliente: any;

  // serv avanzado - modal
  servicios_modal!: any;
  totalServicios = 0;
  id_servicio_seleccionado_modal: any;
  @ViewChild('inputServicioBuscado') inputServicioBuscado!: ElementRef;
  @ViewChild('inputServicioBuscadoModal') inputServicioBuscadoModal!: ElementRef;

  
  @ViewChild('inputVendedor') inputVendedor: any;
  @ViewChild('inputProducto') inputProducto: any;
  @ViewChild('inputServicio') inputServicio: any;
  @ViewChild('inputCliente') inputCliente: any;

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
  total_venta_inicial_usd: any;
  total_venta_inicial_bs: any;

  porcentajeDescuentoEfectivo: any = 0;
  montoEfectivo = 0;
  total_tipos_pagos_usd = 0;
  total_tipos_pagos_bs = 0;


  constructor(
    public productosService: ProductosService, 
    public serviciosService: ServiciosService,
    public ventasService: VentasService, 
    public authService: AuthService, 
    public usuariosService: UsuariosService,
    public activatedRoute: ActivatedRoute,
    public clientesService: ClientesService,
    public empleadosService: EmpleadosService,
    public alertaService: AlertService,
    private utilService: UtilService,
    private router: Router,
    public tasasService: TasasService
    ) {
    
  }

  ngOnInit() {   
    // this.resetearVariables();
    this.fecha_venta = this.utilService.formatDateNow(new Date(Date.now()));
    this.IdPersona = this.authService.IdPersona;
    this.datosVendedor = [];
    this.dame_tasa_dia();
    // this.cargarDatosVendedor();
  }
  
// ==================================================
//        Crear 
// ==================================================

altaVenta() {
  
  this.IdPersona = this.authService.IdPersona;

  if((this.IdTipoPagoSelect == undefined) ||(this.IdTipoPagoSelect <= 0))
  { 
    this.alertaService.alertFail('Mensaje','Tipo de pago invalido',2000);
    return;
  }

  if ( (this.total_venta_dolares - this.total_tipos_pagos_usd) > 0.9 ) {
    this.alertaService.alertFail('Los totales no coinciden',false,2000);
    return;
  }

      this.arrayVenta.push(        
        this.IdCliente,
        this.IdEmpleado,
        this.lineas_venta,
        this.lineas_tipos_pago,
        this.total_venta_dolares,
        this.fecha_venta,
        this.descripcion_venta
      );

      this.ventasService.altaVenta(  this.arrayVenta )
      .subscribe({
        next: (resp: any) => {
          
          if ( resp.mensaje == 'ok') {
            this.alertaService.alertSuccess('Mensaje','Venta cargada',2000);

            let el: HTMLElement = this.divCerrarModalFormaPago.nativeElement;
            el.click();

            // this.resetearVariables();
            this.router.navigate(['/dashboard']);

            
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

cargarClientes() {

    this.clientesService.cargarClientes( this.clienteBuscado )
               .subscribe( (resp: any) => {

                this.clientes = resp;

              });

  }

  // ==================================================
// Carga
// ==================================================

cargarEmpleados() {

  this.empleadosService.cargarEmpleados( this.empleadoBuscado )
             .subscribe( (resp: any) => {

              this.empleados = resp;

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
// Autocompletar de servicios
// ==================================================

cargarServicios() {

  this.serviciosService.cargarServicios( this.servicioBuscado )
             .subscribe( (resp: any) => {

              this.servicios = resp[0];

            });

}
// ==================================================
// Carga
// ==================================================
cargarTiposPago() {

  this.ventasService.cargarTiposPago( )
             .subscribe( {
              next: (resp: any) => {
              
              this.tiposPago = resp[0];

              this.porcentaje_un_pago = resp[1][0].tarjeta1pagos;
              this.porcentaje_tres_pago = resp[1][0].tarjeta3pagos;
              this.porcentaje_seis_pago = resp[1][0].tarjeta6pagos;

            },
            error: (err: any) => {
              this.alertaService.alertFail('Ocurrio un error al cargar los tipos de pago ' + err,false,400); }
          });

}

// ==================================================
// Carga los datos de la persona que esta realizando la venta
// ==================================================

cargarDatosVendedor() {
  
    this.usuariosService.cargarDatosVendedor(  this.IdPersona )
               .subscribe( {

                next: (resp: any) => { 

                  this.datosVendedor = resp[0][0];
                  this.fecha_venta = this.utilService.formatDateNow(resp[1][0].fecha_bd);

                },
                error: (err: any) => {
                  this.alertaService.alertFail('Ocurrio un error al cargar los datos del vendedor' + err,false,400); }
              });

  }

// ==================================================
// 
// ==================================================
  cambiaCantidadVentaProducto(cantidad: any) {
    
    // this.cantidadLineaVenta = cantidad.data;
    
  }
  
  // ==================================================
// 
// ==================================================
cambiaCantidadVentaServicio(cantidad: any) {
    
  // this.cantidadLineaVenta = cantidad.data;
  
}
// ==================================================
// 
// ==================================================
agregarLineaVentaProducto() {

  if(isNaN(Number(this.cantidadLineaVentaProducto)))
  { 
    this.alertaService.alertFail('Error en cantidad',false,2000);
    return;
  }

  if((this.itemPendienteProducto.Stock <= 0) || (this.itemPendienteProducto.stock < this.cantidadLineaVentaProducto))
  { 
    this.alertaService.alertFail('Stock insuficiente para "' + this.itemPendienteProducto.producto + '"',false,2000);
    return;
  }

  if(this.itemPendienteProducto.length <= 0)
  { 
    this.alertaService.alertFailWithText('Atencion','Debe seleccionar un producto en el buscador',2000);
    return;
  }

  if(isNaN(Number(this.precio_producto_pendiente)) || (this.precio_producto_pendiente <= 0))
  { 
    this.alertaService.alertFailWithText('Atencion','Error en precio producto',2000);
    return;
  }

  this.total_venta_dolares += Number(this.precio_producto_pendiente) * this.cantidadLineaVentaProducto;

  const checkExistsLineaVenta = this.lineas_venta.find((linea_venta) => {
    if((linea_venta.IdProductoServicio == this.itemPendienteProducto.id_producto) && (linea_venta.tipo == 'producto'))
    {
      return true;
    }else{
      return false;
    }
  });

  this.total_venta_bs = this.total_venta_dolares * this.tasa_dia;  

  if(!(checkExistsLineaVenta != undefined))
  {
    this.lineas_venta.push(
      {
        id_item: this.IdItem,
        IdProductoServicio: Number(this.itemPendienteProducto.id_producto),
        codigo: this.itemPendienteProducto.Codigo,
        producto_servicio: this.itemPendienteProducto.producto,
        cantidad: this.cantidadLineaVentaProducto,
        precio_venta: this.precio_producto_pendiente,
        tipo: 'producto'
      }
    );

    this.IdItem += 1;
  
    this.cantidadLineaVentaProducto = 1;
  }
  else{
    this.itemCheckExists = checkExistsLineaVenta;

    for (let item of this.lineas_venta) {

      if(this.itemPendienteProducto.Stock < (Number(item.cantidad) + Number(this.cantidadLineaVentaProducto)))
      { 
        this.alertaService.alertFail('Mensaje','Stock insuficiente para ' + this.itemPendienteProducto.Producto,3000);
        return;
      }

      if((item.IdProductoServicio == this.itemCheckExists.IdProductoServicio)  && (item.tipo == 'producto'))
      { 
        item.cantidad = Number(item.cantidad) + Number(this.cantidadLineaVentaProducto);

      }
     }
  }
 

}

// ==================================================
// 
// ==================================================
agregarLineaVentaServicio() {

  let withoutTrailingZeros = this.precio_servicio_pendiente.replace(/,(0+)$/, '');
  // Elimina el punto
  this.precio_servicio_pendiente = withoutTrailingZeros.replace('.', '');

  if(isNaN(Number(this.cantidadLineaVentaServicio)))
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

  this.total_venta_dolares += Number(this.precio_servicio_pendiente) * this.cantidadLineaVentaServicio;

  this.total_venta_bs = this.total_venta_dolares;

  if(isNaN(Number(this.tasa_dia)) || (this.tasa_dia <= 0))
  { 
    this.alertaService.alertFailWithText('Atencion','Error en tasa del dia',2000);
    return;
  }


  this.total_venta_bs = this.total_venta_dolares * this.tasa_dia;

  
  const checkExistsLineaVenta = this.lineas_venta.find((linea_venta) => {
    if((linea_venta.IdProductoServicio == this.itemPendienteServicio.id_servicio) && (linea_venta.tipo == 'servicio'))
    {
      return true;
    }else{
      return false;
    }
  });

  if(!(checkExistsLineaVenta != undefined))
  {
    this.lineas_venta.push(
      {
        id_item: this.IdItem,
        IdProductoServicio: Number(this.itemPendienteServicio.id_servicio),
        codigo: this.itemPendienteServicio.Codigo,
        producto_servicio: this.itemPendienteServicio.servicio,
        cantidad: this.cantidadLineaVentaServicio,
        precio_venta: this.precio_servicio_pendiente,
        tipo: 'servicio'
      }
    );

    this.IdItem += 1;
  
    this.cantidadLineaVentaProducto = 1;
  }
  else{
    this.itemCheckExists = checkExistsLineaVenta;

    for (let item of this.lineas_venta) {

      if((item.IdProductoServicio == this.itemCheckExists.IdProductoServicio) && (item.tipo == 'servicio'))
      { 
        item.cantidad = Number(item.cantidad) + Number(this.cantidadLineaVentaServicio);
      }
     }
  }
 
  this.precio_servicio_pendiente = 0;
  this.clearPanelinputServicio();

}

// ==================================================
// carga un servicio en caso de busq avanzada de serv en el
// modal
// ==================================================
agregarLineaVentaServicioModal(p_servicio: any) {

  if(p_servicio.length <= 0)
  { 
    this.alertaService.alertFailWithText('Atencion','Debe seleccionar un servicio en el buscador',2000);
    return;
  }

  let withoutTrailingZeros = p_servicio.precio.replace(/,(0+)$/, '');
  // Elimina el punto
  let precioNumerico = withoutTrailingZeros.replace('.', '');

  if(isNaN(precioNumerico) || (p_servicio.precio <= 0))
  { 
    this.alertaService.alertFailWithText('Atencion','Error en precio producto',2000);
    return;
  }

  this.total_venta_dolares += Number(precioNumerico) * 1;

  this.total_venta_bs = this.total_venta_dolares;



  if(isNaN(Number(this.tasa_dia)) || (this.tasa_dia <= 0))
  { 
    this.alertaService.alertFailWithText('Atencion','Error en tasa del dia',2000);
    return;
  }


  this.total_venta_bs = this.total_venta_dolares * this.tasa_dia;
  
  
  const checkExistsLineaVenta = this.lineas_venta.find((linea_venta) => {
    if((linea_venta.IdProductoServicio == p_servicio.id_servicio) && (linea_venta.tipo == 'servicio'))
    {
      return true;
    }else{
      return false;
    }
  });

  //
  if(!(checkExistsLineaVenta != undefined))
  {
    this.lineas_venta.push(
      {
        id_item: this.IdItem,
        IdProductoServicio: Number(p_servicio.id_servicio),
        codigo: p_servicio.codigo,
        producto_servicio: p_servicio.servicio,
        cantidad: 1,
        precio_venta: precioNumerico,
        tipo: 'servicio'
      }
    );

    this.IdItem += 1;
  
    this.cantidadLineaVentaProducto = 1;
  }
  else{
    this.itemCheckExists = checkExistsLineaVenta;

    for (let item of this.lineas_venta) {

      if((item.IdProductoServicio == this.itemCheckExists.IdProductoServicio) && (item.tipo == 'servicio'))
      { 
        item.cantidad = Number(item.cantidad) + Number(this.cantidadLineaVentaServicio);
      }
     }
  }
 

}
// ==================================================
// Carga las lineas en el modal de tipos de pago
// ==================================================
agregarLineaTipoPago(): any {
  var bandera = false;
  
  if((this.monto == undefined) || (Number(this.monto) <= 0) )
  {
    this.alertaService.alertFail('Monto invalido',false,2000);
    return;
  }

  if((this.total_tipos_pagos_usd == undefined) || (Number(this.total_tipos_pagos_usd) < 0) )
  {
    this.alertaService.alertFail('Monto invalido',false,2000);
    return;
  }

  if((this.total_tipos_pagos_bs == undefined) || (Number(this.total_tipos_pagos_bs) < 0) )
  {
    this.alertaService.alertFail('Monto invalido',false,2000);
    return;
  }


  // quito los ceros a la derecha despues de la coma
  var num_monto =  this.monto.replace(/,\d*$/, "");
  // elimino puntos y comas
  this.monto = num_monto.replace(/[.,]/g, "");

  
  // ============== control caso pago USD =======================
  if((this.IdTipoPagoSelect == 18) || (this.IdTipoPagoSelect == 19))
  {

      if ( (+this.total_venta_dolares - +this.monto) < 0 )
      {
        this.alertaService.alertFail('El monto es mayor que el total de la venta (USD)',false,2000);
        this.monto = 0;
        return;
      }

      if((+this.total_tipos_pagos_restantes_usd != 0) && (+this.total_tipos_pagos_restantes_usd < +this.monto) )
      {
        this.alertaService.alertFail('Monto invalido (USD)',false,2000);
        this.monto = 0;
        return;
      }
    
      if(((+this.total_tipos_pagos_usd + +this.monto) - +this.total_venta_dolares) >= 0.9)
      {
        this.alertaService.alertFail('El monto total es mayor que el total de la venta (USD)',false,2000);
        this.monto = 0;
        return;
      }
  }

  // ============== control caso pago Bs =======================
  if((this.IdTipoPagoSelect == 15) || (this.IdTipoPagoSelect == 16) || (this.IdTipoPagoSelect == 17))
  {
    if(((+this.total_venta_bs) - (+this.monto)) < 0)
    {
      this.alertaService.alertFail('El monto es mayor que el total de la venta (Bs.)',false,2000);
      this.monto = 0;
      return;
    }

    if((+this.total_tipos_pagos_restantes_bs != 0) && (+this.total_tipos_pagos_restantes_bs < +this.monto) )
    {
      this.alertaService.alertFail('Monto invalido (Bs.)',false,2000);
      this.monto = 0;
      return;
    }

    if(((+this.total_tipos_pagos_bs + +this.monto) - +this.total_venta_bs) >= 0.9 )
    {
      this.alertaService.alertFail('El monto total es mayor que el total de la venta (Bs.)',false,2000);
      this.monto = 0;
      return;
    }
    
  }
 // ============== control caso pago USD/BS - General =======================
//  if( (+this.total_tipos_pagos_bs != 0) && (+this.total_tipos_pagos_usd != 0) && (+this.total_tipos_pagos_bs >= +this.total_tipos_pagos_restantes_bs) && (+this.total_tipos_pagos_usd >= +this.total_tipos_pagos_restantes_usd) )
//   {
//     this.alertaService.alertFail('Monto invalido',false,2000);
//     this.monto = 0;
//     return;
//   }

  // =====================================
  if((this.IdTipoPagoSelect == 13) && ((+this.monto) > this.total_venta_dolares))
  {
    this.alertaService.alertFail('El monto total es menor que el total de la venta',false,2000);
    this.monto = 0;
    return;
  }


  if((this.IdTipoPagoSelect == 13) && (this.lineas_tipos_pago.length <= 0))
  {
    this.alertaService.alertFail('Debe ingresar un tipo de pago antes de aplicar un descuento',false,2000);
    this.monto = 0;
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
      // let monto_usd = this.monto;
      let monto_bs = +this.monto * +this.tasa_dia;  // BS

      exists_ltp.SubTotal = +exists_ltp.SubTotal + +this.monto; // USD

      this.total_tipos_pagos_usd = +this.total_tipos_pagos_usd + +this.monto; // subtotal
      this.total_tipos_pagos_bs = +this.total_tipos_pagos_bs + +monto_bs; // subtotal

      // usd
      // this.total_venta_dolares = this.total_venta_dolares - monto_usd;
      this.total_tipos_pagos_restantes_usd = +this.total_venta_dolares - +this.total_tipos_pagos_usd;
      
      // bs
      // this.total_venta_bs = this.total_venta_bs - monto_bs;
      this.total_tipos_pagos_restantes_bs = +this.total_venta_bs - +this.total_tipos_pagos_bs;

    }

    // ============== control caso pago Bs. =======================
    if((this.IdTipoPagoSelect == 15) || (this.IdTipoPagoSelect == 16) || (this.IdTipoPagoSelect == 17))
    {
      let monto_usd = (+this.monto / +this.tasa_dia);
      let monto_bs = +this.monto;

      exists_ltp.SubTotal = +exists_ltp.SubTotal + +monto_bs; // bs

      this.total_tipos_pagos_bs = +this.total_tipos_pagos_bs + +monto_bs; // subtotal
      this.total_tipos_pagos_usd = +this.total_tipos_pagos_usd + +monto_usd; // subtotal

      // bs
      // this.total_venta_bs = this.total_venta_bs - monto_bs;
      this.total_tipos_pagos_restantes_bs = +this.total_tipos_pagos_restantes_bs - +monto_bs;
      // usd
      // this.total_venta_dolares = this.total_venta_dolares - monto_usd;
      this.total_tipos_pagos_restantes_usd = +this.total_venta_dolares - +this.total_tipos_pagos_usd;
      
    }    

    // return;
  }else{  // No existe el tipo de pago  

    this.lineas_tipos_pago.push(
    {
      IdItem: this.IdItemTipoPago,
      IdTipoPago: this.IdTipoPagoSelect,
      TipoPago: obj.tipo_pago,
      SubTotal: this.monto
    });

    
    switch (obj.id_tipo_pago) {
      // ========== 15 - Pago movil Bs ===============
      case 15:
        
        let valor_usd_movil = (+this.monto / +this.tasa_dia);

        this.total_tipos_pagos_usd = +(this.total_tipos_pagos_usd + valor_usd_movil).toFixed(1);
        this.total_tipos_pagos_bs = +this.total_tipos_pagos_bs + +this.monto; 
        
        this.total_tipos_pagos_restantes_usd = +this.total_venta_dolares - +this.total_tipos_pagos_usd;
        this.total_tipos_pagos_restantes_bs = +this.total_venta_bs - +this.total_tipos_pagos_bs;

        break;
      // ========== 16 - tarjeta debito bs ===============
      case 16:

        let valor_usd_debito = (+this.monto / +this.tasa_dia);

        this.total_tipos_pagos_usd = +(this.total_tipos_pagos_usd + +valor_usd_debito).toFixed(1);
        this.total_tipos_pagos_bs = +this.total_tipos_pagos_bs + +this.monto; 
        
        this.total_tipos_pagos_restantes_usd = +this.total_venta_dolares - +this.total_tipos_pagos_usd;
        this.total_tipos_pagos_restantes_bs = +this.total_venta_bs - +this.total_tipos_pagos_bs;

        break;
      // ========== 17 - tarjeta cred bs ===============
      case 17:
        let valor_usd_cred = (+this.monto / +this.tasa_dia);

        this.total_tipos_pagos_usd = +(this.total_tipos_pagos_usd + +valor_usd_cred).toFixed(1);
        this.total_tipos_pagos_bs = +this.total_tipos_pagos_bs + +this.monto; 
        
        this.total_tipos_pagos_restantes_usd = +this.total_venta_dolares - +this.total_tipos_pagos_usd;
        this.total_tipos_pagos_restantes_bs = +this.total_venta_bs - +this.total_tipos_pagos_bs;

        break;
      // ========== 18 - Dolares efectivo USD ===============
      case 18:      

        let valor_bs = (+this.monto * +this.tasa_dia);

        this.total_tipos_pagos_usd = this.total_tipos_pagos_usd + +this.monto;  
        this.total_tipos_pagos_bs = +(this.total_tipos_pagos_bs + +valor_bs).toFixed(1);

        this.total_tipos_pagos_restantes_usd = +this.total_venta_dolares - +this.total_tipos_pagos_usd;
        this.total_tipos_pagos_restantes_bs = +this.total_venta_bs - +this.total_tipos_pagos_bs;

        break;
      // ========== 19 - zelle USD ===============
      case 19:
        let valor_bs_zelle = (+this.monto * +this.tasa_dia);

        this.total_tipos_pagos_usd = +this.total_tipos_pagos_usd + +this.monto;
        this.total_tipos_pagos_bs = +this.total_tipos_pagos_bs + +valor_bs_zelle; 

        this.total_tipos_pagos_restantes_usd = this.total_venta_dolares - +this.total_tipos_pagos_usd;
        this.total_tipos_pagos_restantes_bs = +this.total_venta_bs - +this.total_tipos_pagos_bs;

      break;
      // ========== default ===============
      default:
          this.total_tipos_pagos_usd = +this.total_tipos_pagos_usd + +this.monto;
          break;
    }

    this.IdItemTipoPago += 1;
  }


  // control por si los valores son debajo de cero
  if((this.total_tipos_pagos_usd < 0) || (+this.total_tipos_pagos_usd < 0) || (this.total_tipos_pagos_usd == null) || (this.total_tipos_pagos_usd == undefined))
    {
      this.total_tipos_pagos_usd = 0;
    }

    // control por si los valores son debajo de cero
    if((this.total_tipos_pagos_bs < 0) || (+this.total_tipos_pagos_bs < 0) || (this.total_tipos_pagos_bs == null) || (this.total_tipos_pagos_bs == undefined))
    {
      this.total_tipos_pagos_bs = 0;
    }

    // control por si los valores son debajo de cero
    if((this.total_tipos_pagos_restantes_bs < 0) || (+this.total_tipos_pagos_restantes_bs < 0) || (this.total_tipos_pagos_restantes_bs == null) || (this.total_tipos_pagos_restantes_bs == undefined))
    {
      this.total_tipos_pagos_restantes_bs = 0;
    }

    // control por si los valores son debajo de cero
    if((this.total_tipos_pagos_restantes_usd < 0) || (+this.total_tipos_pagos_restantes_usd < 0) || (this.total_tipos_pagos_restantes_usd == null) || (this.total_tipos_pagos_restantes_usd == undefined))
    {
      this.total_tipos_pagos_restantes_usd = 0;
    }

}else{
  this.alertaService.alertFail('No puede agregar dos tipos de pago con tarjeta',false,3000);
}


this.monto = '0';

}
// ==============================
  // 
  // ================================
  refrescar_monto_tp() {
    this.monto = 0;
  }
// ==============================
  // Para empleados
  // ================================
  selectEventEmpleado(item: any) {
    this.IdEmpleado = item.id_persona;
    // this.agregarLineaVenta(item);
    // do something with selected item
  }

  onChangeSearchEmpleado(val: any) {

    if(val == '' || val == null)
    {
      return;
    }

    this.empleadoBuscado = val;
    this.cargarEmpleados();
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  // ==============================
  // Para cliente
  // ================================
  selectEventCliente(item: any) {
    this.IdCliente = item.id_persona;
    // this.agregarLineaVenta(item);
    // do something with selected item
  }

  onChangeSearchCliente(val: any) {

    if(val == '' || val == null)
    {
      return;
    }

    this.clienteBuscado = val;

    this.cargarClientes();
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any){
    // do something when input is focused
  }

  // ==============================
  // Para productos
  // ================================
  selectEventProducto(item: any) {
    
    this.precio_producto_pendiente = item.precio_venta;
    
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
  // Para servicios
  // ================================
  selectEventServicio(item: any) {
    this.precio_servicio_pendiente = item.precio;
    this.itemPendienteServicio = item;
  }
  //
  onChangeSearchServicio(val: any) {
    if(val == '' || val == null)
    {
      return;
    }
    this.servicioBuscado = val;
    this.cargarServicios();
  }
  
  onFocusedServicio(e: any){
  }


  // ==============================
  // 
  // ================================
  continuarVenta()
  {

    if(this.total_venta_dolares <= 0)
    {
      this.alertaService.alertFail('El total de la venta debe ser mayor que cero',false,2000);
      return;
    }

    if((Number(this.IdCliente) <= 0) || (this.IdCliente == undefined))
    {
      this.alertaService.alertFail('Debe seleccionar un cliente',false,2000);
      return;
    }

    this.total_venta_inicial_usd = this.total_venta_dolares;
    this.total_venta_inicial_bs = this.total_venta_bs;

    this.activarModal = true;

    this.cargarTiposPago();
  }

  // ==============================
  // 
  // ================================
  limpiar_formulario(){

    //
    this.cantidadLineaVentaProducto = 1;
    this.cantidadLineaVentaServicio = 1;
    
    this.precio_producto_pendiente = 0;
    this.precio_servicio_pendiente = 0;

    //
    this.lineas_venta = [];

    //
    this.total_venta_bs = 0;
    this.total_tipos_pagos_usd = 0;

    //
    this.total_venta_bs = 0;
    this.total_venta_dolares = 0;

    //
    this.lineas_tipos_pago = [];

    //
    this.total_tipos_pagos_bs = 0;
    this.total_tipos_pagos_usd = 0;

    //
    this.total_tipos_pagos_restantes_bs = 0;
    this.total_tipos_pagos_restantes_usd = 0;
    this.descripcion_venta = '';

    this.clearPanelinputVendedor();
    this.clearPanelinputProducto();
    this.clearPanelinputServicio();
    this.clearPanelinputCliente();

  }

  clearPanelinputVendedor(): void {
    this.inputVendedor.clear();
    this.inputVendedor.close();
  }
  clearPanelinputProducto(): void {
    this.inputProducto.clear();
    this.inputProducto.close();
  }

  clearPanelinputServicio(): void {
    this.inputServicio.clear();
    this.inputServicio.close();
  }

  clearPanelinputCliente(): void {
    this.inputCliente.clear();
    this.inputCliente.close();
  }

  // ==============================
  // 
  // ================================
  eliminarItemVenta(pIdProductoServicio: any){

    this.lineas_venta.forEach( (item, index) => {
      if(item.IdProductoServicio == pIdProductoServicio) 
      {
        this.total_venta_dolares -= item.precio_venta * item.cantidad;

        if(this.total_venta_dolares <= 0)
        {
          this.total_venta_dolares = 0;
        }

        // control por si los valores son debajo de cero
        if((this.total_tipos_pagos_usd < 0) || (this.total_tipos_pagos_usd == null) || (this.total_tipos_pagos_usd == undefined))
        {
          this.total_tipos_pagos_usd = 0;
        }
  
        // control por si los valores son debajo de cero
        if((this.total_tipos_pagos_restantes_bs < 0) || (this.total_tipos_pagos_restantes_bs == null) || (this.total_tipos_pagos_restantes_bs == undefined))
        {
          this.total_tipos_pagos_restantes_bs = 0;
        }

          this.lineas_venta.splice(index,1);
        }
        
    });

  }

  // ==============================
  // 
  // ================================
  eliminarItemTipoPago(linea_tp: any){

    // chequeo si tiene un solo elemento 
    // si es asi todo vuelve a como estaba al principio
    // se hace para evitar problemas con decimales
    if (this.lineas_tipos_pago.length === 1) {
      this.lineas_tipos_pago.splice(0,1);

      this.total_venta_dolares = this.total_venta_inicial_usd;
      this.total_venta_bs = this.total_venta_inicial_bs;

      this.total_tipos_pagos_restantes_bs = 0;
      this.total_tipos_pagos_restantes_usd = 0;

      this.total_tipos_pagos_usd = 0;
      this.total_tipos_pagos_bs = 0;

      return;
    }

    // caso varios tipos de pago
    this.lineas_tipos_pago.forEach( (item, index) => {
      if((item.IdItem === linea_tp.IdItem)) 
      {
        this.lineas_tipos_pago.splice(index,1);

        // ============== control caso IdTipoPago USD =======================
        if((linea_tp.IdTipoPago == 18) || (linea_tp.IdTipoPago == 19))
        {
          this.total_tipos_pagos_usd -= +item.SubTotal;

          // this.total_venta_dolares = this.total_venta_inicial_usd;
          
          this.total_tipos_pagos_restantes_usd = +this.total_venta_dolares - +this.total_tipos_pagos_usd;

          //
          this.total_tipos_pagos_bs -= (+item.SubTotal * +this.tasa_dia);

          // this.total_venta_bs = this.total_venta_inicial_usd;
          
          this.total_tipos_pagos_restantes_bs = this.total_venta_bs - +this.total_tipos_pagos_bs;

        }

        // ============== control caso IdTipoPago Bs =======================
        if((linea_tp.IdTipoPago == 15) || (linea_tp.IdTipoPago == 16) || (this.IdTipoPagoSelect == 17))
        {
          this.total_tipos_pagos_bs -= +item.SubTotal;

          // this.total_venta_bs = this.total_venta_inicial_bs;
          
          this.total_tipos_pagos_restantes_bs = +this.total_venta_bs - +this.total_tipos_pagos_bs;

          //
          this.total_tipos_pagos_usd -= (+item.SubTotal / this.tasa_dia);

          // this.total_venta_bs = this.total_venta_inicial_usd;
          
          this.total_tipos_pagos_restantes_usd = this.total_venta_dolares - +this.total_tipos_pagos_usd;

        }

        if((this.total_venta_dolares <= 0) || (+this.total_venta_dolares <= 0))
        {
          this.total_venta_dolares = 0;
        }

        if( (this.total_venta_bs <= 0) || (+this.total_venta_bs <= 0))
        {
          this.total_venta_bs = 0;
        }

        if( (this.total_tipos_pagos_usd <= 0) || (+this.total_tipos_pagos_usd <= 0))
        {
          this.total_tipos_pagos_usd = 0;
        }

        if( (this.total_tipos_pagos_bs <= 0) || (+this.total_tipos_pagos_bs <= 0))
        {
          this.total_tipos_pagos_bs = 0;
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
      const resultado_porcentaje = (this.total_venta_dolares) * (porcentaje / 100);
      this.monto = resultado_porcentaje;
    }

    if(this.IdTipoPagoSelect == 14)
    {
      const porcentaje = 30;      
      const resultado_porcentaje = (this.total_venta_dolares) * (porcentaje / 100);
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

  // Verificar si la tecla presionada es un número o un punto
  if (!/^[\d.]$/.test(event.key)) {
    this.alertaService.alertFail('Solo permitir números (0-9) y puntos (.)', false, 2000);
    event.preventDefault();  // Bloquear cualquier carácter que no sea numérico o un punto
  }
}

// ==================================================
//        Crear cliente
// ==================================================

altaCliente() {

  // if ( this.apellidos_nuevo_cliente ) {
  //   this.alertaService.alertFailWithText('Ocurrio un error','Formulario invalido, chequee que los campos sean correctos',4000);
  //   return;
  // }


  const cliente = new Array(
    this.apellidos_nuevo_cliente,
    this.nombres_nuevo_cliente,
    this.dni_nuevo_cliente,
    this.telefono_nuevo_cliente,
    this.email_nuevo_cliente,
    this.direccion_nuevo_cliente,
    this.fecha_nac_nuevo_cliente,
    this.observaciones_nuevo_cliente,
  );

  this.clientesService.altaCliente( cliente )
            .subscribe( (resp: any) => {
              
              if ( resp[0][0].mensaje == 'Ok') {

                this.alertaService.alertSuccess('Mensaje','Cliente cargado con exito',2000);

                let el: HTMLElement = this.botonCerrarModalNuevoCliente.nativeElement;
                el.click();

                this.apellidos_nuevo_cliente = '';
                this.nombres_nuevo_cliente  = '';
                this.dni_nuevo_cliente  = '';
                this.telefono_nuevo_cliente  = '';
                this.email_nuevo_cliente  = '';
                this.direccion_nuevo_cliente  = '';
                this.fecha_nac_nuevo_cliente  = null;
                this.observaciones_nuevo_cliente  = '';
                
              } else {
                this.alertaService.alertFailWithText('Ocurrio un error','Contactese con el administrador',4000);
              }
              return;
            });


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

// ==================================================
// Carga
// ==================================================

buscarServicio() {

  this.alertaService.cargando = true;
  var servicioBuscadoModal: any = '-';

  const inputElement: HTMLInputElement = document.getElementById('inputServicioBuscadoModal') as HTMLInputElement;

  if(inputElement == null || inputElement == undefined)
  {
    servicioBuscadoModal = '-';
  }else{
    servicioBuscadoModal = inputElement.value || '-';
  }


    this.serviciosService.listarServiciosPaginado( 0, servicioBuscadoModal  )
               .subscribe( {
                next: (resp: any) => { 

                  if(resp[0].length <= 0)
                  { 
                    this.servicios_modal = [];
                    this.totalServicios = 0;
                    this.alertaService.cargando = false;
                    
                    return;
                  }
  
                  if ( resp[2][0].mensaje == 'Ok') {
                    
                    // this.totalServicios = resp[1][0].cantServiciosBuscados;
                    this.servicios_modal = resp[0];
                    this.alertaService.cargando = false;

                  } else {
                    this.alertaService.alertFail('Ocurrio un error',false,2000);
                    this.alertaService.cargando = false;

                  }
                  this.alertaService.cargando = false;

                  return;
                 },
                error: () => { 
                  this.alertaService.alertFail('Ocurrio un error',false,2000);
                  this.alertaService.cargando = false;
                }
              });

  }

// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde' a cero
  this.inputServicioBuscadoModal.nativeElement.value = '';
  
  // this.desde = 0;
  this.buscarServicio();

}

// ==================================================
seleccionar_servicio_modal(p_id_servicio_modal: any) {
  
  
  this.inputServicioBuscadoModal.nativeElement.value = '';
  
  // this.desde = 0;
  this.buscarServicio();

}

formatNumber(value: any): string {

  return this.utilService.formatNumber(value);

}

}

