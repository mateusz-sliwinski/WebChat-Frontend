import { Component, Input } from '@angular/core';
import { UserService } from '../_services/user.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isLoggedIn?: boolean = false;
  
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = this.userService.isUserLoggedIn();
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  isSidebarClosed = false;
  modeText = 'Dark mode';

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark');
    this.modeText = document.body.classList.contains('dark') ? 'Light mode' : 'Dark mode';
  }

}
