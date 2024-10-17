import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EgresosRoutingModule } from './egresos-routing.module';
import { RouterModule } from '@angular/router';

import { EgresosComponent } from './egresos/egresos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    EgresosRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    EgresosComponent,
    // EgresosComponent,
    // EditarEgresoComponent
  ]
})
export class EgresosModule { }
