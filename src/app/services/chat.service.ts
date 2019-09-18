import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( public webSocketService: WebsocketService ) { }

  //  cuando un usuario llame el servicio de chat, habra un metodo diseñado especificamente para enviar mensajes

  sendMessage( mensaje: string ) {

    const payload = {
      de: 'David',
      cuerpo: mensaje
    };

    this.webSocketService.emit( 'mensaje', payload );

  }

  getMessages() {
    return this.webSocketService.listen('mensaje-nuevo');
  }

}
