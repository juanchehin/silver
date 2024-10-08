import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-historico-usuario',
  templateUrl: './historico-usuario.component.html',
  styles: []
})
export class HistoricoUsuarioComponent implements OnInit {

  desde = 0;
  transacciones!: any;
  total_transacciones = 0;
  cargando = true;
  id_usuario_seleccionado: any;
  usuario: any;
  comision = 0;
  suma_transacciones = 0;

  fecha_inicio = this.utilService.formatDateNow(new Date(Date.now()));
  fecha_fin = this.utilService.formatDateNow(new Date(Date.now()));


  constructor(
    public usuariosService: UsuariosService,
    public activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private utilService: UtilService
  ) {
   }

  ngOnInit() {
    this.id_usuario_seleccionado = this.activatedRoute.snapshot.paramMap.get('IdPersona');
    this.listar_historico_usuario();
  }

// ==================================================
// Carga
// ==================================================

listar_historico_usuario() {

  this.alertService.cargando = true;

    this.usuariosService.listar_historico_usuario( this.desde,this.id_usuario_seleccionado,this.fecha_inicio,this.fecha_fin  )
               .subscribe( {
                next: (resp: any) => {

                  if(resp[4][0].mensaje == 'Ok')
                  { 
                    this.total_transacciones = resp[3][0].total_transacciones;
    
                    this.transacciones = resp[0];
                    this.usuario = resp[1][0].usuario;

                    this.comision = resp[2][0].comision;
                    this.suma_transacciones = resp[2][0].suma_transacciones;

                    this.alertService.cargando = false;


                    return;
                  } else {
                    this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',2000);
                    this.alertService.cargando = false;

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
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.total_transacciones ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.listar_historico_usuario();

}

// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
    
  this.desde = 0;
  this.listar_historico_usuario();

}


}
