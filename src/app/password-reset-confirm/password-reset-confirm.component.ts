import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/auth_user.services';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password-reset-confirm',
  templateUrl: './password-reset-confirm.component.html',
  styleUrls: ['./password-reset-confirm.component.css'],
})
export class PasswordResetConfirmComponent implements OnInit {
  uidb64!: string;
  token!: string;
  newPassword!: string;
  message: string | undefined;
  password_reset_confirm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.uidb64 = params['uidb64'];
      this.token = params['token'];
    });

    this.password_reset_confirm = new FormGroup({
      new_password1: new FormControl(''),
      new_password2: new FormControl(''),
    });
  }

  get f() {
    return this.password_reset_confirm!.controls;
  }

  onSubmit(): void {
    this.userService
      .confirmPasswordReset(
        this.uidb64,
        this.token,
        this.f['new_password1'].value,
        this.f['new_password2'].value
      )
      .subscribe(
        (response) => {
          this.router.navigate(['/login']);
          this.message = 'password has been reset';
        },
        (error) => {
          this.message = 'password failed to reset';
        }
      );
  }
}
