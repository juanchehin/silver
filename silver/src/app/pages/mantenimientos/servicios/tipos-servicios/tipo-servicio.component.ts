import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';
import { UnidadesService } from '../../../../services/unidades.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styles: []
})
export class ServicioComponent implements OnInit {

  cargando = true;
 
  // ==============================    
  servicio = '';
  codigo = '';
  descripcion = '';
  id_cat_servicio = 1;
  precio: any;
  comision = 0;
  categorias_serv: any;
  id_rol: any;
  //
  nuevo_tipo_servicio: any;
  descripcion_nuevo_tipo_servicio: any;

  @ViewChild('botonCerrarModalAltaTipoServicio') botonCerrarModalAltaTipoServicio!: ElementRef;

  constructor(
    private router: Router, 
    public serviciosService: ServiciosService, 
    public activatedRoute: ActivatedRoute,
    public unidadesService: UnidadesService,
    public alertService: AlertService,
    public authService: AuthService
    ) {

  }

  ngOnInit() {
    this.cargarCategoriasServicios();
    this.dame_id_rol();

  }

// ==================================================
//        Crear 
// ==================================================

altaServicio() {

      //** */
      if((this.servicio.length <= 0 || this.servicio == '') ){
        this.alertService.alertFailWithText('Debe cargar un nombre para el servicio','Atencion',2000);
        return;
      }
      //** */
      if((this.precio == undefined || this.precio.length <= 0 || this.precio == '' || this.precio <= 0) ){
        this.alertService.alertFailWithText('Debe cargar un precio para el servicio','Atencion',2000);
        return;
      }

      if((this.comision <= 0 || this.comision > 99) ){
        this.alertService.alertFailWithText('Problema con comision %','Atencion',2000);
        return;
      }

      if((this.codigo == undefined || this.codigo.length <= 0 || this.codigo == '') ){
        this.alertService.alertFailWithText('Debe cargar un codigo para el servicio','Atencion',2000);
        return;
      }

      const servicio = new Array(        
        this.servicio,
        this.id_cat_servicio,
        this.precio,
        this.comision,
        this.codigo,
        this.descripcion
      );

      this.serviciosService.altaServicio( servicio )
                .subscribe( {
                  next: (resp: any) => { 
                    
                    if ( resp.mensaje === 'Ok') {
                      this.alertService.alertSuccess('Atencion','Servicio cargado',2000);
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

// ==================================================
//        Crear alta_tipo_servicio
// ==================================================

alta_tipo_servicio() {

  const nuevo_tipo_servicio = new Array(
    this.nuevo_tipo_servicio,
    this.descripcion_nuevo_tipo_servicio
  );

  this.serviciosService.alta_tipo_servicio( nuevo_tipo_servicio )
            .subscribe( (resp: any) => {
              
              if ( resp.mensaje == 'Ok') {

                this.alertService.alertSuccess('Mensaje','Cargado con exito',2000);

                let el: HTMLElement = this.botonCerrarModalAltaTipoServicio.nativeElement;
                el.click();

                this.nuevo_tipo_servicio = '';
                this.descripcion_nuevo_tipo_servicio  = '';

                this.cargarCategoriasServicios();
                
              } else {
                this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',4000);
              }
              return;
            });


}
}
