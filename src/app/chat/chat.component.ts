import { Component, OnInit, OnDestroy, ViewEncapsulation, } from '@angular/core';
import { WebSocketService } from '../_services/websocket.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class ChatComponent implements OnInit, OnDestroy {
  message: string = '';
  roomName: string = '';
  messages: any[] = [];
  username: string = '';
  socket$: any;


  constructor(public webSocketService: WebSocketService, private route:ActivatedRoute ) {}
 

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.roomName = params.get('roomName') as string;
    })
    this.getUser();
    this.webSocketService.connectWebSocket(this.roomName, this.username);
  }

  onChatMessageSubmit() {
    const messageInputDom = document.getElementById('chat-message-input') as HTMLInputElement;
    const message = messageInputDom.value;
    if (message.length>0){
      this.webSocketService.newChatMessages(message, this.username , Number(this.roomName));
      messageInputDom.value = '';
    }
    
  }


  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  getUser(){
    const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.username = JSON.parse(storedUser).user['username']
      } else {
        console.log('user not found');
      }
  }
}
