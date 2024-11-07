import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-venta',
  standalone: true,
  templateUrl: './ticket-venta.component.html',
  styleUrls: ['./ticket-venta.component.css'],
  imports: [FormsModule,CommonModule ]

})
export class TicketVentaComponent {

  @Input() items: any[] = [];  // Aquí definimos la propiedad de entrada 'items'

  @Input() total: number = 0;
  @Input() fecha_venta: any;
  //
  @Input() id_cliente: any = 0;
  @Input() ap_nom_cliente: any = '';

  //
  @Input() id_transaccion: any = 0;
  @Input() especialista: any = '';

}
