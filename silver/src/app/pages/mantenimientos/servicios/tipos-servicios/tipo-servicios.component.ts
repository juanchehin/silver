import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ServiciosService } from 'src/app/services/servicios.service';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-servicios',
  templateUrl: './tipo-servicios.component.html',
  styles: []
})
export class TiposServiciosComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  total_tipos_servicios = 0;
  tipos_servicios!: any;
  id_servicio_seleccionado: any;
  descripcion_nuevo_tipo_servicio = '';
  nuevo_tipo_servicio = '';

  @ViewChild('inputTipoServicioBuscado') inputTipoServicioBuscado!: ElementRef;
  @ViewChild('divCerrarModalBajaServicio') divCerrarModalBajaServicio!: ElementRef;
  @ViewChild('botonCerrarModalAltaTipoServicio') botonCerrarModalAltaTipoServicio!: ElementRef;


  constructor(
    public serviciosService: ServiciosService,
    public alertaService: AlertService
  ) {
   }

  ngOnInit() {
    this.buscarTipoServicio();
  }

// ==================================================
// Carga
// ==================================================

buscarTipoServicio() {

  this.alertaService.cargando = true;
  
    const inputElement: HTMLInputElement = document.getElementById('buscarTipoServicio') as HTMLInputElement;
    const tipos_servicioBuscado: any = inputElement.value || '-';

    this.serviciosService.listarTiposServiciosPaginado( this.desde , tipos_servicioBuscado  )
               .subscribe( {
                next: (resp: any) => { 

                  if(resp[0].length <= 0)
                  { 
                    this.tipos_servicios = [];
                    this.total_tipos_servicios = 0;
                    this.alertaService.cargando = false;
                    
                    return;
                  }
  
                  if ( resp[2][0].mensaje == 'Ok') {
                    
                    this.total_tipos_servicios = resp[1][0].cant_tipos_servicios_buscado;
                    this.tipos_servicios = resp[0];
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
//        Crear alta_tipo_servicio
// ==================================================

alta_tipo_servicio() {

  const nuevo_tipo_servicio = new Array(
    this.nuevo_tipo_servicio,
    this.descripcion_nuevo_tipo_servicio
  );

  this.serviciosService.alta_tipo_servicio( nuevo_tipo_servicio )
            .subscribe( (resp: any) => {
              
              if ( resp.mensaje == 'Ok') {

                this.alertaService.alertSuccess('Mensaje','Cargado con exito',2000);

                let el: HTMLElement = this.botonCerrarModalAltaTipoServicio.nativeElement;
                el.click();

                this.nuevo_tipo_servicio = '';
                this.descripcion_nuevo_tipo_servicio  = '';

                this.buscarTipoServicio();
                
              } else {
                this.alertaService.alertFailWithText('Ocurrio un error','Contactese con el administrador',4000);
              }
              return;
            });


}

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.total_tipos_servicios ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.buscarTipoServicio();

}


// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde' a cero
  this.inputTipoServicioBuscado.nativeElement.value = '';
  
  this.desde = 0;
  this.buscarTipoServicio();

}


// ==================================================
// 
// ==================================================

baja_tipo_servicio() {

  this.serviciosService.baja_tipo_servicio( this.id_servicio_seleccionado )
  .subscribe({
    next: (resp: any) => {

      if((resp[0][0].Mensaje == 'Ok')) {

        this.alertaService.alertSuccess('Eliminacion','Tipo Servicio dada de baja',3000);
        
        let el: HTMLElement = this.divCerrarModalBajaServicio.nativeElement;
        el.click();

        this.refrescar();
        
      } else {
        
        this.alertaService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',1200);
        
      }
     },
    error: (resp: any) => {  

      this.alertaService.alertFail(resp[0][0].mensaje,false,1200);
    
    }
  });

}

// ==================================================
// 
// ==================================================

modal_baja_servicio(id_servicio: string) {

  this.id_servicio_seleccionado = id_servicio;

}


}
