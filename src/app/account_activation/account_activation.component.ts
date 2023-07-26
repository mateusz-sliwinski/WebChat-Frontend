import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.services';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account_activation.component.html',
  styleUrls: ['./account_activation.component.css']
  
})


export class AccountActivationComponent implements OnInit {
  message: string | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const key = params.get('key');
      if (key) {
        this.activateAccount(key);
      }
    });
  }

  activateAccount(key: string): void {
    this.userService.activateAccount(key).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error activating account:', error);
        this.message = 'Error activating account.';
      }
    );
  }
  
}