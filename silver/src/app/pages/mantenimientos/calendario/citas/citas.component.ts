import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CalendarioService } from 'src/app/services/calendario.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;
  calendario!: any;
  totalCalendario = 0;
  id_producto_seleccionado: any;
  fecha_cita: any;
  descripcion_evento: any;
  horario_nuevo_evento: any;
  itemPendienteServicio: any = [];
  eventos_horas: any;
  horario_seleccionado: any;
  id_evento_a_eliminar: any;
  horario_evento_eliminar: any;
  hora_modal_alta_evento: any;

  @ViewChild('modalCerrarNuevoEvento') modalCerrarNuevoEvento!: ElementRef;
  @ViewChild('modalCerrarBajaEvento') modalCerrarBajaEvento!: ElementRef;
  @ViewChild('modalCerrarDetallesEvento') modalCerrarDetallesEvento!: ElementRef;
  @ViewChild('modalCerrarCancelarEvento') modalCerrarCancelarEvento!: ElementRef;

  // @ViewChild('inputVendedor') inputVendedor!: ElementRef;

  @ViewChild('inputVendedor') inputVendedor: any;
  @ViewChild('inputCliente') inputCliente: any;
  @ViewChild('inputServicio') inputServicio: any;

  // Empleados
  empleados: any;
  keywordEmpleado = 'empleado';
  empleadoBuscado = '';
  IdEmpleado = 0;

  
  // Servicios
  servicios: any;
  keywordServicio = 'servicio';
  servicioBuscado = '';
  cantidadLineaVentaServicio = 1;

  //
  IdCliente = 0;
  clientes = [];
  keywordCliente = 'NombreCompleto';
  clienteBuscado = '';

  //
  inicio_nuevo_evento: any;
  fin_nuevo_evento: any;


  horarios = [
    { label: '08:00 AM' , hora: '08:00:00' , estado_evento: '' },
    { label: '08:30 AM' , hora: '08:30:00' , estado_evento: '' },
    { label: '09:00 AM' , hora: '09:00:00' , estado_evento: '' },
    { label: '09:30 AM' , hora: '09:30:00' , estado_evento: '' },
    { label: '10:00 AM' , hora: '10:00:00' , estado_evento: '' },
    { label: '10:30 AM' , hora: '10:30:00' , estado_evento: '' },
    { label: '11:00 AM' , hora: '11:00:00' , estado_evento: '' },
    { label: '11:30 AM' , hora: '11:30:00' , estado_evento: '' },
    { label: '12:00 PM' , hora: '12:00:00' , estado_evento: '' },
    { label: '12:30 PM' , hora: '12:30:00' , estado_evento: '' },
    { label: '01:00 PM' , hora: '13:00:00' , estado_evento: '' },
    { label: '01:30 PM' , hora: '13:30:00' , estado_evento: '' },
    { label: '02:00 PM' , hora: '14:00:00' , estado_evento: '' },
    { label: '02:30 PM' , hora: '14:30:00' , estado_evento: '' },
    { label: '03:00 PM' , hora: '15:00:00' , estado_evento: '' },
    { label: '03:30 PM' , hora: '15:30:00' , estado_evento: '' },
    { label: '04:00 PM' , hora: '16:00:00' , estado_evento: '' },
    { label: '04:30 PM' , hora: '16:30:00' , estado_evento: '' },
    { label: '05:00 PM' , hora: '17:00:00' , estado_evento: '' },
    { label: '05:30 PM' , hora: '17:30:00' , estado_evento: '' },
    { label: '06:00 PM' , hora: '18:00:00' , estado_evento: '' },
    { label: '06:30 PM' , hora: '18:30:00' , estado_evento: '' },
    { label: '07:00 PM' , hora: '19:00:00' , estado_evento: '' }
  ];
  


  constructor(
    public calendarioService: CalendarioService,
    public alertaService: AlertService,
    private route: ActivatedRoute,
    public empleadosService: EmpleadosService,
    public serviciosService: ServiciosService,
    public clientesService: ClientesService,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.fecha_cita = this.route.snapshot.paramMap.get('fecha_cita');
    this.listar_citas();
  }

// ==================================================
// Carga
// ==================================================

listar_citas() {

  this.alertaService.cargando = true;


    this.calendarioService.listar_citas_fecha( this.fecha_cita )
               .subscribe( {
                next: (resp: any) => { 

                  if(resp[0].length <= 0)
                  { 
                    this.calendario = [];
                    this.totalCalendario = 0;
                    this.alertaService.cargando = false;

                    return;
                  }
  
                  if ( resp[1][0].mensaje == 'Ok') {
                    
                    this.totalCalendario = resp[1][0].cantCalendarioBuscados;
                    this.calendario = resp[0];
                    this.alertaService.cargando = false;

                  } else {
                    this.alertaService.alertFail('Ocurrio un error',false,2000);
                    this.alertaService.cargando = false;

                  }
                  this.alertaService.cargando = false;

                  return;
                 },
                error: () => { 
                  this.alertaService.alertFail('Ocurrio un error',false,2000);
                  this.alertaService.cargando = false;

                }
              });

  }

