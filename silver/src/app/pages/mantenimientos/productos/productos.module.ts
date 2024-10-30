import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { RouterModule } from '@angular/router';

import { ProductoComponent } from './productos/producto.component';
import { ProductosComponent } from './productos/productos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarProductoComponent } from './productos/editar-producto.component';
// import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NumberFormatDirective } from 'src/app/shared/directives/number-format.directive';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ProductosRoutingModule,
    RouterModule,
    // AutocompleteLibModule,
    ReactiveFormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProductoComponent,
    ProductosComponent,
    EditarProductoComponent,
    NumberFormatDirective
  ]
})
export class ProductosModule { }
