import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarioRoutingModule } from './calendario-routing.module';
import { CalendarioComponent } from './calendario/calendario.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CitasComponent } from './citas/citas.component';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CalendarioRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    AutocompleteLibModule
  ],
  declarations: [
    CalendarioComponent,
    CitasComponent
  ]
})
export class CalendarioModule { }
