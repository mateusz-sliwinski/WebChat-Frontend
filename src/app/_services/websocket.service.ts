import { Injectable  } from '@angular/core';
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
    this.user = username;
    this.chatSocket.addEventListener('open', () => {
      console.log('WebSocket connected!');
      this.fetchMessages(username, Number(roomName));
    });


    this.chatSocket.addEventListener('message', (event:any) => {
      this.messages = JSON.parse(event.data);
      if (this.messages['command'] === 'messages') {
        for (let i=0; i<this.messages['messages'].length; i++) {
          this.createMessage(this.messages['messages'][i]);
        }
      } else if (this.messages['command'] === 'new_message'){
        this.createMessage(this.messages['message']);
      }
      // console.log('Received message:', event.data);
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

  newChatMessages(content:string, username: string, chatId: number) {
    this.sendMessage({ command: 'new_message',  username: username, chatId:chatId, content:content});
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
      
      const divCardBody = document.createElement('div');
      divCardBody.className = 'card-body';
      
      const pMessage = document.createElement('p');
      pMessage.className = 'mb-0';
      pMessage.textContent = data.content;
      
      const imgTag = document.createElement('img');
      imgTag.src = 'http://emilcarlsson.se/assets/mikeross.png';
      imgTag.width=60;
      imgTag.className = 'rounded-circle d-flex align-self-start me-3 shadow-1-strong'


      divCardBody.appendChild(pMessage);

      const divCard = document.createElement('div');
      divCard.className = 'card mask-custom';

      divCard.appendChild(divCardBody);

   
  
      if (author === this.user) {
        msgListTag.className = 'd-flex justify-content-between mb-4 sender';
        msgListTag.appendChild(divCard);
        msgListTag.appendChild(imgTag);
        
      } else {
        msgListTag.className = 'd-flex justify-content-between mb-4 replies';
        msgListTag.appendChild(imgTag);
        msgListTag.appendChild(divCard);
        
      }
 
  
      const chatLog = document.querySelector('#chat-log');
      if (chatLog) {
        
        chatLog.appendChild(msgListTag);
      }
    }

  public closeWebSocket(){
    this.chatSocket.close();
  }

  public mess(){
    return this.messages;
  }
}