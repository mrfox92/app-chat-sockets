import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario = null;

  constructor(
    private socket: Socket,
    private router: Router
  ) {

    this.cargarStorage();
    this.checkStatus();
  }


  //  metodo para saber cuando se conecta y cuando se desconecta el servidor de sockets
  //  los metodos connect y disconnect son observables, por lo tanto siempre estaran pendiende de lo que suceda
  checkStatus() {

    this.socket.on('connect', () => {

      console.log('Conectado al servidor');
      this.socketStatus = true;
      //  volvemos a cargar el storage
      this.cargarStorage();
    });

    this.socket.on('disconnect', () => {

      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });

  }


  //  mediante este evento emitimos eventos y tenemos una funcion más centralizada a la hora de trabajar
  // tslint:disable-next-line: ban-types
  emit( evento: string, payload?: any, callback?: Function ) {

    console.log('emitiendo', evento);
    this.socket.emit( evento, payload, callback );
  }

  listen( evento: string ) {
    //  Debemos retornar un observable para podernos suscribir
    return this.socket.fromEvent( evento );
  }

  loginWS( nombre: string ): Promise<any> {

    return new Promise ( ( resolve, reject ) => {

      //  llamamos a nuestro metodo emit
      this.emit( 'configurar-usuario', { nombre }, resp => {

        //  registramos el usuario
        this.usuario = new Usuario( nombre );
        //  guardamos el usuario en el storage
        this.guardarStorage();
        resolve();

      });

    });

  }

  logoutWS() {
    //  borrar el usuario
    this.usuario = null;
    //  borrar el usuario del storage
    localStorage.removeItem('usuario');
    //  emitir para borrar usuario de la lista de usuarios de sockets
    const payload = {
      nombre: 'sin-nombre'
    };
    this.emit('configurar-usuario', payload, () => {});
    //  redireccionar hacia el login
    this.router.navigateByUrl('');
  }

  getUsuario() {
    return this.usuario;
  }

  guardarStorage() {

    localStorage.setItem( 'usuario', JSON.stringify( this.usuario ) );
  }

  cargarStorage() {

    //  verificamos que exista la entrada en el storage
    if ( localStorage.getItem('usuario') ) {
      //  cargamos el usuario
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      //  llamamos a nuestro metodo para autenticar a nuestro usuario
      this.loginWS( this.usuario.nombre );
    }

  }

}
