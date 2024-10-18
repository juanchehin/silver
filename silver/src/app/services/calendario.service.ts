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
  listar_eventos(p_mes_eventos: any,p_ano_eventos: any){

    let url = URL_SERVICIOS + '/eventos/listar/' + p_mes_eventos + '/' + p_ano_eventos + '/' + this.IdPersona;

    return this.http.get( url, this.headers );
  }  

// ==================================================
//        
// ==================================================
alta_evento( fecha_evento: any,horario_evento: any,id_persona: any,id_cliente: any,id_servicio: any, descripcion_evento: any ) {

  const data = {
    fecha_evento,
    horario_evento,
    id_persona,
    id_cliente,
    id_servicio,
    descripcion_evento
  }
  console.log("🚀 ~ CalendarioService ~ alta_evento ~ data:", data)

  let url = URL_SERVICIOS + '/eventos/alta/' + this.IdPersona;

  return this.http.post( url, data, this.headers);
}

// ==================================================
//        
// ==================================================
baja_evento( id_evento: any ) {

  const data = {
    id_evento
  }

  let url = URL_SERVICIOS + '/eventos/baja/' + this.IdPersona;

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
// ==================================================
//        
// ==================================================
dame_detalle_evento( id_evento: any ) {

  const data = {
    id_evento
  }

  let url = URL_SERVICIOS + '/eventos/detalle/' + this.IdPersona;

  return this.http.post( url, data, this.headers);
}
// ==================================================
//        
// ==================================================
listar_citas_fecha( fecha_cita: any ) {

  let url = URL_SERVICIOS + '/eventos/listar/fecha/' + fecha_cita + '/' + this.IdPersona;

  return this.http.get( url, this.headers );
}


// ==================================================
//        
// ==================================================
listar_eventos_hora( fecha_evento: any, horario_seleccionado: any ) {

  let url = URL_SERVICIOS + '/eventos/hora/' + fecha_evento + '/' + horario_seleccionado + '/' + this.IdPersona;

  return this.http.get( url, this.headers );
}

// ==================================================
//        
// ==================================================
cargar_info_calendario( ) {

  let url = URL_SERVICIOS + '/eventos/info';

  return this.http.get( url, this.headers );
}

}
