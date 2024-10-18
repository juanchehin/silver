import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprasRoutingModule } from './compras-routing.module';
import { ComprasComponent } from './listar-compras/compras.component';
import { NuevaCompraComponent } from './nueva-compra/nueva-compra.component';
import { FormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


@NgModule({
  declarations: [
    ComprasComponent,
    NuevaCompraComponent
  ],
  imports: [
    CommonModule,
    ComprasRoutingModule,
    FormsModule,
    AutocompleteLibModule
  ]
})
export class ComprasModule { }
