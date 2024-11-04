import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // para el arrastrar y soltar
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import { AlertService } from 'src/app/services/alert.service';
import { CalendarioService } from 'src/app/services/calendario.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';
import { UtilService } from 'src/app/services/util.service';
import esLocale from '@fullcalendar/core/locales/es'; // Importa la localización en español
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  
  descripcion_evento: any;
  fecha_evento: any;
  eventos: any = [];
  mes_seleccionado: any;
  ano_seleccionado: any;
  calendarOptions: CalendarOptions | undefined;
  id_evento_seleccionado: any;
  detalles_evento: any;
  cargando = true;
  calendario_fechas: any;

  fechaInicio = this.utilService.formatDateNow(new Date(Date.now()));
  fechaFin = this.utilService.formatDateNow(new Date(Date.now()));

  // Empleados
  empleados: any;
  keywordEmpleado = 'empleado';
  empleadoBuscado = '';
  IdEmpleado = 0;

  // Evento
  detalle_evento_id_evento: any;
  detalle_evento_apellidos: any;
  detalle_evento_nombres: any;
  detalle_evento_fecha_evento: any;
  detalle_evento_fecha_creacion_evento: any;
  detalle_evento_nro_identidad: any;
  detalle_evento_titulo: any;

  // 
  citas_pendientes = 0;
  citas_mes = 0;
  citas_hoy = 0;
  citas_agendadas: any;
  
  @ViewChild('modalCerrarNuevoEvento') modalCerrarNuevoEvento!: ElementRef;
  @ViewChild('modalCerrarBajaEvento') modalCerrarBajaEvento!: ElementRef;
  @ViewChild('modalCerrarDetallesEvento') modalCerrarDetallesEvento!: ElementRef;

  constructor(
    public alertService: AlertService,
    private calendarioService: CalendarioService,
    public empleadosService: EmpleadosService,
    public utilService: UtilService,
    private router: Router
    ) {
   }

  ngOnInit() {
    this.cargar_info_calendario();
    //
    console.log("calendarOptions")
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin,interactionPlugin, timeGridPlugin],
      eventClick: this.handleEventClick.bind(this),
      dateClick: (arg) => this.handleDateClick(arg),
      dayCellContent: (arg) => {
        return {
          html: `
            <div>${arg.date.getDate()}</div>
            <button class="btn-ver-mas">Ver agenda</button>
            `,
        };
      },
      locale: esLocale,
      events: [],
      datesSet: this.onDatesSet.bind(this)
    };
  }

  // =====================
  handleDateClick(arg: any) {

    this.fecha_evento = arg.dateStr;
    this.router.navigate(['/dashboard/calendario/citas', arg.dateStr]);

  }

  // =====================
  handleEventClick(clickInfo: any) {

    // this.id_evento_seleccionado = clickInfo.event.extendedProps.id_evento;
    
    // this.dame_detalle_evento();

    // const modal = document.getElementById('modal_detalles_evento');
    // if (modal) {
    //   const bootstrapModal = new (window as any).bootstrap.Modal(modal);
    //   bootstrapModal.show();
    // }
    
  }

  // =====================
  esperarYEjecutar(callback: () => void): void {
    setTimeout(() => {
      callback(); // Ejecutar la función de callback después de 2 segundos
    }, 2000); // 2000 milisegundos = 2 segundos
  }

  // =====================
  modal_baja_evento() {


    const modal = document.getElementById('modal_baja_evento');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal);
      bootstrapModal.show();
    }
    
  }

  // =====================
  cargar_eventos_calendario() {

      this.calendarioService.listar_eventos( this.mes_seleccionado, this.ano_seleccionado  )
      .subscribe( {
        next: (resp: any) => { 

          if ( resp[1][0].mensaje == 'Ok') {
            
            this.eventos = resp[0];
            this.calendarOptions!.events = this.eventos;

            this.alertService.cargando = false;

          } else {
            this.alertService.alertFail('Ocurrio un error',false,2000);
            this.alertService.cargando = false;

          }
          this.alertService.cargando = false;

          return;
          },
      error: () => { 
        this.alertService.alertFail('Ocurrio un error',false,2000);
        this.alertService.cargando = false;

      }
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

  onFocused(e: any){
    // do something when input is focused
  }

// ==================================================
// Carga
// ==================================================
  baja_evento() {

    if((this.id_evento_seleccionado == '') || (this.id_evento_seleccionado == 'undefined') || (this.id_evento_seleccionado == undefined))
    {
      this.alertService.alertFail('Mensaje','Evento invalido',2000);
      return;
    }
    
      this.calendarioService.baja_evento( this.id_evento_seleccionado )
      .subscribe({
        next: (resp: any) => { 
    
          if(resp[0][0].mensaje == 'Ok') {
            this.alertService.alertSuccess('Atencion','Evento eliminado',3000);
            // this.buscarCaja();
    
            let el: HTMLElement = this.modalCerrarBajaEvento.nativeElement;
            el.click();

            let el1: HTMLElement = this.modalCerrarDetallesEvento.nativeElement;
            el1.click();
        
            this.refrescar();
            
          } else {
            this.alertService.alertFail(resp[0][0].mensaje,false,1200);
            
          }
          },
        error: (resp: any) => {  this.alertService.alertFail(resp[0][0].mensaje,false,1200); }
      });
  }

// ==================================================
// Carga
// ==================================================

dame_detalle_evento() {

  if((this.id_evento_seleccionado == '') || (this.id_evento_seleccionado == 'undefined') || (this.id_evento_seleccionado == undefined))
    {
      this.alertService.alertFail('Mensaje','Evento invalido',2000);
      return;
    }
    
      this.calendarioService.dame_detalle_evento( this.id_evento_seleccionado )
      .subscribe({
        next: (resp: any) => { 
    
          if(resp[1][0].mensaje == 'Ok') {

            this.detalles_evento = resp;

            this.detalle_evento_id_evento = resp[0][0].id_evento;
            this.detalle_evento_apellidos  = resp[0][0].apellidos;
            this.detalle_evento_nombres  = resp[0][0].nombres;
            this.detalle_evento_fecha_evento  = resp[0][0].fecha_evento;
            this.detalle_evento_fecha_creacion_evento  = resp[0][0].created_at;
            this.detalle_evento_nro_identidad  = resp[0][0].nro_identidad;
            this.detalle_evento_titulo  = resp[0][0].title;

            
          } else {
            this.alertService.alertFail(resp[0][0].mensaje,false,1200);
            
          }
          },
        error: (resp: any) => {  this.alertService.alertFail(resp[0][0].mensaje,false,1200); }
      });

}
// ==================================================
// refrescar
// ==================================================
  refrescar() {

    this.cargar_eventos_calendario();
    
  }

// ==================================================
// Carga
// ==================================================
  onDatesSet(event: any) {

    const currentMonth = event.view.currentStart.getMonth() + 1; // Sumar 1 para obtener el número del mes correcto

    const startDate = event.start; // fecha de inicio visible en el calendario
    const endDate = event.end; // fecha de fin visible en el calendario

    // Obtener el mes actualmente visible
    const currentYear = startDate.getFullYear();

    this.mes_seleccionado = currentMonth;
    this.ano_seleccionado = currentYear;

    console.log("prev");

    this.ocultarBotonesEnFechas();
    // this.cargar_eventos_calendario();
    
  }

// ==================================================
// Función para ocultar botones en fechas específicas
// ==================================================
ocultarBotonesEnFechas() {

  const casilleros = document.querySelectorAll('.fc-daygrid-day');
  
  casilleros.forEach((casillero) => {
    const fecha = casillero.getAttribute('data-date');
    
    if (!this.citas_agendadas.some((f: any) => f.fecha === fecha)) {
      const boton = casillero.querySelector('button');

      if (boton) {
        boton.style.display = 'none';
      }
    }
  });
}

// ==================================================
// cargar_info_calendario
// ==================================================

cargar_info_calendario() {
    
  this.calendarioService.cargar_info_calendario( )
  .subscribe({
    next: (resp: any) => { 

      if(resp[4][0].mensaje == 'ok') {

        this.citas_pendientes = resp[0][0].citas_pendientes;
        this.citas_mes  = resp[1][0].citas_mes;
        this.citas_hoy  = resp[2][0].citas_hoy;
        this.citas_agendadas  = resp[3];

        this.cargando = false;
                
      } else {
        this.cargando = true;

        this.alertService.alertFail(resp[0][0].mensaje,false,1200);
        
      }
      },
    error: (resp: any) => {  this.alertService.alertFail(resp[0][0].mensaje,false,1200); }
  });

}

// ==================================================
// cargar_info_calendario - version await/async
// ==================================================
cargar_info_calendario_async(): Promise<void> {

  return new Promise((resolve, reject) => {
    // Simular la carga de datos desde una base de datos
    this.calendarioService.cargar_info_calendario().subscribe(
      (datos: any) => {

        if(datos[4][0].mensaje == 'ok') {
  
          this.citas_pendientes = datos[0][0].citas_pendientes;
          this.citas_mes  = datos[1][0].citas_mes;
          this.citas_hoy  = datos[2][0].citas_hoy;
          this.citas_agendadas  = datos[3];

          localStorage.setItem("citas_agendadas", this.citas_agendadas);
          
        } else {
          this.alertService.alertFail(datos[0][0].mensaje,false,1200);
          
        }
        console.log("resolve")

        resolve(); // Resuelve la promesa cuando los datos se han cargado
        this.cargando = false;
        console.log("resolve 2")

      },
      (error) => {
        this.cargando = true;
        reject(error); // Rechaza la promesa en caso de error
      }
    );
  });
}

// ==================================================
// 
// ==================================================
refrescar_citas() {

  const pfechaInicio  = this.utilService.formatDate3(this.fechaInicio);
  const pfechaFin = this.utilService.formatDate3(this.fechaFin);

  this.calendarioService.listar_eventos_fecha( pfechaInicio , pfechaFin  )
      .subscribe( {
        next: (resp: any) => { 
        console.log("🚀 ~ CalendarioComponent ~ refrescar_citas ~ resp:", resp)

          if ( resp[1][0].mensaje == 'Ok') {
            
            this.calendario_fechas = resp[0];

            this.alertService.cargando = false;

          } else {
            this.alertService.alertFail('Ocurrio un error',false,2000);
            this.alertService.cargando = false;

          }
          this.alertService.cargando = false;

          return;
          },
      error: () => { 
        this.alertService.alertFail('Ocurrio un error',false,2000);
        this.alertService.cargando = false;

      }
    });

}

// ==================================================
// 
// ==================================================
modal_baja_cita(id_evento : any) {


}

}
