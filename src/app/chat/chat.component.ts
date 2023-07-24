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
  connected: boolean = false;
  author: string = '';
  messages: any[] = [];

  constructor(private WebSocketService: WebSocketService, private route:ActivatedRoute ) {}


  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.roomName = params.get('roomName') as string;
    })


    this.WebSocketService.getMessages().subscribe(
      (data: any) => {
        // Otrzymane dane z WebSocket
        this.message = data.message;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  sendMessage() {
    const messageToSend = { text: 'Hello from Angular!' };
    this.WebSocketService.sendMessage(messageToSend);
  }
}
