import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './usuario/usuario.component';
import { EmpleadosComponent } from './usuarios/usuarios.component';
import { EditarEmpleadoComponent } from './editar-usuario/editar-usuario.component';
import { HistoricoEmpleadoComponent } from './historico-empleado/historico-empleado.component';


const routes: Routes = [
  { path: '', component: EmpleadosComponent, data: { titulo: 'Listado de empleados' }},
  { path: 'nuevo', component: EmpleadoComponent, data: { titulo: 'Nuevo usuario' }},
  { path: 'editar/:IdPersona', component: EditarEmpleadoComponent, data: { titulo: 'Edicion de usuario' }},
  { path: 'historico/:IdPersona', component: HistoricoEmpleadoComponent, data: { titulo: 'Trabajos del usuario' }}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
