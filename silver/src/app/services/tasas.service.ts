import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class TasasService {

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
    ) {
     }

// ==================================================
//
// ==================================================
cargarTasas(desde: any ){

  let url = URL_SERVICIOS + '/tasas/listar/' + desde;

  return this.http.get( url,this.headers);
    
  }
// ==================================================
//
// ==================================================
  actualizarTasa( configuraciones: any){

    let url = URL_SERVICIOS + '/tasas/actualizar/' + this.IdPersona;

  return this.http.put( url,configuraciones,this.headers);
    
  }

// ==================================================
//
// ==================================================
dame_tasa_dia( ){

  let url = URL_SERVICIOS + '/tasas/actual';

  return this.http.get( url,this.headers);
    
  }
}
