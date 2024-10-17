import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComisionesComponent } from './comisiones/comisiones.component';

const routes: Routes = [
   // Comisiones
   { path: '', component: ComisionesComponent, data: { titulo: 'Comisiones' }},
  //  { path: 'nuevo', component: ComisionComponent, data: { titulo: 'Nuevo Comision' }},
  //  { path: 'editar/:IdComision', component: EditarComisionComponent, data: { titulo: 'Edicion de servicio' }}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComisionesRoutingModule { }
