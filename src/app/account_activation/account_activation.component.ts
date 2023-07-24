import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.services';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account_activation.component.html',
  styleUrls: ['./account_activation.component.css']
})

export class AccountActivationComponent implements OnInit {
  message: string | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const key = params.get('key');
      if (key) {
        this.activateAccount(key);
      }
    });
  }

  activateAccount(key: any): void {
    this.userService.activateAccount(key).subscribe(
      () => {
        this.message = 'Account activated successfully.';
      },
      (error) => {
        console.error('Error activating account:', error);
        this.message = 'Error activating account.';
      }
    );
  }
}