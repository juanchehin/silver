import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TasasRoutingModule } from './tasas-routing.module';
import { TasasComponent } from './tasas/tasas.component';


@NgModule({
  declarations: [
    TasasComponent
  ],
  imports: [
    CommonModule,
    TasasRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TasasModule { }
