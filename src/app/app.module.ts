import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

//  Sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
//  forms

import { FormsModule } from '@angular/forms';

const config: SocketIoConfig = { url: environment.wsUrl, options: {} };

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocketIoModule.forRoot( config )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
