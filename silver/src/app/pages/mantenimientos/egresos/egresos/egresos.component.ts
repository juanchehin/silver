import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { EgresosService } from 'src/app/services/egresos.service';

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styles: []
})
export class EgresosComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;
  egresos!: any;
  totalEgresos = 0;
  id_servicio_seleccionado: any;

  @ViewChild('inputEgresoBuscado') inputEgresoBuscado!: ElementRef;
  @ViewChild('divCerrarModalBajaEgreso') divCerrarModalBajaEgreso!: ElementRef;


  constructor(
    public egresosService: EgresosService,
    public alertaService: AlertService
  ) {
   }

  ngOnInit() {
    this.listar_egresos();
  }

// ==================================================
// Carga
// ==================================================

listar_egresos() {

  this.alertaService.cargando = true;
  
    this.egresosService.listar_egresos( this.desde  )
               .subscribe( {
                next: (resp: any) => { 

                  if(resp[0].length <= 0)
                  { 
                    this.egresos = [];
                    this.totalEgresos = 0;
                    this.alertaService.cargando = false;
                    
                    return;
                  }
  
                  if ( resp[2][0].mensaje == 'Ok') {
                    
                    this.totalEgresos = resp[1][0].cantidad_transacciones_egreso;
                    this.egresos = resp[0];
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
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalEgresos ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.listar_egresos();

}


// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {

  this.desde = 0;
  this.listar_egresos();

}

}
