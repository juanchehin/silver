import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { HistoricoUsuarioComponent } from './historico-usuario/historico-usuario.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    UsuarioComponent,
    EditarUsuarioComponent
    // HistoricoUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    FormsModule
    // CuentaComponent,
    // MovimientosComponent,
    // CuentasComponent,
    // EditarUsuarioCuentaComponent,
    // CuentaComponent
  ]
})
export class UsuariosModule { }
