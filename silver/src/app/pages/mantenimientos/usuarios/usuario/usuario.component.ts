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
  IdRol = 1;

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
      cedula: new FormControl(null),
      Telefono: new FormControl(null ),
      Email: new FormControl(null, Validators.email ),
      direccion: new FormControl(null ),
      fecha_nac: new FormControl(null ),
      observaciones: new FormControl(null ),
      codigo: new FormControl(null ),
      contrasena: new FormControl(null ),
      id_rol: new FormControl(1 )
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
        this.forma.value.cedula,
        this.forma.value.Telefono,
        this.forma.value.Email,
        this.forma.value.direccion,
        this.forma.value.fecha_nac,
        this.forma.value.observaciones,
        this.forma.value.codigo,
        this.forma.value.contrasena,
        this.forma.value.id_rol
      );

      this.usuariosService.altaUsuario( usuario )
                .subscribe({
                    next: (resp: any) => {

                      if (resp.ok != false && resp.mensaje == 'Ok') {

                            this.alertService.alertSuccess('Mensaje','Usuario cargado',2000);
                            
                            this.router.navigate(['/dashboard/usuarios']);
                      } else {
                        this.alertService.alertFail('Mensaje','Ocurrio un error al procesar el pedido',2000);
                      }
                      return;
                     },
                    error: () => {
                
                      this.alertService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',2000);
                    
                    }
                  });

                }
}
