import { Component } from '@angular/core';
import { UserService } from '../_services/auth_user.services';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { WebSocketService } from '../_services/websocket.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class RoomComponent {
  room: string = '';
  usersList: any;
  user: any;
  csrfToken: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private cookieService: CookieService,
    public webSocketService: WebSocketService,
    private dialog: MatDialog, 
  ) {
    this.csrfToken = this.cookieService.get('csrftoken');
  }

  ngOnInit(): void {
    // downloads the currently logged in user and friends list
    this.user = this.userService.getUser();
    this.getFriendsList();

  }

  refreshFriendsList(): void {
    this.getFriendsList();
  }

  getFriendsList(): void {
    // Sends post to backend and assigns friend list without currently logged in
    this.userService.friendsList(this.user).subscribe(
      data => {
        this.usersList = data;
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



  updateFriendship(friendship: any, status: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this friendship?' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed the action, proceed with update
        this.userService.updateInvitations(friendship, status).subscribe(() => {
          this.getFriendsList();
        },);
      }
    });
  }
}
