import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor( private socket: Socket ) {

    this.checkStatus();
  }


  //  metodo para saber cuando se conecta y cuando se desconecta el servidor de sockets
  //  los metodos connect y disconnect son observables, por lo tanto siempre estaran pendiende de lo que suceda
  checkStatus() {

    this.socket.on('connect', () => {

      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {

      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });

  }


  // tslint:disable-next-line: ban-types
  emit( evento: string, payload?: any, callback?: Function ) {

    console.log('emitiendo', evento);
    this.socket.emit( evento, payload, callback );
  }

  listen( evento: string ) {
    //  debemos retornar un observable para podernos suscribir
    return this.socket.fromEvent( evento );
  }

}
