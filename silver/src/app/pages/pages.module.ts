import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { ConfiguracionesModule } from './mantenimientos/configuraciones/configuraciones.module';
import { CalendarioModule } from './mantenimientos/calendario/calendario.module';
import { EgresosModule } from './mantenimientos/egresos/egresos.module';
import { ComisionesModule } from './mantenimientos/comisiones/comisiones.module';

@NgModule({
  declarations: [
    PagesComponent
  ],
  exports: [
    PagesComponent
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ConfiguracionesModule,
    CalendarioModule,
    EgresosModule,
    ComisionesModule
  ]
})
export class PagesModule { }
