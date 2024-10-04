import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { SucursalesService } from 'src/app/services/sucursal.service';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {

  desde = 0;

  clientes!: any;
  sucursales: any;
  IdSucursal: any;

  totalClientes = 0;
  cargando = true;
  id_cliente_seleccionado: any;

  @ViewChild('inputClienteBuscado') inputClienteBuscado!: ElementRef;

  constructor(
    public clientesService: ClientesService,
    private alertService: AlertService,
    private sucursalesService: SucursalesService
  ) {
   }

  ngOnInit() {
    this.buscarClientes();
    this.cargarSucursales();

  }

// ==================================================
// Carga
// ==================================================

buscarClientes() {

  this.alertService.cargando = true;

    const inputElement: HTMLInputElement = document.getElementById('clienteBuscado') as HTMLInputElement;
    const clienteBuscado: any = inputElement.value || null;

    this.clientesService.buscarClientesPaginado( this.desde,clienteBuscado  )
               .subscribe( {
                next: (resp: any) => { 

                  if(resp[2] && resp[2][0].mensaje == 'Ok')
                  { 
                    this.totalClientes = resp[1][0].cantClientes;
    
                    this.clientes = resp[0];
                    this.alertService.cargando = false;

                    return;
                  } else {
                    this.alertService.alertFailWithText('Contactese con el administrador','Ocurrio un error',2000);
                    this.alertService.cargando = false;

                  }
                  return;
                 },
                error: () => { 
                  this.alertService.alertFailWithText('Contactese con el administrador','Ocurrio un error',2000);
                  this.alertService.cargando = false;

                }
              });

  }


// ==================================================
// 
// ==================================================

baja_cliente() {

  this.clientesService.bajaCliente( this.id_cliente_seleccionado )
  .subscribe({
    next: (resp: any) => {

      if((resp[0].Mensaje == 'Ok')) {

        this.alertService.alertSuccess('Eliminacion','Cliente dada de baja',3000);
        
        // let el: HTMLElement = this.divCerrarModalBajaTransaccion.nativeElement;
        // el.click();

        this.refrescar();
        
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
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  this.desde += valor;

    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalClientes ) {
      this.desde -= valor; 
    }
    
    this.buscarClientes();

}


// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde' a cero
  this.inputClienteBuscado.nativeElement.value = '';
  
  this.desde = 0;
  this.buscarClientes();

}

// ==================================================
// 
// ==================================================

modal_baja_cliente(id_cliente: string) {

  this.id_cliente_seleccionado = id_cliente;

}

// ==================================================
// Carga
// ==================================================

cargarSucursales() {


  this.sucursalesService.listarTodasSucursales(   )
             .subscribe( (resp: any) => {

              this.sucursales  = resp[0];

            });

}

}
