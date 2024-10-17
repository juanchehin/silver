import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  persona!: any;
  personaValor!: any;
  IdPersona!: any;
  id_rol: any;
  token!: any;
  menuBack: any[] = Array();

  private IdPersonaSource = new BehaviorSubject<string>('');
  public  quoteIdPersona = this.IdPersonaSource.asObservable();  // 


  constructor(
    public http: HttpClient,
    public router: Router ) {
    this.cargarStorage();
  }

// ====================================================================================================================
// =========================================== LOGUEO =================================================================
// ====================================================================================================================
setIdPersona(IdPersona: any) {
  this.IdPersonaSource.next(IdPersona);
}

// ==================================================
//        Logueo de la persona
// ==================================================
login( persona: any ): any {

  const url = URL_SERVICIOS + '/login/acceso';

  return this.http.post(url, persona)
    .pipe(
          map(
            ( resp: any ) => {
              
                if (resp.mensaje === 'Error de credenciales') {
                  return false;
                }

                if (resp.mensaje === 'no_activado') {
                  this.router.navigate(['/maintenance']);
                  return false;
                }

      this.setIdPersona(resp.IdPersona);  //

      this.guardarStorage( resp.IdPersona, resp.token,resp.IdRol);

      this.cargarStorage();

      return true;
    }));


}

// ==================================================
//        Guarda la info en el localstorage
//  Guarda en las variables del servicio
// ==================================================
guardarStorage( id: string, token: string, id_rol: string ) {

  localStorage.setItem('id', id );
  localStorage.setItem('token', token );
  localStorage.setItem('id_rol', id_rol );

  this.token = token;
  this.IdPersona = id;  
  this.id_rol = id_rol;

}

// ==================================================
// Carga la informacion almacenada en el localstorage a la informacion actual para que
// pueda ser accesada desde este servicio
// ==================================================
  cargarStorage() {

    if ((localStorage.getItem('token') === 'undefined') || (localStorage.getItem('token') === null)) {
      this.token = '';
      this.persona = null;
      this.IdPersona = null;
      this.id_rol = null;
      
    } else {
      const var1 = localStorage.getItem('token');
      this.token = var1;

      const var3 = localStorage.getItem('id');
      this.IdPersona = var3;
    }

  }

// ==================================================
//        Permite saber si un usuario esta logueado
// ==================================================
estaLogueado() {

  this.token = localStorage.getItem('token');
  if ((this.token === 'undefined') || (this.token === null)) {
    return false;
  } else {
    return( this.token.length > 5) ? true : false;

  }
}


// ==================================================
//   Actualiza los datos del usuario (Estado,Clases disponibles,mesesCredito,etc)
// ==================================================
actualizaEstadoCliente( IdPersona: string ) {
  const url = URL_SERVICIOS + '/login/control/estado/' + IdPersona;
  return this.http.get(url);
}
// ==================================================
//        Hace el logout del usuario
// ==================================================

logout() {
  
  this.token = '';
  this.IdPersona = null;
  this.id_rol = null;

  localStorage.removeItem('token');
  localStorage.removeItem('id');
  localStorage.removeItem('id_rol');


  this.router.navigate(['/login']);
}

getIdRol() {
  const p_id_rol = localStorage.getItem('id_rol');
  return p_id_rol;
}

}
