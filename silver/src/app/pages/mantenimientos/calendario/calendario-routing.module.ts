import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component';
import { CitasComponent } from './citas/citas.component';

const routes: Routes = [
   // Calendarios
   { path: '', component: CalendarioComponent, data: { titulo: 'Calendarios' }},
   { path: 'citas/:fecha_cita', component: CitasComponent, data: { titulo: 'Citas' }}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarioRoutingModule { }
