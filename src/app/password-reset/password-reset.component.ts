import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/auth_user.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
})
export class PasswordResetComponent implements OnInit {
  password_reset!: FormGroup;
  resetError: string = '';
  message: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }



  ngOnInit(): void {
    this.password_reset = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
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
      response => {
        this.message = 'link was sent to your email address.';
      },
      error => {
        this.resetError = 'failure to send email check if you entered email correctly.';
      }
    );
  }
}
