import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersList: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getDataFromApi();
  }


  getDataFromApi(): void {
    this.userService.usersList().subscribe(
      (data) => {
        this.usersList = data;
      },
      (error) => {
        console.error('Wystąpił błąd podczas pobierania danych z API:', error);
      }
    );
  }
}
