import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = '';
  mensajesSubscription: Subscription;
  mensajes: any[] = [];
  elemento: HTMLElement;

  constructor( public chatService: ChatService ) { }

  ngOnInit() {
    this.elemento = document.getElementById('chat-mensajes');
    //  nos suscribimos lo que retorne el servicio que esta en escucha por nuevos mensajes
    this.mensajesSubscription = this.chatService.getMessages().subscribe( message => {

      this.mensajes.push( message );

      setTimeout( () => {

        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);

    });
  }

  ngOnDestroy() {

    this.mensajesSubscription.unsubscribe();
  }

  enviar() {

    if ( this.texto.trim().length === 0 ) {
      return;
    }

    console.log( this.texto );
    //  llamar a servicio de chat
    this.chatService.sendMessage( this.texto );
    this.texto = '';
  }
}
