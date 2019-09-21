import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( public webSocketService: WebsocketService ) { }

  //  cuando un usuario llame el servicio de chat, habra un metodo disenado especificamente para enviar mensajes

  sendMessage( mensaje: string ) {

    const payload = {
      de: this.webSocketService.getUsuario().nombre,
      cuerpo: mensaje
    };

    this.webSocketService.emit( 'mensaje', payload );

  }

  getMessages() {
    return this.webSocketService.listen( 'mensaje-nuevo' );
  }

  getMessagesPrivate() {
    return this.webSocketService.listen( 'mensaje-privado' );
  }

  getUsuariosActivos() {
    return this.webSocketService.listen( 'usuarios-activos' );
  }

  emitirUsuariosActivos() {
    this.webSocketService.emit( 'obtener-usuarios' );
  }

}
