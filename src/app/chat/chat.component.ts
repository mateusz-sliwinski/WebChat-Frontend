import { Component, OnInit, OnDestroy, ViewEncapsulation, } from '@angular/core';
import { WebSocketService } from '../_services/websocket.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.services';



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
  user:any;
  socket$: any;

  constructor(
    public webSocketService: WebSocketService,
    private route:ActivatedRoute,
    private userService:UserService) {}
 

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.roomName = params.get('roomName') as string;
    })
    this.user = this.userService.getUser();
    this.webSocketService.connectWebSocket(this.roomName, this.user.user.username);
  }

  onChatMessageSubmit() {
    // Takes a non-empty html message and sends it to the websockets
    const messageInputDom = document.getElementById('chat-message-input') as HTMLInputElement;
    const message = messageInputDom.value;
    if (message.length>0){
      this.webSocketService.newChatMessages(message, this.user.user.username , Number(this.roomName));
      messageInputDom.value = '';
    }
    
  }
  
  ngOnDestroy(): void {
    // Closes connection to websokets
    this.webSocketService.closeWebSocket();
  }

}
