import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
// import { HistoricoUsuarioComponent } from './historico-usuario/historico-usuario.component';


const routes: Routes = [
  { path: '', component: UsuariosComponent, data: { titulo: 'Listado de usuarios' }},
  { path: 'nuevo', component: UsuarioComponent, data: { titulo: 'Nuevo usuario' }},
  { path: 'editar/:IdPersona', component: EditarUsuarioComponent, data: { titulo: 'Edicion de usuario' }},
  // { path: 'historico/:IdPersona', component: HistoricoUsuarioComponent, data: { titulo: 'Trabajos del usuario' }}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
