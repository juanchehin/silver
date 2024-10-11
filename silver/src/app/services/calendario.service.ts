import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

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
  listar_eventos(){

    let url = URL_SERVICIOS + '/calendario/listar/' + this.IdPersona;

    return this.http.get( url, this.headers );
  }  

// ==================================================
//        
// ==================================================
alta_evento( fecha: any, descripcion_evento: any ) {

  const data = {
    fecha,
    descripcion_evento
  }

  let url = URL_SERVICIOS + '/eventos/alta/' + this.IdPersona;

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

  let url = URL_SERVICIOS + '/calendario/cierre/';

  return this.http.post( url, data, this.headers);
}
}