// ==================================================
// Carga
// ==================================================

listar_eventos_hora() {

  this.alertaService.cargando = true;


    this.calendarioService.listar_eventos_hora( this.fecha_cita,  this.horario_seleccionado )
               .subscribe( {
                next: (resp: any) => { 

                  if(resp[0].length <= 0)
                  { 
                    this.calendario = [];
                    this.totalCalendario = 0;
                    this.alertaService.cargando = false;

                    return;
                  }
  
                  if ( resp[1][0].mensaje == 'Ok') {
                    
                    this.eventos_horas = resp[0];
                    this.alertaService.cargando = false;

                  } else {
                    this.alertaService.alertFail('Ocurrio un error',false,2000);
                    this.alertaService.cargando = false;

                  }
                  this.alertaService.cargando = false;

                  return;
                 },
                error: () => { 
                  this.alertaService.alertFail('Ocurrio un error',false,2000);
                  this.alertaService.cargando = false;

                }
              });

  }
// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalCalendario ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.listar_citas();

}


// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {

  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) {
      backdrop.remove();
  }


  this.listar_citas();

}

// ==================================================
// Carga
// ==================================================

cargarEmpleados() {

  this.empleadosService.cargarEmpleados( this.empleadoBuscado )
             .subscribe( (resp: any) => {

              this.empleados = resp;

            });

}

