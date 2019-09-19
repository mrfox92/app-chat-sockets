import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public webSocketService: WebsocketService,
    public chatService: ChatService
  ) { }

  //  Escuchar por mensajes privados
  //  Escuchar por mensajes a chat global
  ngOnInit() {
    this.chatService.getMessagesPrivate().subscribe( mensaje => {
      console.log( mensaje );
    });
  }
}
