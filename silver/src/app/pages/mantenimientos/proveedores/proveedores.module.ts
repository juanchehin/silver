import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { EditarProveedorComponent } from './editar-proveedor/editar-proveedor.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { HistoricoProveedorComponent } from './historico-proveedor/historico-proveedor.component';


@NgModule({
  declarations: [
    ProveedoresComponent,
    ProveedorComponent,
    EditarProveedorComponent
    // HistoricoProveedorComponent
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProveedoresModule { }
