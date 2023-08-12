import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.services';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent {
  room: string = '';
  friendsList: any;
  user: any;
  csrfToken: any;

  constructor(private router: Router,private userService: UserService,private cookieService: CookieService) {
    this.csrfToken = this.cookieService.get('csrftoken');
  }

  ngOnInit(): void {
    // downloads the currently logged in user and friends list
    this.user = this.userService.getUser()
    this.getInvitations();
  }


  getInvitations(): void {
    // Sends post to backend and assigns friend list
    this.userService.invitationsList(this.user.user).subscribe(
      (data) => {
        this.friendsList = data;
      },
      (error) => {
        console.error('An error occurred while fetching data from the API:', error);
      }
    );
  }

  acceptToFriends(friendship:any): void {

    this.userService.acceptInvitations(friendship).subscribe(
      (data) => {  
      },
      (error) => {
        console.error('An error occurred while downloading data from the API:', error);
      }

    );
  }

}
