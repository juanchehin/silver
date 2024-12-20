import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VentasService } from 'src/app/services/ventas.service';
import { UtilService } from 'src/app/services/util.service';
import { AlertService } from 'src/app/services/alert.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { Router } from '@angular/router';
import { TicketVentaComponent } from "../ticket-venta/ticket-venta.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: [],
  imports: [TicketVentaComponent,FormsModule,CommonModule ]
})
export class DashboardComponent implements OnInit {

  nombreEmpresa: any;
  desde = 0;
  transacciones: any;
  id_transaccion_seleccionado: any;
  cantidad_transacciones = 0;

  fechaInicio = this.utilService.formatDateNow(new Date(Date.now()));
  fechaFin = this.utilService.formatDateNow(new Date(Date.now()));

  ventas_total = 0;
  efectivo = 0;
  credito = 0;
  debito = 0;
  transferencia = 0;
  egresos = 0;
  cta_cte = 0;
  voucher = 0;
  tarjeta_debito = 0;
  monto_egreso = 0;
  turno_seleccionado = 'todos';

  pago_movil = 0;
  zelle = 0;
  taj_deb_bs = 0;
  taj_cred_bs = 0;
  dolar_efectivo = 0;
  venta_total_bs = 0;
  ventas_total_usd = 0;
  // p_suma_pago_movil,p_suma_zelle,p_suma_taj_deb_bs,p_suma_taj_cred_bs,p_suma_dolar_efectivo

  //
  tiposPago: any;
  items_pago: any;
  IdTipoPagoSelect: any;
  tipo_egreso: any;
  array_egreso: any = [];
  IdEmpleado = 0;
  id_usuario_actual: any;
  empleados: any;
  IdTipoPago: any;
  descripcion: any;
  total_ventas = 0;
  estado_caja = 'C';
  nro_identidad_cliente: any = '-';
  
  // detalles transaccion
  detalle_id_transaccion: any;
  detalle_cliente: any;
  detalle_empleado: any;
  detalle_monto_total: any;
  detalle_lineas_venta: any;
  detalle_fecha: any;
  detalle_tipo_pago: any;

  @ViewChild('divCerrarModalBajaTransaccion') divCerrarModalBajaTransaccion!: ElementRef<HTMLElement>;
  @ViewChild('cerrarModalNuevaTransaccionMenu') divCerrarModalNuevoTransaccionMenu!: ElementRef<HTMLElement>;
  @ViewChild('cerrarModalEgreso') cerrarModalEgreso!: ElementRef<HTMLElement>;

  
  //
  mostrarTicket = false;

  items = [
    { description: 'Item 1', price: 1.1 },
    { description: 'Item 2', price: 2.2 },
    { description: 'Item 3', price: 3.3 },
  ];
  total = 16.5;
  cash = 20;
  change = 3.5;
  barcodeValue = '123456789';


