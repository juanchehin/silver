import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Modulos
import { PagesRoutingModule } from './pages/pages.routing';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { MaintenanceComponent } from './shared/maintenance/maintenance.component';


const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'productos', loadChildren: () => import('./pages/mantenimientos/productos/productos.module').then(m => m.ProductosModule) },

  { path: 'caja', loadChildren: () => import('./pages/mantenimientos/caja/caja.module').then(m => m.CajasModule) },
  { path: 'ventas', loadChildren: () => import('./pages/mantenimientos/ventas/ventas.module').then(m => m.VentasModule) },
  
  { path: 'clientes', loadChildren: () => import('./pages/mantenimientos/clientes/clientes.module').then(m => m.ClientesModule) },
  { path: 'tasas', loadChildren: () => import('./pages/mantenimientos/tasas/tasas.module').then(m => m.TasasModule) },

  { path: 'usuarios', loadChildren: () => import('./pages/mantenimientos/usuarios/usuarios.module').then(m => m.UsuariosModule) },
  { path: 'servicios', loadChildren: () => import('./pages/mantenimientos/servicios/servicios.module').then(m => m.ServiciosModule) },
  { path: 'maintenance', component: MaintenanceComponent },

  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
    PagesRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
