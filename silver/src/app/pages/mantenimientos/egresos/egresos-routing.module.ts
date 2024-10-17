import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EgresosComponent } from './egresos/egresos.component';

const routes: Routes = [
   // Egresos
   { path: '', component: EgresosComponent, data: { titulo: 'Egresos' }},
  //  { path: 'nuevo', component: EgresoComponent, data: { titulo: 'Nuevo Egreso' }},
  //  { path: 'editar/:IdEgreso', component: EditarEgresoComponent, data: { titulo: 'Edicion de servicio' }}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EgresosRoutingModule { }
