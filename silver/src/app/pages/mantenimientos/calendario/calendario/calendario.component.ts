import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // para el arrastrar y soltar
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import { AlertService } from 'src/app/services/alert.service';
import { CalendarioService } from 'src/app/services/calendario.service';

// import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styles: []
})
export class CalendarioComponent implements OnInit {
  
  descripcion_evento: any;
  fecha_evento: any;
  eventos: any = [];
  mes_seleccionado: any;
  ano_seleccionado: any;
  calendarOptions: CalendarOptions | undefined;

  @ViewChild('modalCerrarNuevoEvento') modalCerrarNuevoEvento!: ElementRef;

  constructor(
    public alertService: AlertService,
    private calendarioService: CalendarioService
  ) {
   }

  ngOnInit() {
    this.cargar_eventos_calendario();
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin,interactionPlugin],
      dateClick: (arg) => this.handleDateClick(arg),
      events: [],
      datesSet: this.onDatesSet.bind(this)
    };
  }

  // =====================
  handleDateClick(arg: any) {
    console.log("🚀 ~ CalendarioComponent ~ handleDateClick ~ arg:", arg)
    this.fecha_evento = arg.dateStr;

    const modal = document.getElementById('modal_nuevo_evento');
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

  // =====================
  alta_evento() {

    if((this.descripcion_evento == '') || (this.descripcion_evento == 'undefined') || (this.descripcion_evento == undefined))
    {
      this.alertService.alertFail('Mensaje','Descripcion invalido',2000);
      return;
    }
    
      this.calendarioService.alta_evento( this.fecha_evento, this.descripcion_evento )
      .subscribe({
        next: (resp: any) => { 
    
          if(resp[0][0].mensaje == 'Ok') {
            this.alertService.alertSuccess('Atencion','Evento cargado',3000);
            // this.buscarCaja();
    
            let el: HTMLElement = this.modalCerrarNuevoEvento.nativeElement;
            el.click();
        
            this.refrescar();
            
          } else {
            this.alertService.alertFail(resp[0][0].mensaje,false,1200);
            
          }
          },
        error: (resp: any) => {  this.alertService.alertFail(resp[0][0].mensaje,false,1200); }
      });
  }

  refrescar() {

    this.cargar_eventos_calendario();
    
  }

  // Este método captura el evento datesSet y obtiene el mes visible
  onDatesSet(event: any) {
    const currentMonth = event.view.currentStart.getMonth() + 1; // Sumar 1 para obtener el número del mes correcto

    const startDate = event.start; // fecha de inicio visible en el calendario
    const endDate = event.end; // fecha de fin visible en el calendario

    // Obtener el mes actualmente visible
    const currentYear = startDate.getFullYear();

    this.mes_seleccionado = currentMonth;
    this.ano_seleccionado = currentYear;

    // this.cargar_eventos_calendario();


    console.log('Mes visible:', currentMonth, 'Año:', currentYear);
  }

}
