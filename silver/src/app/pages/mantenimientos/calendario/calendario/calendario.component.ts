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

  @ViewChild('modalCerrarNuevoEvento') modalCerrarNuevoEvento!: ElementRef;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin,interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    events: [
      { title: 'event 1', date: '2024-10-10' },
      { title: 'event 2', date: '2019-04-02' }
    ]
  };

  constructor(
    public alertService: AlertService,
    private calendarioService: CalendarioService
  ) {
   }

  ngOnInit() {
   this.cargar_eventos_calendario();
  }

  // =====================
  handleDateClick(arg: any) {
    console.log("🚀 ~ CalendarioComponent ~ handleDateClick ~ arg:", arg)
    this.fecha_evento = arg.dateStr;
    // alert('date click! ' + arg.dateStr)

    const modal = document.getElementById('modal_nuevo_evento');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal);
      bootstrapModal.show();
    }

  }

  // =====================
  cargar_eventos_calendario() {
    
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
    
          if(resp.mensaje == 'Ok') {
            this.alertService.alertSuccess('Atencion','Caja aperturada',3000);
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

}
