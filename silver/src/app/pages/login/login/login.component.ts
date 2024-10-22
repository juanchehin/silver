import { Component, OnInit, NgZone, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { TasasService } from 'src/app/services/tasas.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  tasa_dia: any;

  constructor( 
    private router: Router,              
    public authService: AuthService,
    private alertService: AlertService,
    public tasasService: TasasService
  )
  { }

  ngOnInit(): void {
    this.authService.logout();
    this.dame_tasa_dia();

    this.form = new FormGroup({      
      usuario: new FormControl(null, Validators.required ),
      password: new FormControl(null, Validators.required ),
      tasa_dia: new FormControl(null )
    });
  }

// ==================================================
//  Proceso de LOGUEO
// ==================================================
ingresar() {

  if ( this.form.invalid ) {
    return;
  }

  const persona = new Array(
    this.form.value.usuario,
    this.form.value.password,
    this.form.value.tasa_dia
  );


  this.authService.login(persona)
      .subscribe((resp: any) => {                
        if ( resp == true) {

        if(persona[2] !== null && persona[2] !== undefined)
        {
            this.router.navigate(['/dashboard/calendario']);
            return;
        }
        else{
          if(this.tasa_dia !== null && this.tasa_dia !== undefined)
            {
              this.router.navigate(['/dashboard/calendario']);
              return;
            }else{            
              this.alertService.alertFailWithText('Debe cargar la tasa del dia','Atencion',3000);
              return;
            }
          }
        }
       

        this.alertService.alertFailWithText('Error de credenciales','Atencion',3000);

    },
    ( error: any) => {

      this.alertService.alertFailWithText('Ocurrio un error, contactese con el adminsitrador','Atencion',4000);

    }

    );

}

// ==================================================
//  
// ==================================================
dame_tasa_dia() {

  this.tasasService.dame_tasa_dia( )
  .subscribe( {
          next: (resp: any) => {

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
