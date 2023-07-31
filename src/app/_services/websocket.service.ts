import { Injectable } from '@angular/core';
import ReconnectingWebSocket  from 'reconnecting-websocket';
import { Observable } from 'rxjs';
import { Subject,BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  callbacks: any = {};
  private chatSocket!: ReconnectingWebSocket; 
  messages:any;
  user:string = 'admin';

  
  constructor() { }

  connectWebSocket(roomName: string, username: string) {
    const url = 'ws://localhost:8000/ws/chat/' + roomName + '/';
    this.chatSocket = new ReconnectingWebSocket(url);
    this.chatSocket.addEventListener('open', () => {
      console.log('WebSocket connected!');
      this.fetchMessages(username, 1);
    });


    this.chatSocket.addEventListener('message', (event:any) => {
      console.log('send message');
      this.messages = JSON.parse(event.data);
      console.log('moje', this.messages);

      if (this.messages['command'] === 'messages') {
        for (let i=0; i<this.messages['messages'].length; i++) {
          console.log(this.messages['messages'][i]);
          this.createMessage(this.messages['messages'][i]);
        }
      } else if (this.messages['command'] === 'new_message'){
        this.createMessage(this.messages['message']);
      }
      console.log('Received message:', event.data);
    });
    this.chatSocket.addEventListener('error', (event:any) => {
      console.error('WebSocket error:', event);
    });
    this.chatSocket.addEventListener('close', (event:any) => {
      console.log('WebSocket closed:', event.code, event.reason);
    });

  }


  socketNewMessage(data:any){
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0 ){
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

    createMessage(data: any) {
      const author = data['participant'];
  
      const msgListTag = document.createElement('li');
      const imgTag = document.createElement('img');
      const pTag = document.createElement('p');
      pTag.textContent = data.content;
      imgTag.src = 'http://emilcarlsson.se/assets/mikeross.png';
  
      if (author === this.user) {
        msgListTag.className = 'sent';
      } else {
        msgListTag.className = 'replies';
      }
      msgListTag.appendChild(imgTag);
      msgListTag.appendChild(pTag);
  
      const chatLog = document.querySelector('#chat-log');
      if (chatLog) {
        
        chatLog.appendChild(msgListTag);
      }
    }
  // fetchMessages(username: string) {
  //   this.chatSocket.send(JSON.stringify({ command: 'fetch_messages' }));
  //   console.log('wysyłam');
  // }
  // sendMessage(message: string, from: string) {
  //   this.chatSocket.send(JSON.stringify({ command: 'new_message', message, from}));
  // }

  public closeWebSocket(){
    this.chatSocket.close();
  }

  public mess(){
    return this.messages;
  }
}