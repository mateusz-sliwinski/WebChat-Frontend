import { Component } from '@angular/core';
import { UserService } from './services/user.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private userService: UserService) { }
  ngOnInit(): void {

    };
  
  logout(){
    this.userService.logout()
  }
}