import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosRoutingModule } from './usuarios-routing.module';
import { EmpleadosComponent } from './usuarios/usuarios.component';
import { EmpleadoComponent } from './usuario/usuario.component';
import { EditarEmpleadoComponent } from './editar-usuario/editar-usuario.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HistoricoEmpleadoComponent } from './historico-empleado/historico-empleado.component';


@NgModule({
  declarations: [
    EmpleadosComponent,
    EmpleadoComponent,
    EditarEmpleadoComponent,
    HistoricoEmpleadoComponent
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    ReactiveFormsModule,
    FormsModule
    // CuentaComponent,
    // MovimientosComponent,
    // CuentasComponent,
    // EditarEmpleadoCuentaComponent,
    // CuentaComponent
  ]
})
export class UsuariosModule { }
