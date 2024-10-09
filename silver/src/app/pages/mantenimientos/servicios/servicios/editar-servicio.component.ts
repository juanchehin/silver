import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';
import { CategoriasService } from '../../../../services/categorias.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styles: []
})
export class EditarServicioComponent implements OnInit {

  IdServicio: any;

  // ==============================
  servicio: any;
  id_cat_servicio: any;
  comision: any;
  precio: any;
  descripcion: any;
  id_rol: any;
  categorias_serv: any;

  constructor(
    private router: Router, 
    public serviciosService: ServiciosService, 
    public activatedRoute: ActivatedRoute,
    public categoriasService: CategoriasService,
    public alertService: AlertService,
    public authService: AuthService
    ) {
  }

  ngOnInit() {
    this.IdServicio = this.activatedRoute.snapshot.paramMap.get('IdServicio');
    this.cargarDatosFormEditarServicio();
    this.cargarCategoriasServicios();
    this.dame_id_rol();

  }

// ==================================================
//    
// ==================================================

update_servicio() {

      //** */
      if((this.precio <= 0) ){
        this.alertService.alertFail('Mensaje','Precio invalido',3000);
        return;
      }
      

      const servicioEditado = new Array(
        this.IdServicio,
        this.servicio,
        this.id_cat_servicio,
        this.precio,
        this.comision,
        this.descripcion
      );
      
      this.serviciosService.editarServicio( servicioEditado )
                .subscribe( {
                  next: (resp: any) => { 
  
                    console.log("resp serv : ",resp)
                  
                    if ( resp.mensaje === 'Ok') {
                      this.alertService.alertSuccess('Mensaje','Servicio actualizado',2000);
                      this.router.navigate(['/dashboard/servicios']);
                    } else {
                      this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000);
                    }
                    return;
                   },
                  error: () => { this.alertService.alertFail('Ocurrio un error',false,2000) }
                });

            }

// ==================================================
// Carga
// ==================================================

cargarDatosFormEditarServicio() {

    this.serviciosService.cargarDatosFormEditarServicio( this.IdServicio )
    .subscribe( {
      next: (resp: any) => { 

        if(resp[1][0].mensaje == 'Ok'){

          this.servicio = resp[0][0].servicio;
          this.precio = resp[0][0].precio;
          this.id_cat_servicio = resp[0][0].id_cat_servicio;
          this.comision = resp[0][0].comision;
          this.descripcion = resp[0][0].descripcion;

        }else{
          this.alertService.alertFail('Mensaje','Ocurrio un error',400);

        }

    },
    error: (err: any) => {
      this.alertService.alertFail('Mensaje','Ocurrio un error',400); }
  });

  }

  // ==================================================
// Carga
// ==================================================

cargarCategoriasServicios() {


  this.serviciosService.cargarCategoriasServicios(   )
             .subscribe( (resp: any) => {

              this.categorias_serv  = resp[0];

            });

}
// ==================================================
// Carga
// ==================================================

dame_id_rol() {

  this.id_rol = this.authService.getIdRol();

  if((this.id_rol == undefined || this.id_rol.length <= 0 || this.id_rol == '' || this.id_rol <= 0) ){
    this.alertService.alertFailWithText('Ocurrio un error - Codigo 002','Atencion',2000);
    return;
  }

}
}
