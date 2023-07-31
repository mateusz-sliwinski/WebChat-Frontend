import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor() {}

  isSidebarClosed = false;
  modeText = 'Dark mode';

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark');
    this.modeText = document.body.classList.contains('dark') ? 'Light mode' : 'Dark mode';
  }
  ngOnInit() {}
}