// ==============================
  // Para empleados
  // ================================
  selectEventEmpleado(item: any) {
    this.IdEmpleado = item.id_persona;
    // this.agregarLineaVenta(item);
    // do something with selected item
  }

  onChangeSearchEmpleado(val: any) {

    if(val == '' || val == null)
    {
      return;
    }

    this.empleadoBuscado = val;
    this.cargarEmpleados();
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocusedCliente(e: any){
    // do something when input is focused
  }

    // ==============================
  // Para servicios
  // ================================
  selectEventServicio(item: any) {
    // this.precio_servicio_pendiente = item.precio;
    this.itemPendienteServicio = item;
  }
  //
  onChangeSearchServicio(val: any) {
    if(val == '' || val == null)
    {
      return;
    }
    this.servicioBuscado = val;
    this.cargarServicios();
  }
  
  onFocusedServicio(e: any){
  }

  // ==================================================
// Autocompletar de servicios
// ==================================================

cargarServicios() {

  this.serviciosService.cargarServicios( this.servicioBuscado )
             .subscribe( (resp: any) => {

              this.servicios = resp[0];

            });

}

  // ==============================
  // Para cliente
  // ================================
  selectEventCliente(item: any) {
    this.IdCliente = item.id_persona;
    // this.agregarLineaVenta(item);
    // do something with selected item
  }

  onChangeSearchCliente(val: any) {

    if(val == '' || val == null)
    {
      return;
    }

    this.clienteBuscado = val;

    this.cargarClientes();
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any){
    // do something when input is focused
  }

  clearPanelinputVendedor(): void {
    this.inputVendedor.clear();
  }
  clearPanelinputCliente(): void {
    this.inputCliente.clear();
  }
  clearPanelinputServicio(): void {
    this.inputServicio.clear();
  }

// ==================================================
// Carga
// ==================================================

cargarClientes() {

  this.clientesService.cargarClientes( this.clienteBuscado )
             .subscribe( (resp: any) => {

              this.clientes = resp;

            });

}
  // =====================
  alta_evento() {

    if((this.descripcion_evento == '') || (this.descripcion_evento == 'undefined') || (this.descripcion_evento == undefined))
    {
      this.alertaService.alertFail('Mensaje','Descripcion invalido',2000);
      return;
    }

    if((this.itemPendienteServicio == '') || (this.itemPendienteServicio == 'undefined') || (this.itemPendienteServicio == undefined))
    {
      this.alertaService.alertFail('Mensaje','Servicio invalido',2000);
      return;
    }

    if((this.IdCliente <= 0) || (this.IdCliente == undefined))
    {
      this.alertaService.alertFail('Mensaje','Cliente invalido',2000);
      return;
    }

    if((this.IdEmpleado <= 0) || (this.IdEmpleado == undefined))
    {
      this.alertaService.alertFail('Mensaje','Cliente invalido',2000);
      return;
    }

    if((this.inicio_nuevo_evento <= 0) || (this.inicio_nuevo_evento == undefined))
    {
      this.alertaService.alertFail('Mensaje','Cliente invalido',2000);
      return;
    }

    const check_inicio_nuevo_evento = !this.horarios.some(horario => horario.hora === this.inicio_nuevo_evento);
    const check_fin_nuevo_evento = !this.horarios.some(horario => horario.hora === this.fin_nuevo_evento);

    if (check_inicio_nuevo_evento || check_fin_nuevo_evento) {
      this.alertaService.alertFail('Mensaje','Horario invalido',2000);
      return;
    }

    // const esMenor = this.inicio_nuevo_evento < this.inicio_nuevo_evento;

    if (this.inicio_nuevo_evento < this.inicio_nuevo_evento) {
      this.alertaService.alertFail('Mensaje','El horario fin debe ser mayor a horario inicio',2000);
      return;
    }

      this.calendarioService.alta_evento( this.fecha_cita, this.inicio_nuevo_evento,this.fin_nuevo_evento,
          this.IdEmpleado, this.IdCliente, this.itemPendienteServicio.id_servicio , this.descripcion_evento )
      .subscribe({
        next: (resp: any) => { 
    
          if(resp[0][0].mensaje == 'Ok') {
            this.alertaService.alertSuccess('Atencion','Evento cargado',3000);
            // this.buscarCaja();
    
            let el: HTMLElement = this.modalCerrarNuevoEvento.nativeElement;
            el.click();

            this.limpiar_modal_nuevo_evento();

            this.refrescar();
            
          } else {
            this.alertaService.alertFailWithTextCenter(resp[0][0].mensaje,false,2000);
            
          }
          },
        error: (resp: any) => {  this.alertaService.alertFail(resp[0][0].mensaje,false,1200); }
      });
  }

  // =====================
  baja_evento() {

      this.calendarioService.baja_evento( this.id_evento_a_eliminar )
      .subscribe({
        next: (resp: any) => { 
    
          if(resp[0][0].mensaje == 'Ok') {
            this.alertaService.alertSuccess('Atencion','Evento eliminado',3000);
    
            let el: HTMLElement = this.modalCerrarBajaEvento.nativeElement;
            el.click();
        
            this.refrescar();
            
          } else {
            this.alertaService.alertFail(resp[0][0].mensaje,false,1200);
            
          }
          },
        error: (resp: any) => {  this.alertaService.alertFail(resp[0][0].mensaje,false,1200); }
      });
  }

  // =====================
  cancelar_evento() {

    this.calendarioService.cancelar_evento( this.id_evento_a_eliminar )
    .subscribe({
      next: (resp: any) => { 
  
        if(resp[0][0].mensaje == 'Ok') {
          this.alertaService.alertSuccess('Atencion','Evento cancelado',3000);
  
          let el: HTMLElement = this.modalCerrarCancelarEvento.nativeElement;
          el.click();

          this.cerrar_modal_confirmar_cancelar_evento_hora();

      
          this.refrescar();
          
        } else {
          this.alertaService.alertFail(resp[0][0].mensaje,false,1200);
          
        }
        },
      error: (resp: any) => {  this.alertaService.alertFail(resp[0][0].mensaje,false,1200); }
    });
}
  //  ==================
  modal_alta_evento(horario: any){

    this.horario_nuevo_evento = horario.hora;     
    this.hora_modal_alta_evento =  horario.label;

    const modal = document.getElementById('modal_nuevo_evento');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }

  //  ==================
  modal_listar_eventos_hora(horario: any){

    this.horario_seleccionado = horario;    
    this.listar_eventos_hora();  

    const modal = document.getElementById('modal_listar_eventos_hora');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }

  //  ==================
  levantar_modal_confirmar_baja_evento_hora(p_id_evento: any){

  this.id_evento_a_eliminar = p_id_evento;

    const modal_2 = document.getElementById('modal_confirmar_baja_evento_hora');
    if (modal_2) {
      const bootstrapModal_2 = new (window as any).bootstrap.Modal(modal_2);
      bootstrapModal_2.show();
    }
  }

  //  ==================
  levantar_modal_confirmar_cancelar_evento_hora(p_id_evento: any){

    this.cerrar_modal_confirmar_eliminar_evento_hora();
    this.id_evento_a_eliminar = p_id_evento;
  
      const modal_3 = document.getElementById('modal_confirmar_cancelar_evento_hora');
      if (modal_3) {
        const bootstrapModal_3 = new (window as any).bootstrap.Modal(modal_3);
        bootstrapModal_3.show();
      }
    }

  //  ==================
  cerrar_modal_confirmar_eliminar_evento_hora(){

    const modal_4 = document.getElementById('modal_confirmar_baja_evento_hora');

    let el: HTMLElement = this.modalCerrarBajaEvento.nativeElement;
    el.click();

    const bootstrapModal_4 = new (window as any).bootstrap.Modal(modal_4);
    bootstrapModal_4.hide();
  }

   //  ==================
   cerrar_modal_confirmar_cancelar_evento_hora(){

    const modal_5 = document.getElementById('modal_confirmar_cancelar_evento_hora');

    let el: HTMLElement = this.modalCerrarCancelarEvento.nativeElement;
    el.click();

    const bootstrapModal_5 = new (window as any).bootstrap.Modal(modal_5);
    bootstrapModal_5.hide();
  }

   //  ==================
   limpiar_modal_nuevo_evento(){
        
    this.descripcion_evento  = '';
        
    this.clearPanelinputVendedor();
    this.clearPanelinputCliente();
    this.clearPanelinputServicio();
  }
    
// ==================================================
// regresar pagina
// ==================================================
regresar_pagina() {

  this.router.navigate(['/dashboard/calendario']);

  
}
}
