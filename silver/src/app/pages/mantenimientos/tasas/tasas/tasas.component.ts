import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { TasasService } from 'src/app/services/tasas.service';

@Component({
  selector: 'app-tasas',
  templateUrl: './tasas.component.html',
  styles: []
})
export class TasasComponent implements OnInit {

  tasa = 1;

  constructor(
    public tasasService: TasasService, 
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService
    ) {
  }

  ngOnInit() {
    this.cargar_tasa();
  }

  // ======================================
  //
  // ======================================
  cargar_tasa(){
          this.tasasService.cargarTasas(  )
                .subscribe( {
                  next: (resp: any) => {

                    if((resp[1][0].mensaje == 'Ok')) {

                      this.tasa = resp[0][0].tasa;
                      
                    } else {                      
                      this.alertService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',1200);
                    }            
            },
            error: () => { 
              this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) 
            }
          });

      };

  // ======================================
  //
  // ======================================
  actualizarConfiguraciones() {

    this.alertService.cargando = true;

    const configuraciones = [
      this.tasa
    ]

    this.tasasService.actualizarTasa( configuraciones )
              .subscribe( {
                next: (resp: any) => { 

                  if ( resp[0][0].mensaje === 'Ok') {
                    this.alertService.alertSuccess('Mensaje','Configuracion guardada',2000);
                    this.cargar_tasa();
                    this.alertService.cargando = false;

                  } else {
                    this.alertService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',1200);
                    this.alertService.cargando = false;

                  }
                  this.alertService.cargando = false;

                  return;
                 },
                error: () => { 
                  this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000);
                  this.alertService.cargando = false;

                }
              });
                
            }


}
