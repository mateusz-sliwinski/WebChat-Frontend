import { Injectable } from '@angular/core';
import ReconnectingWebSocket  from 'reconnecting-websocket';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  callbacks: any = {};
  private chatSocket!: ReconnectingWebSocket; 
  public messages = new Subject<any>();

  
  constructor() { }

  connectWebSocket(roomName: string) {
    const url = 'ws://localhost:8000/ws/chat/' + roomName + '/';
    this.chatSocket = new ReconnectingWebSocket(url);
    this.chatSocket.addEventListener('open', () => {
      console.log('WebSocket connected!');
      this.fetchMessages('admin', 1);
    });
    this.chatSocket.addEventListener('message', (event:any) => {
      // Handle incoming messages here
      this.messages = event.data['messages'];
      console.log('moje', this.messages);
      console.log('Received message:', event.data);
    });
    this.chatSocket.addEventListener('error', (event:any) => {
      console.error('WebSocket error:', event);
    });
    this.chatSocket.addEventListener('close', (event:any) => {
      console.log('WebSocket closed:', event.code, event.reason);
    });

  }

  // public getMessage(): Observable<any> {
  //   // Odbieranie wiadomości od serwera
  //   return this.chatSocket.asObservable();
  // }

  socketNewMessage(data:any){
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    if (Object.keys(this.callbacks).length ===0 ){
      return
    } 
    if (command === 'messages'){
      this.callbacks[command](parsedData.messages);
    }
    if (command === 'new_messages'){
      this.callbacks[command](parsedData.message);
    }
  }

  fetchMessages(username: string, chatId: number) {
    this.sendMessage({ command: 'fetch_messages', usename: username, chatId:chatId });
  }

  newChatMessages(message: any) {
    this.sendMessage({ command: 'new_message', from: message.from, message: message.content });
    console.log('send')
  }

  addCallbacks(messagesCallback: any, newMessageCallback: any){
    this.callbacks['messages']= messagesCallback;
    this.callbacks['new_message']= newMessageCallback;
  }

  sendMessage(data:any){
    try{
        this.chatSocket.send(JSON.stringify(data))
    }catch (err){
      console.log(err);
    }
  }

    public subscribeToMessages() {
      return this.chatSocket;
    }
  // fetchMessages(username: string) {
  //   this.chatSocket.send(JSON.stringify({ command: 'fetch_messages' }));
  //   console.log('wysyłam');
  // }
  // sendMessage(message: string, from: string) {
  //   this.chatSocket.send(JSON.stringify({ command: 'new_message', message, from}));
  // }

}