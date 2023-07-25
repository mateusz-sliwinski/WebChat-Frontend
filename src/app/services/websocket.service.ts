import { Injectable } from '@angular/core';
import ReconnectingWebSocket  from 'reconnecting-websocket';



@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private chatSocket!: ReconnectingWebSocket; 
  
  
  constructor() { }

  connectWebSocket(roomName: string) {
    const url = 'ws://localhost:8000/ws/chat/' + roomName + '/';
    this.chatSocket = new ReconnectingWebSocket(url);

    this.chatSocket.onopen = (e) => {
      this.fetchMessages();
    };

    this.chatSocket.onmessage = (e) => {
      // Handle incoming messages here, or emit events to the component.
    };

    this.chatSocket.onclose = (e) => {
      console.error('Chat socket closed unexpectedly');
    };

  // connect(): WebSocketSubject<any> {
  //   this.socket$ = webSocket('ws://localhost:8000/ws/chat/aa/');
  //   console.log(this.socket$);
  //   return this.socket$;
  }

  fetchMessages() {
    this.chatSocket.send(JSON.stringify({ command: 'fetch_messages' }));
  }


  sendMessage(message: string, from: string) {
    this.chatSocket.send(JSON.stringify({ command: 'new_message', message, from}));
  }

}