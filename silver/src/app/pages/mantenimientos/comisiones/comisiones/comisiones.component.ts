import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ComisionesService } from 'src/app/services/comisiones.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-comisiones',
  templateUrl: './comisiones.component.html',
  styles: []
})
export class ComisionesComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  monto_egreso = 0;
  comisiones!: any;
  totalComisiones = 0;
  descripcion_egreso : any;
  id_servicio_seleccionado: any;
  especialistas: any;
  IdEspecialistaSelect: any;

  //
  fecha_inicio: any;
  fecha_fin: any;


  constructor(
    public comisionesService: ComisionesService,
    public alertaService: AlertService,
    private utilService: UtilService
  ) {
   }

  ngOnInit() {
    this.listar_comisiones();
  }

// ==================================================
// Carga
// ==================================================

listar_comisiones() {


  const pfechaInicio  = this.utilService.formatDate(this.fecha_inicio);
  const pfechaFin = this.utilService.formatDate(this.fecha_fin);

  this.alertaService.cargando = true;
  
    this.comisionesService.listar_comisiones( this.desde , pfechaInicio , pfechaFin )
               .subscribe( {
                next: (resp: any) => { 

                  if(resp[0].length <= 0)
                  { 
                    this.comisiones = [];
                    this.totalComisiones = 0;
                    this.alertaService.cargando = false;
                    
                    return;
                  }
  
                  if ( resp[2][0].mensaje == 'Ok') {
                    
                    this.totalComisiones = resp[1][0].cantidad_transacciones_egreso;
                    this.comisiones = resp[0];
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

  if ( desde >= this.totalComisiones ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.listar_comisiones();

}


// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {

  this.desde = 0;
  this.listar_comisiones();

}

  // ============================================================
  // Se dispara al seleccionar (clic) un tipo de pago
  // ==============================================================
  onChangeEspecialista(val: any){
    this.IdEspecialistaSelect = val;

    if(this.IdEspecialistaSelect == 13)
    {
      // const porcentaje = 20;
      // const resultado_porcentaje = (this.totalVenta) * (porcentaje / 100);
      // this.monto = resultado_porcentaje;
    }

  }

// ==================================================
//        Crear egreso
// ==================================================

alta_egreso() {

  if(this.monto_egreso <= 0){
    this.alertaService.alertFailWithText('Atencion','Egreso invalido',4000);
    return;
  }

  const egreso = new Array(
    this.monto_egreso,
    this.descripcion_egreso
  );

  this.comisionesService.alta_egreso( egreso )
            .subscribe( (resp: any) => {
              
              if ( resp[0][0].mensaje == 'Ok') {

                this.alertaService.alertSuccess('Mensaje','Egreso cargado con exito',2000);
           
                this.monto_egreso = 0;
                this.descripcion_egreso  = '';

                this.refrescar();
                
              } else {
                this.alertaService.alertFailWithText('Ocurrio un error','Contactese con el administrador',4000);
              }
              return;
            });


}
}
