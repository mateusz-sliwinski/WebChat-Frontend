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
  usersList: any;
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
    // Sends post to backend and assigns friend list without currently logged in
    this.userService.invitationsList(this.user.user).subscribe(
      (data) => {
        this.usersList = data.filter((user: { username: string; }) => user.username !== this.user.user['username']);
        console.log(this.usersList[0]);
      },
      (error) => {
        console.error('Wystąpił błąd podczas pobierania danych z API:', error);
      }
    );
  }

}
