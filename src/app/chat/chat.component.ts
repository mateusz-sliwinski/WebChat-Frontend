import { Component, AfterViewInit , Renderer2, ViewChild, OnInit, OnDestroy, ViewEncapsulation, ElementRef } from '@angular/core';
import { WebSocketService } from '../_services/websocket.service';
import { ActivatedRoute,  Router, NavigationEnd  } from '@angular/router';
import { UserService } from '../_services/auth_user.services';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatComponent implements OnInit, OnDestroy {
  container:any;  
  navigation:any;
  @ViewChild('scrollBottom')
  private scrollBottom!: ElementRef;

  message: string = '';
  roomName: string = '';
  messages: any[] = [];
  user: any;
  socket$: any;
  

  secondUser: any;

  constructor(
    public webSocketService: WebSocketService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state as { name: string };
        if (state) {
          this.secondUser = state.name;
        }
  }

  ngOnInit() {
    this.scrollToBottom();

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const state = this.router.getCurrentNavigation()?.extras.state as { name: string };
        if (state) {
          this.secondUser = state.name;
        }
      });
    if (this.webSocketService.isConnected) {
      this.webSocketService.closeWebSocket();
      this.webSocketService.isConnected = false;
    }

    this.route.paramMap.subscribe(params => {
      this.roomName = params.get('roomName') as string;
      this.user = this.userService.getUser();
      const chatLogElement = document.getElementById('chat-log');

      if (chatLogElement) {
        chatLogElement.innerHTML = '';
      }
      this.webSocketService.connectWebSocket(
        this.roomName,
        this.user.username
      );
    });
  }


  onChatMessageSubmit() {
    // Takes a non-empty html messag  e and sends it to the websockets
    const messageInputDom = document.getElementById(
      'chat-message-input'
    ) as HTMLInputElement;  
    const chatHistory = document.getElementById('chat-log');
    const message = messageInputDom.value;
    if (message.length > 0) {
      this.webSocketService.newChatMessages(
        message,
        this.user.username,
        this.roomName
      );
    
      messageInputDom.value = '';
    }
   
  }
  scrollToBottom(): void {
    try {
        this.scrollBottom.nativeElement.scrollTop = this.scrollBottom.nativeElement.scrollHeight;
    } catch(err) { }
}
  ngOnDestroy(): void {
    // Closes connection to websokets
    this.webSocketService.closeWebSocket();
  }
}

