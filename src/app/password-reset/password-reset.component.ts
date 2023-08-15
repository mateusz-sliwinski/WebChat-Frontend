import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../_services/auth_user.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
})
export class PasswordResetComponent implements OnInit {
  password_reset!: FormGroup;

  constructor(private userService: UserService, private router: Router) {}

  message: string | undefined;

  ngOnInit(): void {
    this.password_reset = new FormGroup({
      email: new FormControl(''),
    });
  }

  get f() {
    return this.password_reset!.controls;
  }
  action() {
    this.router.navigate(['/login']);
  }
  onSubmit(): void {
    this.userService.resetPassword(this.f['email'].value).subscribe(
      (response) => {
        this.message = 'send link to email.';
      },
      (error) => {
        this.message = 'failed to send link.';
      }
    );
  }
}
