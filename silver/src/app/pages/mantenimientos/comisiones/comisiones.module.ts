import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComisionesRoutingModule } from './comisiones-routing.module';
import { RouterModule } from '@angular/router';

import { ComisionesComponent } from './comisiones/comisiones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ComisionesRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ComisionesComponent,
    // ComisionesComponent,
    // EditarEgresoComponent
  ]
})
export class ComisionesModule { }
