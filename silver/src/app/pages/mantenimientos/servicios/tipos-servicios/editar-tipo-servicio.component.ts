import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';
import { CategoriasService } from '../../../../services/categorias.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-editar-tipo-servicio',
  templateUrl: './editar-tipo-servicio.component.html',
  styles: []
})
export class EditarTiposServicioComponent implements OnInit {

  IdTipoServicio: any;

  // ==============================
  tipo_servicio: any;
  id_tipo_servicio: any;
  descripcion_tipo_servicio: any;

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
    this.IdTipoServicio = this.activatedRoute.snapshot.paramMap.get('p_id_tipo_servicio');
    this.cargarDatosFormEditarTipoServicio();
  }

// ==================================================
//    
// ==================================================

update_tipo_servicio() {

      const tipo_servicioEditado = new Array(
        this.IdTipoServicio,
        this.tipo_servicio,
        this.descripcion_tipo_servicio
      );
      
      this.serviciosService.editarTipoServicio( tipo_servicioEditado )
                .subscribe( {
                  next: (resp: any) => { 
                    
                    if ( resp.mensaje === 'Ok') {
                      this.alertService.alertSuccess('Mensaje','Servicio actualizado',2000);

                      this.router.navigate(['/dashboard/servicios/tipos-servicios']);

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

cargarDatosFormEditarTipoServicio() {

    this.serviciosService.cargarDatosFormEditarTipoServicio( this.IdTipoServicio )
    .subscribe( {
      next: (resp: any) => { 

        if(resp[1][0].mensaje == 'Ok'){

          this.tipo_servicio = resp[0][0].categoria_serv;
          this.descripcion_tipo_servicio = resp[0][0].descripcion_cat_serv;
          
        }else{
          this.alertService.alertFail('Mensaje','Ocurrio un error',400);

        }

    },
    error: (err: any) => {
      this.alertService.alertFail('Mensaje','Ocurrio un error',400); }
  });

  }

}
