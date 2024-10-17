import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CalendarioService } from 'src/app/services/calendario.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styles: []
})
export class CitasComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;
  calendario!: any;
  totalCalendario = 0;
  id_producto_seleccionado: any;
  fecha_cita: any;

  horarios = [
    { label: '08:00 AM' , hora: '08:00:00' },
    { label: '09:00 AM' , hora: '09:00:00' },
    { label: '10:00 AM' , hora: '10:00:00' },
    { label: '11:00 AM' , hora: '11:00:00' },
    { label: '12:00 AM' , hora: '12:00:00' },
    { label: '01:00 PM' , hora: '13:00:00' },
    { label: '02:00 PM' , hora: '14:00:00' },
    { label: '03:00 PM' , hora: '15:00:00' },
    { label: '04:00 PM' , hora: '16:00:00' },
    { label: '05:00 PM' , hora: '17:00:00' },
    { label: '06:00 PM' , hora: '18:00:00' },
    { label: '07:00 PM' , hora: '19:00:00' }
  ];


  constructor(
    public calendarioService: CalendarioService,
    public alertaService: AlertService,
    private route: ActivatedRoute
  ) {
   }

  ngOnInit() {
    this.fecha_cita = this.route.snapshot.paramMap.get('fecha_cita');
    this.listar_citas();
  }

// ==================================================
// Carga
// ==================================================

listar_citas() {

  this.alertaService.cargando = true;

    this.calendarioService.listar_citas_fecha( this.fecha_cita )
               .subscribe( {
                next: (resp: any) => { 
                console.log("🚀 ~ CitasComponent ~ listar_citas ~ resp:", resp)

                  if(resp[0].length <= 0)
                  { 
                    this.calendario = [];
                    this.totalCalendario = 0;
                    this.alertaService.cargando = false;

                    return;
                  }
  
                  if ( resp[1][0].mensaje == 'Ok') {
                    
                    this.totalCalendario = resp[1][0].cantCalendarioBuscados;
                    this.calendario = resp[0];
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

  if ( desde >= this.totalCalendario ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.listar_citas();

}


// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  
  this.desde = 0;
  this.listar_citas();

}


}
