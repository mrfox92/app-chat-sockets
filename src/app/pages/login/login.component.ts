import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombre = '';

  constructor(
    private router: Router,
    public webSocketService: WebsocketService
  ) { }

  ngOnInit() {
  }

  ingresar() {

    this.webSocketService.loginWS( this.nombre ).then( resp => {
      //  navegamos a otra pantalla
      this.router.navigateByUrl('/mensajes');
    });
  }

}
