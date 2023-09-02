import { Component, Input } from '@angular/core';
import { UserService } from '../_services/auth_user.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isLoggedIn?: boolean = false;
  user: any;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = this.userService.isUserLoggedIn();
      this.user = this.userService.getUser();
    });
  }

  logout() {
    this.userService.logout();
  }

  isSidebarClosed = true;
  modeText = 'Dark mode';

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark');
    this.modeText = document.body.classList.contains('dark')
      ? 'Light mode'
      : 'Dark mode';
  }
}
