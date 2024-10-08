import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class CajasService {

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
  listarCajasPaginado(desde: any){

    let url = URL_SERVICIOS + '/caja/listar/' + desde + '/' + this.IdPersona;

    return this.http.get( url, this.headers );
  }  

// ==================================================
//        
// ==================================================
apertura( monto: any, observaciones: any ) {

  const data = {
    monto,
    observaciones
  }

  let url = URL_SERVICIOS + '/caja/apertura/';

  return this.http.post( url, data, this.headers);
}

// ==================================================
//        
// ==================================================
cierre( monto: any, observaciones: any ) {

  const data = {
    monto,
    observaciones
  }

  let url = URL_SERVICIOS + '/caja/cierre/';

  return this.http.post( url, data, this.headers);
}
}
