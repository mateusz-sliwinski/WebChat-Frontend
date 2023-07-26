import { Component } from '@angular/core';
import { UserService } from './services/user.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  isLoggedIn?: boolean = false

  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn; // Subskrybujemy zmiany w stanie zalogowania
    });
    };
  
  logout(){
    this.userService.logout()
  }
}