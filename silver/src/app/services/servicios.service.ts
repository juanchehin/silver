import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'token': this.token
      }
    }
  }
  // ==============================
  get IdPersona(): any {
    if(this.authService.IdPersona)
    {
      return this.authService.IdPersona;
    }
    else
    {
      return localStorage.getItem('id') || '';
    }
  }


  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) { }

// ==================================================
//
// ==================================================
  listarServiciosPaginado(desde: any,pParametroBusqueda: any){

    let url = URL_SERVICIOS + '/servicios/buscar/' + desde + '/' + pParametroBusqueda + '/' + this.IdPersona;

    return this.http.get( url, this.headers );
  }  

  // ==================================================
//        
// ==================================================
altaServicio( servicio: any ) {

  const IdSucursal = localStorage.getItem('id_sucursal')

  let url = URL_SERVICIOS + '/servicios/alta/' + this.IdPersona;

  return this.http.post( url, servicio, this.headers);
}

  // ==================================================
//        
// ==================================================
editarServicio( servicioEditado: any ) {

  let url = URL_SERVICIOS + '/servicios/editar/' + this.IdPersona;

  return this.http.post( url, servicioEditado, this.headers);

}
  // ==================================================
//        
// ==================================================
baja_servicio( id_servicio: any ) {

  let url = URL_SERVICIOS + '/servicios/baja/' + id_servicio + '/' + this.IdPersona;

  return this.http.get(url, this.headers);
}
// ==================================================
//  Carga los servicios en el autocomplete, que coincidan con el parametroBusqueda
// ==================================================
cargarServicios( parametroBusqueda: string){

    let url = URL_SERVICIOS + '/servicios/listar/busqueda/autocomplete/' + parametroBusqueda + '/' + this.IdPersona;
    return this.http.get( url, this.headers ); 
    
}

// ==================================================
// Cargo las marcas,categorias,unidades,sucursal principal
// ==================================================
cargarDatosFormNuevoProducto( ){
  
    let url = URL_SERVICIOS + '/servicios/nuevo/datos-formulario';
    return this.http.get( url , this.headers);
  
}
// ==================================================
// Cargo las marcas,categorias,unidades,sucursal principal y el servicio
// ==================================================
cargarDatosFormEditarServicio(id_servicio: any ){
  
  let url = URL_SERVICIOS + '/servicios/editar/datos-formulario/' + id_servicio + '/' + this.IdPersona;
  return this.http.get( url , this.headers );

}
// ==================================================
// Busca 
// ==================================================

buscarServicios( servicio: string , pDesde: any ): any {

  if(servicio == '' || servicio == null){
    let url = URL_SERVICIOS + '/servicios/listar/' + 0;
    return this.http.get(url, this.headers);
  }
  else
  { 
    const url = URL_SERVICIOS + '/servicios/buscar/' + servicio + '/' + pDesde;
    return this.http.get(url, this.headers);
  } 

}

// ==================================================
//
// ==================================================
cargarCategoriasServicios(){

  let url = URL_SERVICIOS + '/servicios/categorias/listar';

  return this.http.get( url, this.headers );
}

// *****************************************************

  // ==================================================
//        
// ==================================================
alta_tipo_servicio( tipo_servicio: any ) {

  let url = URL_SERVICIOS + '/servicios/alta/tipo/' + this.IdPersona;

  return this.http.post( url, tipo_servicio, this.headers);
}


// ==================================================
//
// ==================================================
listarTiposServiciosPaginado(desde: any,pParametroBusqueda: any){

  let url = URL_SERVICIOS + '/servicios/tipos/buscar/' + desde + '/' + pParametroBusqueda + '/' + this.IdPersona;

  return this.http.get( url, this.headers );
}  

  // ==================================================
//        
// ==================================================
baja_tipo_servicio( id_servicio: any ) {

  let url = URL_SERVICIOS + '/servicios/tipos/baja/' + id_servicio + '/' + this.IdPersona;

  return this.http.get(url, this.headers);
}


// ==================================================
// 
// ==================================================
cargarDatosFormEditarTipoServicio(id_tipo_servicio: any ){
  
  let url = URL_SERVICIOS + '/servicios/tipos/editar/datos-formulario/' + id_tipo_servicio + '/' + this.IdPersona;
  return this.http.get( url , this.headers );

}

  // ==================================================
//        
// ==================================================
editarTipoServicio( tipo_servicioEditado: any ) {

  let url = URL_SERVICIOS + '/servicios/tipos/editar/' + this.IdPersona;

  return this.http.post( url, tipo_servicioEditado, this.headers);

}
}
