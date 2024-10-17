import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { TasasService } from 'src/app/services/tasas.service';
// var $ = require( "jquery" );
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario: any;
  banderaOcultarSidebar = false;

  titulo_sucursal = 'Estetica - ';
  bandera_bazar = false;
  tasa_dia = 0;

  constructor( private authService: AuthService,
              public alertService: AlertService,
               private router: Router,
               public tasasService: TasasService
              ) {
  }

  ngOnInit() {
    this.cargar_titulo();
    this.dame_tasa_dia();
  };

  logout() {
    this.authService.logout();
  }

  buscar( termino: string ) {

    if ( termino.length === 0  ) {
      return;
    }

    this.router.navigateByUrl(`/dashboard/buscar/${ termino }`);
  }

  cargar_titulo(  ) {

    this.titulo_sucursal += localStorage.getItem('sucursal');
    
    if(localStorage.getItem('sucursal') === 'Bazar')
    {
      this.bandera_bazar = true;
    }

  }

  habilitar_sidebar(  ) {

    this.alertService.bandera_sidebar = !this.alertService.bandera_sidebar;

  }

  // ==================================================
//  
// ==================================================
dame_tasa_dia() {

  this.tasasService.dame_tasa_dia( )
  .subscribe( {
          next: (resp: any) => {
          console.log("🚀 ~ LoginComponent ~ dame_tasa_dia ~ resp:", resp)

            if((resp[1][0].mensaje == 'Ok')) {

              if((resp[0][0] !== null && resp[0][0] !== undefined))
              {
                this.tasa_dia = resp[0][0].tasa;
              }
              
            } else {                      
              this.alertService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',1200);
            }            
      },
      error: () => { 
      this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) 
      }
  });
}
}
