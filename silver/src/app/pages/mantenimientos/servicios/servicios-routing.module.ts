import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiciosComponent } from './servicios/servicios.component';
import { EditarServicioComponent } from './servicios/editar-servicio.component';
import { ServicioComponent } from './servicios/servicio.component';
import { TiposServiciosComponent } from './tipos-servicios/tipo-servicios.component';

const routes: Routes = [
   // Servicios
   { path: '', component: ServiciosComponent, data: { titulo: 'Servicios' }},
   { path: 'nuevo', component: ServicioComponent, data: { titulo: 'Nuevo Servicio' }},
   { path: 'editar/:IdServicio', component: EditarServicioComponent, data: { titulo: 'Edicion de servicio' }},
   // Tipos Servicios
   { path: 'tipos-servicios', component: TiposServiciosComponent, data: { titulo: 'Tipos Servicios' }},
   { path: 'editar-tipo-servicio', component: TiposServiciosComponent, data: { titulo: 'Editar Tipo Servicio' }}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule { }
