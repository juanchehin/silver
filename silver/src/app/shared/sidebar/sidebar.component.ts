import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
// import { IMenuStructure } from 'src/app/interfaces/menu.model';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']

})
export class SidebarComponent implements OnInit {

  correoActual: any;
  elementosMenuPadre: any[] = [];
  IdPersona: any;
  menu: any[] = [];
  ocultarSidebar: boolean | undefined;
  expandirProductos = true;
  expandirVentas = true;
  expandirCompras = true;
  expandirTransferencias = true;
  expandirClientes = true;
  openMenu: string | null = null;
 
  constructor( 
              public alertService: AlertService,
              public sidebarService: SidebarService,
              public authService: AuthService
            ) {}

  ngOnInit(): void {
    this.IdPersona = this.authService.IdPersona;
  }


  toggleMenu(menu: string): void {
    this.openMenu = this.openMenu === menu ? null : menu;
  }

  logout() {
    this.authService.logout();
  }

}