  constructor(
    private ventasService: VentasService,
    private utilService: UtilService,
    private alertService: AlertService,
    private empleadosService: EmpleadosService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarDatosDashboard();
    this.cargarTiposPago();
    this.id_usuario_actual = localStorage.getItem('id');
  }

// ====================
// 
// =================
cargarDatosDashboard(){

  this.alertService.cargando = true;

  this.ventasService.listar_transacciones(this.desde,this.fechaInicio,this.fechaFin,this.turno_seleccionado  )
  
              .subscribe({
                next: (resp: any) => {
            
                  if((resp[5][0].mensaje == 'Ok')) {

                    this.cantidad_transacciones = resp[1][0].cantidad_transacciones;

                    this.transacciones = resp[0];

                    this.ventas_total_usd = resp[2][0].p_suma_ventas || 0;
                    this.efectivo = resp[2][0].p_suma_efectivo || 0;
                    this.credito = resp[2][0].p_suma_deposito || 0;
                    this.debito = resp[2][0].p_suma_retiro || 0;
                    this.transferencia = resp[2][0].p_suma_transferencia || 0;
                    this.egresos = resp[2][0].p_suma_gastos || 0;
                    this.voucher = resp[2][0].p_suma_voucher || 0;
                    this.estado_caja = resp[2][0].estado_caja || 'C';
                    this.tarjeta_debito = resp[2][0].p_suma_tarjeta_debito || 0;

                    this.pago_movil = resp[2][0].p_suma_pago_movil || 0;
                    this.zelle = resp[2][0].p_suma_zelle || 0;
                    this.taj_deb_bs = resp[2][0].p_suma_taj_deb_bs || 0;
                    this.taj_cred_bs = resp[2][0].p_suma_taj_cred_bs || 0;
                    this.dolar_efectivo = resp[2][0].p_suma_dolar_efectivo || 0;
                    this.venta_total_bs = resp[2][0].p_suma_venta_total_bs || 0;

                    this.empleados = resp[3];

                    this.total_ventas = resp[4][0].total_ventas;

                    this.alertService.cargando = false;
                    
                  } else {
                    
                    this.alertService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',1200);
                    this.alertService.cargando = false;                    
                  }
                 },
                error: (resp: any) => { 
            
                  this.alertService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',1200);
                  this.alertService.cargando = false;
                
                }
              });
              this.alertService.cargando = false;

}

// ==================================================
// 
// ==================================================

modal_baja_transaccion(id_transaccion: string) {

  this.id_transaccion_seleccionado = id_transaccion;

}

// ==================================================
// 
// ==================================================

baja_transaccion() {

      this.ventasService.baja_transaccion( this.id_transaccion_seleccionado )
      .subscribe({
        next: (resp: any) => {
  
          if((resp[0].Mensaje == 'Ok')) {

            // this.alertService.alertSuccess('Eliminacion','Transaccion dada de baja',3000);
            
            // let el: HTMLElement = this.divCerrarModalBajaTransaccion.nativeElement;
            // el.click();

            this.cargarDatosDashboard();
            
          } else {
            
            this.alertService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',1200);
            
          }
         },
        error: (resp: any) => {  

          this.alertService.alertFail(resp[0][0].mensaje,false,1200);
        
        }
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

            },
            error: (err: any) => {
              this.alertService.alertFail('Ocurrio un error al cargar los tipos de pago ' + err,false,400); }
          });

}

// 
onChangeTipoPago(val: any){
  this.IdTipoPagoSelect = val;
}

// 
onChangeEmpleado(val: any){
  this.IdEmpleado = val;
}

// 
onChangeTurno(val: any){
  this.turno_seleccionado = val;
  
}
// ==================================================
//        Crear 
// ==================================================

alta_egreso() {

  if(this.estado_caja != 'A')
  {
    this.alertService.alertFail('Mensaje','Debe abrir caja',2000);
    return;
  }

  if(this.monto_egreso <= 0)
  {
    this.alertService.alertFail('Mensaje','Monto invalido',2000);
    return;
  }

  if(this.IdTipoPagoSelect == undefined)
  {
    this.alertService.alertFail('Mensaje','Tipo pago invalido',2000);
    return;
  }
  
  if(this.tipo_egreso == undefined)
  {
    this.alertService.alertFail('Mensaje','Metodo pago invalido',2000);
    return;
  }

  if((this.IdEmpleado <= 0))
  {
    this.alertService.alertFail('Mensaje','Empleado invalido',2000);
    return;
  }

  this.alertService.cargando = true;
  
      this.array_egreso.push(        
        this.IdEmpleado,
        this.id_usuario_actual,
        this.monto_egreso,
        this.IdTipoPagoSelect,
        this.tipo_egreso,
        this.descripcion
      );

      this.ventasService.alta_egreso(  this.array_egreso )
      .subscribe({
        next: (resp: any) => {
          
          if ( resp.Mensaje == 'Ok') {
            this.alertService.alertSuccess('Mensaje','Egreso cargado',2000);

            this.monto_egreso = 0;
            this.IdTipoPagoSelect = 1;
            this.tipo_egreso = 'E';
            this.descripcion = '';

            let el: HTMLElement = this.cerrarModalEgreso.nativeElement;
            el.click();

            this.cargarDatosDashboard();
            // this.resetearVariables();
            this.alertService.cargando = false;
            
          } else {
            this.alertService.alertFail('Ocurrio un error',false,2000);
            this.alertService.cargando = false;

          }
          return;
         },
        error: () => { 
          this.alertService.alertFail('Ocurrio un error',false,2000);
          this.alertService.cargando = false;
        }
      });

      this.IdEmpleado = 0;
      this.monto_egreso = 0;
      this.IdTipoPagoSelect = 1;
      this.tipo_egreso = 'E';
      this.descripcion = '';

      this.array_egreso = [];


}

