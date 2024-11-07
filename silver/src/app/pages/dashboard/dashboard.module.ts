import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TicketVentaComponent } from './ticket-venta/ticket-venta.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { TicketVentaComponent } from './ticket-venta/ticket-venta.component';

@NgModule({
  declarations: [
    // DashboardComponent,
    // TicketVentaComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DashboardModule { }
