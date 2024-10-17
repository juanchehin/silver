import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class EgresosService {

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
  listarEgresosFecha(desde: number , FechaInicio: any , FechaFin: any){

    let url = URL_SERVICIOS + '/egresos/listar/' + desde + '/' + FechaInicio + '/' + FechaFin;

    return this.http.get( url, this.headers );
  }


// ==================================================
//
// ==================================================
listarEgresosIdUsuario(desde: number , Fecha: string ){

  let url = URL_SERVICIOS + '/egresos/listar/mis-egresos/' + desde + '/' + Fecha + '/' + this.IdPersona;

  return this.http.get( url );
}
// ==================================================
//
// ==================================================
cargarTiposPago(){

  let url = URL_SERVICIOS + '/egresos/listar/tipos-pago';

  return this.http.get( url );
}

// ==================================================
//
// ==================================================
dameDatosPDFVenta( pIdTransaccion: any ){

  let url = URL_SERVICIOS + '/egresos/datos-pdf/' + pIdTransaccion;

  return this.http.get( url ,this.headers);
}


// ==================================================
//
// ==================================================
listar_egresos( desde: number ){

  let url = URL_SERVICIOS + '/egresos/listar/' + desde;

  return this.http.get( url ,this.headers);
}

// ==================================================
//        
// ==================================================
baja_transaccion(id_transaccion: any ) {

  let url = URL_SERVICIOS + '/egresos/baja/' + id_transaccion + '/' + this.IdPersona;

  return this.http.get( url, this.headers);
}

// ==================================================
//
// ==================================================
alta_egreso( egreso : any){

  let url = URL_SERVICIOS + '/egresos/alta/' + this.IdPersona;

  return this.http.post( url, egreso,this.headers );
}

// ==================================================
//
// ==================================================
dame_transaccion( pIdTransaccion: any ){

  let url = URL_SERVICIOS + '/egresos/dame/' + pIdTransaccion + '/' + this.IdPersona;

  return this.http.get( url ,this.headers);
}


}
