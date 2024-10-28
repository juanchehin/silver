import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styles: []
})
export class ProveedoresComponent implements OnInit {

  desde = 0;

  proveedores!: any;

  totalProveedores = 0;
  cargando = true;
  id_proveedor_seleccionado: any;

  @ViewChild('inputProveedorBuscado') inputProveedorBuscado!: ElementRef;
  @ViewChild('divCerrarModalBajaProveedor') divCerrarModalBajaProveedor!: ElementRef;

  constructor(
    public proveedoresService: ProveedoresService,
    private alertService: AlertService
    ) {
   }

  ngOnInit() {
    this.buscarProveedores();
  }

// ==================================================
// Carga
// ==================================================

buscarProveedores() {

  this.alertService.cargando = true;

    const inputElement: HTMLInputElement = document.getElementById('proveedorBuscado') as HTMLInputElement;
    const proveedorBuscado: any = inputElement.value || '-';

    this.proveedoresService.buscarProveedoresPaginado( this.desde,proveedorBuscado  )
               .subscribe( {
                next: (resp: any) => { 

                  if(resp[2][0].mensaje == 'Ok')
                  { 
                    this.totalProveedores = resp[1][0].total_proveedores;
    
                    this.proveedores = resp[0];
                    this.alertService.cargando = false;

                    return;
                  } else {
                    this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',2000);

                  }
                  this.alertService.cargando = false;

                  return;
                 },
                error: () => { 
                  this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',2000);
                  this.alertService.cargando = false;

                }
              });

  }

// ==================================================
// 
// ==================================================

baja_proveedor() {

  this.proveedoresService.bajaProveedor( this.id_proveedor_seleccionado )
  .subscribe({
    next: (resp: any) => {
      if((resp[0].Mensaje == 'Ok')) {

        this.alertService.alertSuccess('Eliminacion','Proveedor dado de baja',3000);
        
        let el: HTMLElement = this.divCerrarModalBajaProveedor.nativeElement;
        el.click();

        this.refrescar();
        
      } else {
        
        this.alertService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',1200);
        
      }
     },
    error: (resp: any) => {

      this.alertService.alertFailWithText('Ocurrio un error al procesar el pedido','Error',1200);
    
    }
  });

}
// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalProveedores ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.buscarProveedores();

}

// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde' a cero
  this.inputProveedorBuscado.nativeElement.value = '';
  
  this.desde = 0;
  this.buscarProveedores();

}

// ==================================================
// 
// ==================================================

modal_baja_proveedor(id_proveedor: string) {

  this.id_proveedor_seleccionado = id_proveedor;

}

}
