import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EgresosRoutingModule } from './egresos-routing.module';
import { RouterModule } from '@angular/router';

import { EgresosComponent } from './egresos/egresos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberFormatDirective } from 'src/app/shared/directives/number-format.directive';

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
    NumberFormatDirective
    // EgresosComponent,
    // EditarEgresoComponent
  ]
})
export class EgresosModule { }
