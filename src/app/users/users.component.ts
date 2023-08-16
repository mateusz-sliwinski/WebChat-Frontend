import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/auth_user.services';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersList: any;
  user: any;
  csrfToken: any;

  constructor(private userService: UserService,private cookieService: CookieService) {
    this.csrfToken = this.cookieService.get('csrftoken');
  }

  ngOnInit(): void {
    this.getUser()
    this.getUsersList();
  }


  getUsersList(): void {
    this.userService.usersList(this.user).subscribe(
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

  addFriend(user: any): void {
    this.userService.addToFriend(this.user['pk'] , user['id'], this.csrfToken).subscribe();
  }

}
