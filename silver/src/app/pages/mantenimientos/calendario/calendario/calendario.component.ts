import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // para el arrastrar y soltar
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styles: []
})
export class CalendarioComponent implements OnInit {
  
  descripcion_evento: any;

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
  ) {
   }

  ngOnInit() {
   this.cargar_eventos_calendario();
  }

  handleDateClick(arg: any) {
    console.log("🚀 ~ CalendarioComponent ~ handleDateClick ~ arg:", arg)
    // alert('date click! ' + arg.dateStr)

    const modal = document.getElementById('modal_nuevo_evento');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal);
      bootstrapModal.show();
    }

  }

  cargar_eventos_calendario() {
    
  }

  alta_evento() {
    
  }

}
