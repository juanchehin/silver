import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ComisionesService } from 'src/app/services/comisiones.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
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
  // id_servicio_seleccionado: any;
  especialistas: any;
  IdEspecialistaSelect: any = 0;
  cantidad_transacciones = 0;
  monto_total = 0;
  monto_total_comision_especialista = 0;

  //
  fecha_inicio = this.utilService.formatDateNow(new Date(Date.now()));
  fecha_fin = this.utilService.formatDateNow(new Date(Date.now()));


  constructor(
    public comisionesService: ComisionesService,
    public alertaService: AlertService,
    private utilService: UtilService,
    public empleadosService: EmpleadosService
  ) {
   }

  ngOnInit() {
    this.listar_comisiones();
  }

// ==================================================
// Carga
// ==================================================

listar_comisiones() {

  const pfechaInicio  = this.utilService.formatDate3(this.fecha_inicio);
  const pfechaFin = this.utilService.formatDate3(this.fecha_fin);

  this.alertaService.cargando = true;
  
    this.comisionesService.listar_comisiones( this.IdEspecialistaSelect, this.desde , pfechaInicio , pfechaFin )
               .subscribe( {
                next: (resp: any) => { 

                  if(resp.length <= 0)
                  { 
                    this.comisiones = [];
                    this.totalComisiones = 0;
                    this.alertaService.cargando = false;
                    
                    return;
                  }
  
                  if ( resp[3][0].mensaje == 'Ok') {

                    this.especialistas = resp[2];
                    
                    this.cantidad_transacciones = resp[1][0].cantidad_transacciones;
                    this.monto_total = resp[1][0].monto_total || 0;

                    this.comisiones = resp[0];
                    this.alertaService.cargando = false;

                    this.monto_total_comision_especialista = 0;

                    this.comisiones.forEach((transaccion: any) => {
                      const montoComision = parseFloat(transaccion.monto_comision.replace(",", "."));
                      this.monto_total_comision_especialista += montoComision;
                    });

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

}
