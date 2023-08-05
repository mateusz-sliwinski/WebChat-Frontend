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
    this.getUser()
    this.getFriendsList();
  }


  getFriendsList(): void {
    this.userService.friendsList(this.user).subscribe(
      (data) => {
        this.usersList = data.filter((user: { username: string; }) => user.username !== this.user['username']);
      },
      (error) => {
        console.error('Wystąpił błąd podczas pobierania danych z API:', error);
      }
    );
  }

  getUser(){
    const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.user = JSON.parse(storedUser).user;
      } else {
        console.log('user not found');
      }
  }


  goToChatRoom(user:any): void {
    console.log('user chat    ',user)
    this.userService.getRoom(user,this.user).subscribe(
      (data) => {  
        this.room = data[0]['id'].toString();
        this.router.navigate(['/chat', this.room]);
      },
      (error) => {
        console.error('Wystąpił błąd podczas pobierania danych z API:', error);
      }

    );
  }
}
