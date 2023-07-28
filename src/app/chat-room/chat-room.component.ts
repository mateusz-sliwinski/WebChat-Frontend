import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class RoomComponent {
  constructor(private router: Router) {}
  roomName: string = '';


  onUpdateRoomName(event:any){
    this.roomName = (<HTMLInputElement>event.target).value;
   }

  goToChatRoom(): void {
    this.router.navigate(['/chat', this.roomName]);
  }
}
