import { Component } from '@angular/core';
import { UserService } from '../_services/user.services';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { parse, stringify } from 'uuid';

@Component({
  selector: 'app-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class RoomComponent {

  room: string = '';
  usersList: any;
  user: any;
  csrfToken: any;

  constructor(private router: Router,private userService: UserService,private cookieService: CookieService) {
    this.csrfToken = this.cookieService.get('csrftoken');
  }

  ngOnInit(): void {
    // downloads the currently logged in user and friends list
    this.user = this.userService.getUser()

    this.getFriendsList();
  }


  getFriendsList(): void {
    // Sends post to backend and assigns friend list without currently logged in
    this.userService.friendsList(this.user.user).subscribe(
      (data) => {
        this.usersList = data;
        console.log(this.usersList);
      },
      (error) => {
        console.error('Wystąpił błąd podczas pobierania danych z API:', error);
      }
    );
  }

  goToChatRoom(user:any): void {
    // Sent post to backend to find room for both friends and then go to it
    
    this.userService.getRoom(user).subscribe(
      (data) => {  
        this.room = data[0]['id'].toString();
        this.router.navigate(['/chat', this.room]);
      },
      (error) => {
        console.error('An error occurred while downloading data from the API:', error);
      }

    );
  }

  updateFriendship(friendship:any, status:string): void {
    // get status and send it to friendship update view
    console.log(status);
    this.userService.updateInvitations(friendship, status).subscribe( () => {  
      },
      (error) => {
        console.error('An error occurred while downloading data from the API:', error);
      }
    );
  }
}
