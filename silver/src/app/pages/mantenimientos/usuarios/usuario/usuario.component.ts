import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  forma!: FormGroup;

  constructor(
    private router: Router, 
    private alertService: AlertService, 
    public usuariosService: UsuariosService, 
    public activatedRoute: ActivatedRoute
    ) {
  }

  ngOnInit() {
    this.forma = new FormGroup({      
      Apellidos: new FormControl(null, Validators.required ),
      Nombres: new FormControl(null, Validators.required ),
      DNI: new FormControl(null),
      Telefono: new FormControl(null ),
      Email: new FormControl(null, Validators.email ),
      Observaciones: new FormControl(null ),
      codigo: new FormControl(null )
    });
  }

// ==================================================
//        Crear 
// ==================================================

  altaUsuario() {

      if ( this.forma.invalid ) {
        // this.alertService.alertFail('Formulario invalido, chequee que los campos sean correctos',2000);
        return;
      }

      const usuario = new Array(
        this.forma.value.Apellidos,
        this.forma.value.Nombres,
        this.forma.value.DNI,
        this.forma.value.Telefono,
        this.forma.value.Email,
        this.forma.value.direccion,
        this.forma.value.fecha_nac,
        this.forma.value.Observaciones,
        this.forma.value.codigo
      );

      this.usuariosService.altaUsuario( usuario )
                .subscribe(
                  {
                    next: (resp: any) => {
                      if ( resp[0][0].mensaje == 'Ok') {

                            this.alertService.alertSuccess('Mensaje','Usuario cargado',2000);
                            
                            this.router.navigate(['/dashboard/usuarios']);
                          } else {
                            this.alertService.alertFail('Mensaje','Ocurrio un error : ' + resp[0][0].mensaje,2000);
                          }
                          return;
                     },
                    error: (resp: any) => {
                
                      this.alertService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',2000);
                    
                    }
                  });

                }
}
