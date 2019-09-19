import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WebsocketService } from '../services/websocket.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {

  constructor(
    private router: Router,
    public webSocketService: WebsocketService
  ) { }

  canActivate() {

    //  establecer condicion para evaluar si el usuario puede o no continuar

    //  evaluamos si existe el usuario
    if ( this.webSocketService.getUsuario() ) {
      return true;
    } else {
      //  lo sacamos de la ruta a la que intenta acceder
      this.router.navigateByUrl('/');
      return false;
    }

  }
}
