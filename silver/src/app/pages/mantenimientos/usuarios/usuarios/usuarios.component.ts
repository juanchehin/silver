import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  desde = 0;

  usuarios!: any;

  totalUsuarios = 0;
  cargando = true;
  id_usuario_seleccionado: any;

  @ViewChild('inputUsuarioBuscado') inputUsuarioBuscado!: ElementRef;
  @ViewChild('divCerrarModalBajaUsuario') divCerrarModalBajaUsuario!: ElementRef;

  constructor(
    public usuariosService: UsuariosService,
    private alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.buscarUsuarios();
  }

// ==================================================
// Carga
// ==================================================

buscarUsuarios() {

  this.alertService.cargando = true;

    const inputElement: HTMLInputElement = document.getElementById('usuarioBuscado') as HTMLInputElement;
    const usuarioBuscado: any = inputElement.value || null;

    this.usuariosService.buscarUsuariosPaginado( this.desde,usuarioBuscado  )
               .subscribe( {
                next: (resp: any) => { 

                  if(resp[2][0].mensaje == 'Ok')
                  { 
                    this.totalUsuarios = resp[1][0].cantUsuarios;
    
                    this.usuarios = resp[0];
                    this.alertService.cargando = false;

                    return;
                  } else {
                    this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',2000);

                  }
                  this.alertService.cargando = false;

                  return;
                 },
                error: () => { 
                  this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',2000);
                  this.alertService.cargando = false;

                }
              });

  }

// ==================================================
// 
// ==================================================

baja_usuario() {

  this.usuariosService.bajaUsuario( this.id_usuario_seleccionado )
  .subscribe({
    next: (resp: any) => {
      if((resp[0].Mensaje == 'Ok')) {

        this.alertService.alertSuccess('Eliminacion','Usuario dado de baja',3000);
        
        let el: HTMLElement = this.divCerrarModalBajaUsuario.nativeElement;
        el.click();

        this.refrescar();
        
      } else {
        
        this.alertService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',1200);
        
      }
     },
    error: (resp: any) => {

      this.alertService.alertFailWithText('Ocurrio un error al procesar el pedido','Error',1200);
    
    }
  });

}
// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalUsuarios ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.buscarUsuarios();

}

// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde' a cero
  this.inputUsuarioBuscado.nativeElement.value = '';
  
  this.desde = 0;
  this.buscarUsuarios();

}

// ==================================================
// 
// ==================================================

modal_baja_usuario(id_usuario: string) {

  this.id_usuario_seleccionado = id_usuario;

}

}
