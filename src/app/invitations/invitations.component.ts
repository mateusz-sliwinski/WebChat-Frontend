import { Component } from '@angular/core';
import { UserService } from '../_services/auth_user.services';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css'],
})
export class InvitationsComponent {
  friendsList: any;
  user: any;
  status: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // downloads the currently logged in user and friends list
    this.user = this.userService.getUser();
    this.getInvitations();
  }

  getInvitations(): void {
    // Sends post to backend and assigns friend list
    this.userService.invitationsList(this.user).subscribe(
      data => {
        this.friendsList = data;
      },
      error => {
        console.error(
          'An error occurred while fetching data from the API:',
          error
        );
      }
    );
  }

  updateFriendship(friendship: any, status: string): void {
    // get status and send it to friendship update view
    this.userService.updateInvitations(friendship, status).subscribe(
      () => {
        this.getInvitations();
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
