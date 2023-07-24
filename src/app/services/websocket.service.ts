// some-websocket.service.ts
import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$ = webSocket('ws://127.0.0.1:8000/ws/chat/');

  sendMessage(message: any) {
    this.socket$.next(message);
  }

  getMessages() {
    return this.socket$.asObservable();
  }
}