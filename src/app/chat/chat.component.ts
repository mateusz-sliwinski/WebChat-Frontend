import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../services/websocket.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: string = 'ghgh';
  roomName: string = '';
  messages: any[] = [];
  username: string = 'admin';
  socket$: any;


  constructor(private webSocketService: WebSocketService, private route:ActivatedRoute ) {}


  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.roomName = params.get('roomName') as string;
    })

    this.webSocketService.connectWebSocket(this.roomName);

  }

  
  onChatMessageSubmit() {
    const messageInputDom = document.getElementById('chat-message-input') as HTMLInputElement;
    const message = messageInputDom.value;
    this.webSocketService.sendMessage(message, this.username);
    messageInputDom.value = '';
  }
 

}
