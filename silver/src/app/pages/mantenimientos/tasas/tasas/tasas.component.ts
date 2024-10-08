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
  tasas: any;
  desde = 0;
  totalTasas = 0;

  constructor(
    public tasasService: TasasService, 
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService
    ) {
  }

  ngOnInit() {
    this.cargar_tasas();
  }

  // ======================================
  //
  // ======================================
  cargar_tasas(){
          this.tasasService.cargarTasas( this.desde )
                .subscribe( {
                  next: (resp: any) => {

                    if((resp[1][0].mensaje == 'Ok')) {

                      this.tasas = resp[0];
                      
                    } else {                      
                      this.alertService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',1200);
                    }            
            },
            error: () => { 
              this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) 
            }
          });

      };

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalTasas ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargar_tasas();

}

}
