import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class ComisionesService {

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

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  
  // ==============================
  get headers() {
    return {
      headers: {
        'token': this.token
      }
    }
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

// ==================================================
//
// ==================================================
  listarComisionesFecha(desde: number , FechaInicio: any , FechaFin: any){

    let url = URL_SERVICIOS + '/comisiones/listar/' + desde + '/' + FechaInicio + '/' + FechaFin;

    return this.http.get( url, this.headers );
  }


// ==================================================
//
// ==================================================
listarComisionesIdUsuario(desde: number , Fecha: string ){

  let url = URL_SERVICIOS + '/comisiones/listar/mis-comisiones/' + desde + '/' + Fecha + '/' + this.IdPersona;

  return this.http.get( url );
}
// ==================================================
//
// ==================================================
cargarTiposPago(){

  let url = URL_SERVICIOS + '/comisiones/listar/tipos-pago';

  return this.http.get( url );
}

// ==================================================
//
// ==================================================
dameDatosPDFVenta( pIdTransaccion: any ){

  let url = URL_SERVICIOS + '/comisiones/datos-pdf/' + pIdTransaccion;

  return this.http.get( url ,this.headers);
}


// ==================================================
//
// ==================================================
listar_comisiones(id_servicio_seleccionado: any, desde: number , pfechaInicio : any , pfechaFin : any ){

  let url = URL_SERVICIOS + '/comisiones/listar/' + desde + '/' + pfechaInicio + '/' + pfechaFin + '/' + id_servicio_seleccionado;

  return this.http.get( url ,this.headers);
}

// ==================================================
//        
// ==================================================
baja_transaccion(id_transaccion: any ) {

  let url = URL_SERVICIOS + '/comisiones/baja/' + id_transaccion + '/' + this.IdPersona;

  return this.http.get( url, this.headers);
}

// ==================================================
//
// ==================================================
alta_egreso( egreso : any){

  let url = URL_SERVICIOS + '/comisiones/alta/' + this.IdPersona;

  return this.http.post( url, egreso,this.headers );
}

// ==================================================
//
// ==================================================
dame_transaccion( pIdTransaccion: any ){

  let url = URL_SERVICIOS + '/comisiones/dame/' + pIdTransaccion + '/' + this.IdPersona;

  return this.http.get( url ,this.headers);
}


}