//
rutear_nueva_venta(){

  if(this.estado_caja != 'A')
  {
    this.alertService.alertFail('Mensaje','Debe abrir caja',2000);
    return;
  }

  this.router.navigate(['/dashboard/ventas/nueva']);

}

// ==================================================
//         
// ==================================================
ver_transaccion_imprimir_ticket(transaccion: any) {
  this.ventasService.dame_transaccion(transaccion.id_transaccion)
    .subscribe({
      next: (resp: any) => {
        if (resp[3][0].mensaje === 'Ok') {
          this.alertService.cargando = false;

          // Configurar los datos para el ticket
          this.detalle_id_transaccion = transaccion.id_transaccion;
          this.detalle_cliente = transaccion.Cliente;
          this.nro_identidad_cliente = transaccion.nro_identidad_cliente;
          this.detalle_empleado = transaccion.Empleado;
          this.detalle_fecha = transaccion.Fecha;
          this.detalle_lineas_venta = resp[0];
          this.detalle_monto_total = transaccion.Monto;
          this.detalle_tipo_pago = resp[1][0].tipo_pago;
          this.items_pago = resp[2];

          this.cdr.detectChanges(); // Asegurar que los cambios se reflejen

          // Obtener el contenido del ticket
          const printContent = document.getElementById('ticket-content')?.innerHTML;

          if (printContent) {
            // Crear una nueva ventana para imprimir
            const printWindow = window.open('', '_blank', 'width=800,height=600');
            if (printWindow) {
              printWindow.document.open();
              printWindow.document.write(`
                <html>
                  <head>
                    <title>Imprimir Ticket</title>
                    <style>
                      /* Estilos específicos para el ticket */
                      body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
                      .ticket-content { /* Agregar estilos aquí si es necesario */ }
                    </style>
                  </head>
                  <body onload="window.print(); window.close();">
                    ${printContent}
                  </body>
                </html>
              `);
              printWindow.document.close();
            }
          } else {
            this.alertService.alertFailWithText('Error', 'El contenido del ticket no está disponible', 1200);
          }
        } else {
          this.alertService.alertFailWithText('Error', 'Ocurrió un error al procesar el pedido', 1200);
          this.alertService.cargando = false;
        }
      },
      error: (resp: any) => {
        this.alertService.alertFailWithText('Ocurrió un error al procesar el pedido', 'Error', 1200);
        this.alertService.cargando = false;
      }
    });
}

  


// ====================
// 
// =================
ver_transaccion(transaccion: any){

  this.alertService.cargando = true;

  this.ventasService.dame_transaccion( transaccion.id_transaccion )
               .subscribe( {
                next: (resp: any) => {
                  
                  if((resp[3][0].mensaje == 'Ok')) {
            
                    this.detalle_id_transaccion = transaccion.id_transaccion;
                    this.detalle_cliente = transaccion.Cliente;
                    this.detalle_empleado = transaccion.Empleado;
                    this.detalle_fecha = transaccion.Fecha;
                    this.detalle_lineas_venta = resp[0];
                    this.detalle_monto_total = transaccion.Monto;
                    this.detalle_tipo_pago = resp[1][0].tipo_pago;  

                    this.items_pago = resp[2];
                    
                    this.alertService.cargando = false;
                    
                  } else {
                    
                    this.alertService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',1200);
                    this.alertService.cargando = false;
                    
                  }
                 },
                error: (resp: any) => {            
                  this.alertService.alertFailWithText('Ocurrio un error al procesar el pedido','Error',1200);
                  this.alertService.cargando = false;

                }
              });
  }

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.cantidad_transacciones ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarDatosDashboard();

}
}
