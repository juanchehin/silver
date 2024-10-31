import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { RouterModule } from '@angular/router';

import { ServicioComponent } from './servicios/servicio.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarServicioComponent } from './servicios/editar-servicio.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TiposServiciosComponent } from './tipos-servicios/tipo-servicios.component';
import { EditarTiposServicioComponent } from './tipos-servicios/editar-tipo-servicio.component';
// import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ServiciosRoutingModule,
    RouterModule,
    // AutocompleteLibModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    ServicioComponent,
    ServiciosComponent,
    EditarServicioComponent,
    TiposServiciosComponent,
    EditarTiposServicioComponent
  ]
})
export class ServiciosModule { }
