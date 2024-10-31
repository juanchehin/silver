import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasComponent } from './listar-ventas/ventas.component';
import { MisVentasComponent } from './mis-ventas/mis-ventas.component';
import { NuevaVentaComponent } from './nueva-venta/nueva-venta.component';
import { FormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { SharedModule } from 'src/app/shared/shared.module';

registerLocaleData(localeEs, 'es-ES'); // Registro de localización

@NgModule({
  declarations: [
    VentasComponent,
    MisVentasComponent,
    NuevaVentaComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    FormsModule,
    AutocompleteLibModule,
    SharedModule
  ]
})
export class VentasModule { }
