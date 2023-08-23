import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/auth_user.services';
import { Router } from '@angular/router';



@Component({
  selector: 'app-friends-bar-with-chat-button',
  templateUrl: './friends-bar-witch-chat-button.component.html',
  styleUrls: ['./friends-bar-witch-chat-button.component.css']
})
export class FriendsBarWithChatButtonComponent implements OnInit {

  isScrolled = false;
  user: any;
  usersList: any;
  room: any;
  
  constructor(
    private userService: UserService,
    private router: Router,
    ) { 
    
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.getFriendsList();
    
  }

  
  getFriendsList(): void {
    // Sends post to backend and assigns friend list without currently logged in
    this.userService.friendsList(this.user).subscribe(
      data => {
        this.usersList = data;
        console.log(this.usersList)
      },
      error => {
        console.error('Wystąpił błąd podczas pobierania danych z API:', error);
      }
    );
  }

  goToChatRoom(friend: any): void {
    // Sent post to backend to find room for both friends and then go to it
    this.userService.getRoom(friend).subscribe(

      data => {
        this.room = data[0]['id'].toString();
        this.router.navigate(['/chat', this.room]);
      },
      error => {
        console.error(
          'An error occurred while downloading data from the API:',
          error
        );
      }
    );
  }
}