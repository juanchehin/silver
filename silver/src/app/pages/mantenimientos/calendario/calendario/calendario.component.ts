import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // el módulo de FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // para el arrastrar y soltar
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styles: []
})
export class CalendarioComponent implements OnInit {
  
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };

  constructor(
  ) {
   }

  ngOnInit() {
   
  }

}
