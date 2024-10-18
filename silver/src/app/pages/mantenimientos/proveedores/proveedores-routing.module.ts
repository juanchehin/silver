import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { EditarProveedorComponent } from './editar-proveedor/editar-proveedor.component';
// import { HistoricoProveedorComponent } from './historico-proveedor/historico-proveedor.component';


const routes: Routes = [
  { path: '', component: ProveedoresComponent, data: { titulo: 'Listado de proveedores' }},
  { path: 'nuevo', component: ProveedorComponent, data: { titulo: 'Nuevo proveedor' }},
  { path: 'editar/:IdPersona', component: EditarProveedorComponent, data: { titulo: 'Edicion de proveedor' }},
  // { path: 'historico/:IdPersona', component: HistoricoProveedorComponent, data: { titulo: 'Trabajos del proveedor' }}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedoresRoutingModule { }
