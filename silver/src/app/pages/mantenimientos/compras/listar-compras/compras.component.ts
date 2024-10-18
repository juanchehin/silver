import { Component, OnInit } from '@angular/core';
import { ComprasService } from 'src/app/services/compras.service';
import { AlertService } from 'src/app/services/alert.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styles: []
})
export class ComprasComponent implements OnInit {

  desde = 0;
  cargando = false;
  fechaInicio = this.utilService.formatDateNow(new Date(Date.now()));
  fechaFin = this.utilService.formatDateNow(new Date(Date.now()));
  controlFechas = false;
  totalCompras = 0;
  compras!: Array < any > ;

  constructor(
    public comprasService: ComprasService,
    private alertService: AlertService,
    private utilService: UtilService
  ) {
   }

  ngOnInit() {
    this.cargarCompras();
  }


// ==================================================
//        Carga 
// ==================================================

cargarCompras() {

  const pfechaInicio  = this.utilService.formatDate(this.fechaInicio);
  const pfechaFin = this.utilService.formatDate(this.fechaFin);

  this.comprasService.listarComprasFecha( this.desde , pfechaInicio , pfechaFin)
             .subscribe( {
              next: (resp: any) => { 
                
                this.totalCompras = resp[1][0].totalCompras;

                this.compras = resp[0];

                if (resp[1][0].cantCompras === undefined || resp[1][0].cantCompras === null) {
                  this.totalCompras = 0;
                }else {
                  this.alertService.alertFail('Ocurrio un error',false,2000);
                }
                return;
               },
              error: () => { 
                this.alertService.alertFail('Ocurrio un error',false,2000)
              }
            });

}
// ==================================================
// Detecta los cambios en el select de los planes y carga IdPlan en 'nuevoValor'
// ==================================================
cambiosfechaInicio(nuevafechaInicio: any) {

  if (nuevafechaInicio > this.fechaFin) {
    // this.fechaInicio = nuevafechaInicio;
    this.controlFechas = true;
  } else {
    this.controlFechas = false;
  }

}

// ==================================================
// Detecta los cambios en el select de los planes y carga IdPlan en 'nuevoValor'
// ==================================================
cambiosfechaFin(nuevafechaFin: any) {

  if (nuevafechaFin < this.fechaInicio) {
    // this.fechaInicio = nuevafechaFin;
    this.controlFechas = true;
  } else {
    this.controlFechas = false;
  }
  // this.fechaFin = nuevafechaFin;

}

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalCompras ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarCompras();

}

// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde' a cero

  if(this.fechaInicio > this.fechaFin)
  {
    this.alertService.alertFail('Error de fechas',false,2000)
    return;
  }
  this.desde = 0;
  this.cargarCompras();
}


}
