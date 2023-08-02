import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersList: any;
  username: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getDataFromApi();
  }


  getDataFromApi(): void {
    this.userService.usersList().subscribe(
      (data) => {
        this.getUser()
        this.usersList = data.filter((user: { username: string; }) => user.username !== this.username);
        console.log(this.usersList);
        
      },
      (error) => {
        console.error('Wystąpił błąd podczas pobierania danych z API:', error);
      }
    );
  }

  getUser(){
    const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.username = JSON.parse(storedUser).user['username']
      } else {
        console.log('user not found');
      }
  }
}
