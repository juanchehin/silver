import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComprasComponent } from './listar-compras/compras.component';
import { NuevaCompraComponent } from './nueva-compra/nueva-compra.component';

const routes: Routes = [
  { path: 'listar', component: ComprasComponent, data: { titulo: 'Listado de Compras' }},
  { path: 'nueva', component: NuevaCompraComponent, data: { titulo: 'Nueva compra' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }
